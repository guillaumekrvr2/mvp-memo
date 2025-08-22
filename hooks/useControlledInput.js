import { useState, useEffect, useCallback } from 'react'

/**
 * Hook pour inputs contrôlés :
 * - transforme toujours `value` en string
 * - accepte un onChange facultatif (noop si absent)
 */
export default function useControlledInput(
  value,
  onChange = () => {}
) {
  // 1. Initialise toujours un string ('' si undefined / null)
  const [internal, setInternal] = useState(String(value ?? ''))

  // 2. Si la prop `value` change (number, null, whatever), on re-cast et met à jour
  useEffect(() => {
    const str = String(value ?? '')
    setInternal(str)
  }, [value])

  // 3. Quand l’utilisateur tape, on met à jour localement ET on appelle la callback
  const handleChange = useCallback(text => {
    setInternal(text)
    onChange(text)
  }, [onChange])

  return [internal, handleChange]
}
