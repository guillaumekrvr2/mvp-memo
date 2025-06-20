// src/hooks/useRecord.js
import { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AccountContext } from '../contexts/AccountContext';

export default function useRecord(gameKey, mode) {
  const { current } = useContext(AccountContext);
  const allRecs = current?.records?.[gameKey] || {};
  const rec     = allRecs[mode] || { score: 0, time: 0 };

  const [lastScore, setLastScore] = useState(rec.score);
  const [lastTime,  setLastTime]  = useState(rec.time);

  useFocusEffect(
    useCallback(() => {
      setLastScore(rec.score);
      setLastTime(rec.time);
    }, [rec.score, rec.time])
  );

  return { lastScore, lastTime };
}
