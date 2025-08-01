// src/hooks/useSaveBestScore.js

import { useContext, useState, useMemo } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import SaveBestScore from '../usecases/SaveBestScore';
import SupabaseRecordRepository from '../data/repositories/SupabaseRecordRepository';

/**
 * Hook React pour sauvegarder le meilleur score via le use-case SaveBestScore.
 * @returns {{ saveBestScore: function, loading: boolean, error: Error|null }}
 */
export default function useSaveBestScore() {
  const { current } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Instanciation du repository et du use-case une seule fois
  const saveBestScoreUseCase = useMemo(() => {
    const repo = new SupabaseRecordRepository();
    return new SaveBestScore({ recordRepository: repo });
  }, []);

  /**
   * Sauvegarde conditionnelle du score pour l'utilisateur courant.
   * @param {number} modeVariantId  - ID du variant de mode
   * @param {number} score          - Score obtenu
   * @returns {Promise<{updated: boolean, record: Object}>}
   */
  const saveBestScore = async (modeVariantId, score) => {
    if (!current) throw new Error('No user logged in');

    setLoading(true);
    setError(null);
    try {
      const result = await saveBestScoreUseCase.execute(
        current.id,
        modeVariantId,
        score
      );
      return result;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { saveBestScore, loading, error };
}
