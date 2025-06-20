//hooks/useAutoAdvancePreference.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTOADVANCE_KEY } from '../config/gameConfig';

/**
 * Hook to persist and retrieve the auto-advance preference
 * @param {string} key  AsyncStorage key for persisting the preference
 * @returns {{autoAdvance: boolean, toggleAutoAdvance: (value: boolean) => Promise<void>}}
 */
export default function useAutoAdvancePreference(key = AUTOADVANCE_KEY) {
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Load stored preference on mount
  useEffect(() => {
    AsyncStorage.getItem(key).then(stored => {
      if (stored != null) setAutoAdvance(stored === 'false');
    });
  }, [key]);

  // Toggle and persist
  const toggleAutoAdvance = useCallback(async newValue => {
    setAutoAdvance(newValue);
    await AsyncStorage.setItem(key, newValue.toString());
  }, [key]);

  return { autoAdvance, toggleAutoAdvance };
}
