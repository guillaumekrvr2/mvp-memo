//hooks/useTimer.js
import { useState, useEffect } from 'react';
import { defaultTimes } from '../config/gameConfig';

/**
 * Hook pour gérer le temps en fonction du mode sélectionné.
 * @param {string} mode  Valeur du mode (correspond à une clé de defaultTimes).
 * @returns {{temps: number, setTemps: (value: number) => void}}
 */
export default function useCountdown(mode) {
  const [temps, setTemps] = useState(defaultTimes[mode] ?? 0);

  // Lorsque le mode change, on remet le temps par défaut
  useEffect(() => {
    setTemps(defaultTimes[mode] ?? 0);
  }, [mode]);

  return { temps, setTemps };
}
