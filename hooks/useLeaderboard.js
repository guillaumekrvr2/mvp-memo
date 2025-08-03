// src/hooks/useLeaderboard.js
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
 * @returns {{ sorted: Array, loading: boolean, error: Error|null }}
 */
export default function useLeaderboard(discipline, mode, disciplines) {
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

        // Cas spécifique IAM : variant ID par défaut = 7
        if (mode === 'iam') {
          const VARIANT_ID = 7;
          const recordRepo = new SupabaseRecordRepository();

          // Pour chaque utilisateur, récupère son best score pour ce variant
          const withRecords = await Promise.all(
            accounts.map(async (user) => {
              const rec = await recordRepo.getBestScore(user.id, VARIANT_ID);
              return {
                ...user,
                records: rec ? { [VARIANT_ID]: { score: rec.score } } : {},
              };
            })
          );

          // Trie tous les utilisateurs par score desc (0 pour ceux sans record)
          const sortedList = withRecords.sort(
            (a, b) => (b.records[VARIANT_ID]?.score || 0) - (a.records[VARIANT_ID]?.score || 0)
          );

          if (isMounted) setSorted(sortedList);
        } else {
          // Cas par défaut : on mélange uniquement le record du joueur courant
          const withRecords = accounts.map((user) => ({
            ...user,
            records: user.id === current?.id ? current.records : {},
          }));

          const list = sortLeaderboardScores(
            withRecords,
            discipline,
            mode,
            disciplines
          );
          if (isMounted) setSorted(list);
        }
      } catch (e) {
        console.error('[useLeaderboard] error', e);
        if (isMounted) setError(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLeaderboard();
    return () => {
      isMounted = false;
    };
  }, [discipline, mode, current, disciplines]);

  return { sorted, loading, error };
}
