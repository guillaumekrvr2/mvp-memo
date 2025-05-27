// hooks/useAutoAdvance.js
import { useEffect } from 'react'

/**
 * Hook to auto-advance highlight index over a fixed duration
 * @param {boolean} autoAdvance - flag to enable auto advance
 * @param {number} temps - total time in seconds
 * @param {number} stepsCount - total number of highlight steps
 * @param {function} setHighlightIndex - state setter for highlight index
 */
export default function useAutoAdvance(autoAdvance, temps, stepsCount, setHighlightIndex) {
  useEffect(() => {
    if (!autoAdvance || stepsCount === 0) return

    const durationMs = temps * 1000
    const intervalMs = durationMs / stepsCount

    const id = setInterval(() => {
      setHighlightIndex(prev => {
        if (prev < stepsCount - 1) {
          return prev + 1
        } else {
          clearInterval(id)
          return prev
        }
      })
    }, intervalMs)

    return () => clearInterval(id)
  }, [autoAdvance, temps, stepsCount, setHighlightIndex])
}