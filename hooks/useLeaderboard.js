// hooks/useLeaderboard.js

import { useState, useEffect, useMemo } from 'react';
import { SupabaseUserRepository } from '../data/supabase/supabaseUserRepository';
import { GetUsers } from '../usecases/GetUsers';
import { sortLeaderboardScores } from '../usecases/sortLeaderboardScores';

/**
 * Hook React pour récupérer et trier la liste des comptes
 * @param {string} discipline  Discipline sélectionnée
 * @param {string} mode        Mode de jeu sélectionné
 * @param {Array} disciplines  Tableau des disciplines (pour le calcul global)
 * @returns {{
 *   sorted: Array,         // Comptes triés
 *   loading: boolean,      // En cours de chargement ?
 *   error: Error|null      // Erreur éventuelle
 * }}
 */
export function useLeaderboard(discipline, mode, disciplines) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const repo     = new SupabaseUserRepository();
    const getUsers = new GetUsers(repo);

    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        // 1) Récupère les Account via le use-case
        const list = await getUsers.execute({ mode, discipline });
        setAccounts(list);
        console.log(accounts)
      } catch (err) {
        console.error('[useLeaderboard] fetch error', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [mode, discipline]);

  // 2) Trie en mémoire selon discipline/mode
  const sorted = useMemo(() => {
    return sortLeaderboardScores(accounts, discipline, mode, disciplines);
  }, [accounts, discipline, mode, disciplines]);

  return { sorted, loading, error };
}
