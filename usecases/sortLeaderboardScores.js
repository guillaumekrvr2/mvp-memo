//usecases/sortLeaderboardScores.js

/**
 * Trie une liste de comptes par score (décroissant) pour une discipline et un mode donnés.
 * @param {Array} accounts           Liste des comptes { id, firstName, lastName, records }
 * @param {string} discipline        Clé de la discipline ('numbers', 'cards', 'global', etc.)
 * @param {string} mode              Clé du mode de jeu ('memory-league', 'iam', etc.)
 * @param {Array} disciplines        Tableau des disciplines disponibles (pour calcul global)
 * @returns {Array}                  Nouvel array trié
 */
export function sortLeaderboardScores(accounts, discipline, mode, disciplines) {
  return [...accounts].sort((a, b) => {
    const getScore = acct => {
      if (discipline === 'global') {
        // Somme des scores de toutes les disciplines sauf 'global'
        return disciplines
          .filter(d => d.key !== 'global')
          .reduce((sum, d) => {
            const rec = acct.records?.[d.key]?.[mode];
            return sum + (rec?.score || 0);
          }, 0);
      }
      // Cas simple : discipline unique
      const rec = acct.records?.[discipline];
      if (rec && typeof rec === 'object') {
        return rec[mode]?.score || 0;
      }
      return typeof rec === 'number' ? rec : 0;
    };

    // On veut les plus gros scores en tête
    return getScore(b) - getScore(a);
  });
}
