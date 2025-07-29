// hooks/useRecord.js
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../data/supabaseClient';
import { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';

export default function useRecord(discipline, mode) {
  const { current } = useContext(AccountContext);
  const [lastScore, setLastScore] = useState(0);
  const [lastTime,  setLastTime]  = useState(0);

  useFocusEffect(useCallback(() => {
    if (!current) return;

    (async () => {
      const { data, error } = await supabase
        .from('best_scores')
        .select('score, time')
        .eq('user_id', current.id)
        .eq('mode_variants_id', mode)
        .single();

      if (!error && data) {
        setLastScore(data.score);
        setLastTime(data.time);
      } else {
        setLastScore(0);
        setLastTime(0);
      }
    })();
  }, [current, discipline, mode]));

  return { lastScore, lastTime };
}
