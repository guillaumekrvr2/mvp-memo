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

        // 1) Récupère les comptes via le use-case GetUsers
        const userRepo = new SupabaseUserRepository();
        const getUsers = new GetUsers(userRepo);
        const accounts = await getUsers.execute({ mode, discipline });

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

          // Trie tous les utilisateurs par score décroissant (0 pour ceux sans record)
          const sortedList = withRecords.sort(
            (a, b) =>
              (b.records[variantId]?.score || 0) -
              (a.records[variantId]?.score || 0)
          );

          if (isMounted) setSorted(sortedList);
        } else {
          // Cas par défaut : utilisation de la logique existante avec sortLeaderboardScores
          const withRecords = accounts.map((user) => ({
            ...user,
            records: user.id === current?.id ? current.records : user.records || {},
          }));

          const sortedList = sortLeaderboardScores(withRecords, discipline, mode, disciplines);
          if (isMounted) setSorted(sortedList);
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
  }, [discipline, mode, disciplines, variantId, current]);

  return { sorted, loading, error };
}