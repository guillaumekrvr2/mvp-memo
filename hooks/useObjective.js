// hooks/useObjective.js
import { useEffect } from 'react';
import useAsyncStorageState from './useAsyncStorageState';

/**
 * @param {string} key            Clé AsyncStorage
 * @param {string} initialValue   Valeur par défaut si vide
 */
export default function useObjective(key = 'objectif', initialValue = '') {
  const [objectif, setObjectif] = useAsyncStorageState(key, initialValue);

  // Si initialValue change (i.e. changement de mode), on réinitialise si vide
  useEffect(() => {
    if (objectif === '') {
      setObjectif(initialValue);
    }
  }, [initialValue]);

  return { objectif, setObjectif };
}
