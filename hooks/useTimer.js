// src/hooks/useTimer.js
import { useState, useEffect } from 'react'

/**
 * Retourne le temps restant qui s’auto-décrémente chaque seconde.
 * @param {number} initialTime Temps de départ en secondes
 * @returns {[number, React.Dispatch<number>]} [timeLeft, setTimeLeft]
 */
export default function useTimer(initialTime) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])
  return [timeLeft, setTimeLeft]
}
