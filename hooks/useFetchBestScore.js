// src/hooks/useFetchBestScore.js
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import SupabaseRecordRepository from '../data/repositories/SupabaseRecordRepository';

export default function useFetchBestScore(modeVariantId) {
  const { current } = useContext(AccountContext);
  const [bestScore, setBestScore] = useState(null);

  useEffect(() => {
    // On ne lance le fetch que si on a un utilisateur et un modeVariantId valide
    if (!current || typeof modeVariantId !== 'number') {
      setBestScore(0);
      return;
    }

    const repo = new SupabaseRecordRepository();
    repo
      .getBestScore(current.id, modeVariantId)
      .then(record => {
        setBestScore(record ? record.score : 0);
      })
      .catch(error => {
        console.error(error);
        setBestScore(0);
      });
  }, [current, modeVariantId]);

  return bestScore;
}