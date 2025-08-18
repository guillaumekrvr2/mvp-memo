// hooks/useLeaderboard.js
import { useState, useEffect, useContext } from 'react';
import { SupabaseUserRepository } from '../data/supabase/supabaseUserRepository';
import { GetUsers } from '../usecases/GetUsers';
import { sortLeaderboardScores } from '../usecases/sortLeaderboardScores';
import SupabaseRecordRepository from '../data/repositories/SupabaseRecordRepository';
import { AccountContext } from '../contexts/AccountContext';

/**
 * Hook React pour récupérer et trier la liste des comptes
 * @param {string} discipline  Discipline sélectionnée
 * @param {string} mode        Mode de jeu sélectionné
 * @param {Array} disciplines  Tableau des disciplines (pour le calcul global)
 * @param {number|null} variantId  ID du variant pour les modes basés sur variants
 * @returns {{ sorted: Array, loading: boolean, error: Error|null }}
 */
export default function useLeaderboard(discipline, mode, disciplines, variantId = null) {
  const { current } = useContext(AccountContext);
  const [sorted, setSorted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function fetchLeaderboard() {
      try {
        console.log('[useLeaderboard] Starting fetch with:', { discipline, mode, variantId });

        // 1) Récupère les comptes via le use-case GetUsers
        const userRepo = new SupabaseUserRepository();
        const getUsers = new GetUsers(userRepo);
        const accounts = await getUsers.execute({ mode, discipline });
        
        console.log('[useLeaderboard] Accounts received from GetUsers:', { 
          accountsCount: accounts ? accounts.length : 0,
          firstAccount: accounts?.[0]
        });

        // Cas des modes basés sur variant : IAM et Memory League avec variantId
        if ((mode === 'iam' || mode === 'memory-league') && variantId != null) {
          const recordRepo = new SupabaseRecordRepository();

          // Pour chaque utilisateur, récupère son best score pour ce variant
          const withRecords = await Promise.all(
            accounts.map(async (user) => {
              const rec = await recordRepo.getBestScore(user.id, variantId);

              return {
                ...user,
                records: rec ? { [variantId]: { score: rec.score } } : {},
              };
            })
          );

          // Filtre les utilisateurs avec score > 0, puis trie par score décroissant
          const filteredRecords = withRecords.filter(user => 
            (user.records[variantId]?.score || 0) > 0
          );
          
          const sortedList = filteredRecords.sort(
            (a, b) =>
              (b.records[variantId]?.score || 0) -
              (a.records[variantId]?.score || 0)
          );

          console.log('[useLeaderboard] Sorted list with records:', { 
            sortedCount: sortedList.length,
            firstSorted: sortedList[0]
          });

          if (isMounted) setSorted(sortedList);
        } else {
          // Cas par défaut : utilisation de la logique existante avec sortLeaderboardScores
          const withRecords = accounts.map((user) => ({
            ...user,
            records: user.id === current?.id && current ? current.records : user.records || {},
          }));

          const sortedList = sortLeaderboardScores(withRecords, discipline, mode, disciplines);
          
          // Filtre les utilisateurs avec score > 0
          const filteredList = sortedList.filter(user => {
            if (discipline === 'global') {
              // Somme des scores de toutes les disciplines sauf 'global'
              const totalScore = disciplines
                .filter(d => d.key !== 'global')
                .reduce((sum, d) => {
                  const rec = user.records?.[d.key]?.[mode];
                  return sum + (rec?.score || 0);
                }, 0);
              return totalScore > 0;
            }
            // Cas simple : discipline unique
            const rec = user.records?.[discipline];
            if (rec && typeof rec === 'object') {
              return (rec[mode]?.score || 0) > 0;
            }
            return (typeof rec === 'number' ? rec : 0) > 0;
          });
          
          console.log('[useLeaderboard] Filtered list (default case):', { 
            originalCount: sortedList.length,
            filteredCount: filteredList.length,
            firstFiltered: filteredList[0]
          });
          
          if (isMounted) setSorted(filteredList);
        }
      } catch (err) {
        console.error('[useLeaderboard] Error:', err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [discipline, mode, disciplines, variantId, current?.id]);

  return { sorted, loading, error };
}