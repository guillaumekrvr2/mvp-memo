// hooks/useAutoAdvance.js
import { useEffect } from 'react'

/**
 * Hook to auto-advance highlight index over a fixed duration
 * @param {boolean} autoAdvance - flag to enable auto advance
 * @param {number} temps - total time in seconds
 * @param {number} rowsCount - total number of highlight steps
 * @param {function} setHighlightIndex - state setter for highlight index
 */
export default function useAutoAdvance(autoAdvance, temps, rowsCount, setHighlightIndex) {
  useEffect(() => {
    if (!autoAdvance || rowsCount === 0) return

    const durationMs = temps * 1000
    const intervalMs = durationMs / rowsCount

    const id = setInterval(() => {
      setHighlightIndex(prev => {
        if (prev < rowsCount - 1) {
          return prev + 1
        } else {
          clearInterval(id)
          return prev
        }
      })
    }, intervalMs)

    return () => clearInterval(id)
  }, [autoAdvance, temps, rowsCount, setHighlightIndex])
}