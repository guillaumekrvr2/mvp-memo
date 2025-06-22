//hooks/useNumbers.js
import { useState, useEffect } from 'react'

/**
 * Génère un tableau aléatoire de chiffres à chaque fois que `count` change.
 * @param {number} count Nombre de chiffres à générer
 * @returns {number[]} Tableau de chiffres [0–9]
 */
export default function useNumbers(count) {
  const [numbers, setNumbers] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: count }, () =>
      Math.floor(Math.random() * 10)
    )
    setNumbers(arr)
  }, [count])
  return numbers
}
