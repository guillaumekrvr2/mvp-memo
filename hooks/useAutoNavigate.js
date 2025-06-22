//hooks/useAutoNavigate.js
import { useEffect } from 'react'

/**
 * @param {boolean} enabled    Active ou non la nav auto
 * @param {number} delay       Délai avant nav (en ms)
 * @param {Function} callback  Fonction de navigation (ex : navigation.replace)
 */
export default function useAutoNavigate(enabled, delay, callback) {
  useEffect(() => {
    if (!enabled) return
    const timer = setTimeout(callback, delay)
    return () => clearTimeout(timer)
  }, [enabled, delay, callback])
}
