// src/hooks/useFetchBestScore.js
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import SupabaseRecordRepository from '../data/repositories/SupabaseRecordRepository';

export default function useFetchBestScore(modeVariantId) {
  const { current } = useContext(AccountContext);
  const [bestScore, setBestScore] = useState(null);

  useEffect(() => {
    if (!current) return;

    const repo = new SupabaseRecordRepository();
    repo.getBestScore(current.id, modeVariantId)
      .then(record => {
        setBestScore(record ? record.score : 0);
      })
      .catch(() => {
        setBestScore(0);
      });
  }, [current, modeVariantId]);

  return bestScore;
}
