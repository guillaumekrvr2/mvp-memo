// src/hooks/useControlledInput.js
import { useState, useEffect, useCallback } from 'react'

/**
 * Hook to manage controlled inputs with local state,
 * preserving input focus and preventing rerender flicker.
 *
 * @param {string} value - Controlled value from parent
 * @param {(text: string) => void} onChange - Callback to notify parent
 * @returns {[string, (text: string) => void]} internal value and change handler
 */
export default function useControlledInput(value, onChange) {
  const [internal, setInternal] = useState(value)

  // Sync internal state when parent value changes externally
  useEffect(() => {
    if (value !== internal) {
      setInternal(value)
    }
  }, [value, internal])

  // Stable handler to update local state and notify parent
  const handleChange = useCallback(
    (text) => {
      setInternal(text)
      onChange(text)
    },
    [onChange]
  )

  return [internal, handleChange]
}