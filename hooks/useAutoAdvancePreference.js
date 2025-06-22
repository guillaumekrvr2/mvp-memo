//hooks/useAutoAdvancePreference.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTOADVANCE_KEY } from '../config/gameConfig';

/**
 * Hook to persist and retrieve the auto-advance preference
 * @param {'custom'|string} mode  Mode actuel ('custom' ou autre)
 * @param {string} [key]         AsyncStorage key (optionnel)
 * @returns {{autoAdvance: boolean, toggleAutoAdvance: (value: boolean) => Promise<void>}}
 */
export default function useAutoAdvancePreference(
  mode,
  key = AUTOADVANCE_KEY
) {
  // 1) on stocke la valeur brute (true/false) en AsyncStorage
  const [stored, setStored] = useState(false);

  // Load stored preference on mount
  useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value != null) setStored(value === 'true');
    });
  }, [key]);

  // Toggle and persist
  const toggleAutoAdvance = useCallback(async newValue => {
    setStored(newValue);
    await AsyncStorage.setItem(key, newValue.toString());
  }, [key]);

  // 2) on n’autorise l’auto-advance que si on est en custom
  const autoAdvance = useMemo(
    () => (mode === 'custom' ? stored : false),
    [mode, stored]
  );

  return { autoAdvance, toggleAutoAdvance };
}
