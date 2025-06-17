// hooks/useLeaderboard.js
import { useContext, useMemo } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import { sortLeaderboardScores } from '../usecases/sortLeaderboardScores';

/**
 * Hook React pour obtenir la liste triée des comptes selon discipline et mode
 * @param {string} discipline    Discipline courante sélectionnée
 * @param {string} mode          Mode de jeu sélectionné
 * @param {Array} disciplines    Tableau des disciplines (pour le calcul global)
 * @returns {Array}              Comptes triés
 */
export function useLeaderboard(discipline, mode, disciplines) {
  const { accounts } = useContext(AccountContext);

  // Mémo­ri­ser le tri pour ne pas recalculer à chaque render
  const sorted = useMemo(() => {
    return sortLeaderboardScores(accounts, discipline, mode, disciplines);
  }, [accounts, discipline, mode, disciplines]);

  return sorted;
}
