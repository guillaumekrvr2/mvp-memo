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
    repo.getBestScore(current.id, modeVariantId) //dans le repo supabase, on récupère l'id de l'utilisateur, le modeVariant, puis on affiche le record associé
      .then(record => {
       console.log('useFetchBestScore:', modeVariantId, record)
        setBestScore(record ? record.score : 0);
      })
      .catch(() => {
        setBestScore(0);
      });
  }, [current, modeVariantId]);

  return bestScore; //on renvoie le meilleur score de l'utilisateur
}
