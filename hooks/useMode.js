// hooks/useMode.js
import { useState, useCallback } from 'react';

/**
 * useMode gère la sélection d'un mode parmi une liste d'options
 *
 * @param {string} initialMode  Valeur par défaut du mode (ex. 'memory-league')
 * @param {{ label: string, value: string }[]} options  Tableau d'options à présenter
 * @returns {{
 *   mode: string,
 *   onModeChange: (newMode: string) => void,
 *   options: { label: string, value: string }[]
 * }}
 */
export default function useMode(initialMode, options) {
  const [mode, setMode] = useState(initialMode);

  const onModeChange = useCallback(newMode => {
    setMode(newMode);
  }, []);

  return { mode, onModeChange, options };
}
