import { useCallback } from 'react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

// Mapping des disciplines vers leurs noms lisibles
const DISCIPLINE_NAMES = {
  numbers: 'Numbers Practice',
  cards: 'Cards Practice',
  binaries: 'Binaries Practice',
  spoken: 'Spoken Practice',
  words: 'Words Practice',
  names: 'Names Practice',
};

/**
 * Hook pour tracker les événements practice_started et practice_completed
 * À utiliser dans les écrans de mémorisation/recall
 */
export const usePracticeTracking = () => {
  const { trackEvent } = useAnalytics();

  /**
   * Track le début d'une session de pratique
   * @param {string} discipline - Type de pratique (numbers, cards, binaries, spoken, words, names)
   * @param {string} mode - Mode de jeu (memory_league, iam, custom)
   * @param {object} settings - Paramètres de la session (temps, nb de chiffres, etc.)
   */
  const trackPracticeStarted = useCallback((discipline, mode, settings = {}) => {
    const practiceType = DISCIPLINE_NAMES[discipline] || `${discipline} Practice`;

    trackEvent('practice_started', {
      discipline,
      practice_type: practiceType,
      mode,
      ...settings,
      timestamp: new Date().toISOString(),
    });
  }, [trackEvent]);

  /**
   * Track la fin d'une session de pratique
   * @param {string} discipline - Type de pratique
   * @param {string} mode - Mode de jeu
   * @param {object} results - Résultats (score, temps, erreurs, etc.)
   */
  const trackPracticeCompleted = useCallback((discipline, mode, results = {}) => {
    const practiceType = DISCIPLINE_NAMES[discipline] || `${discipline} Practice`;

    trackEvent('practice_completed', {
      discipline,
      practice_type: practiceType,
      mode,
      ...results,
      timestamp: new Date().toISOString(),
    });
  }, [trackEvent]);

  return {
    trackPracticeStarted,
    trackPracticeCompleted,
  };
};
