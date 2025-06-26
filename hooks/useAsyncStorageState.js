import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook générique pour un état synchronisé avec AsyncStorage.
 *
 * @param {string} key           Clé sous laquelle on stocke en AsyncStorage.
 * @param {T}      initialValue Valeur initiale tant qu'on n'a pas chargé/lu.
 * @returns {[T, (value: T) => void]}  [state, setStateAndPersist]
 */
export default function useAsyncStorageState(key, initialValue) {
  const [state, setState] = useState(initialValue);

  // 1) À l'initialisation, on charge la valeur stockée (s'il y en a)
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (raw !== null) {
          setState(JSON.parse(raw));
        }
      } catch (e) {
        console.error(`Erreur lecture AsyncStorage clé="${key}"`, e);
      }
    })();
  }, [key]);

  // 2) Setter enveloppé : met à jour la state locale et persiste
  const setAndPersist = useCallback(
    async newVal => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(newVal));
        setState(newVal);
      } catch (e) {
        console.error(`Erreur écriture AsyncStorage clé="${key}"`, e);
      }
    },
    [key]
  );

  return [state, setAndPersist];
}
