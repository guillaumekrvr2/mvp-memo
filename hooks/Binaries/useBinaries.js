//hooks/useBinaries.js
import { useState, useEffect } from 'react'

/**
 * Génère un tableau aléatoire de bits binaires (0 et 1) à chaque fois que `count` change.
 * @param {number} count Nombre de bits à générer
 * @returns {number[]} Tableau de bits [0, 1]
 */
export default function useBinaries(count) {
  const [binaries, setBinaries] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: count }, () =>
      Math.floor(Math.random() * 2)
    )
    setBinaries(arr)
  }, [count])
  return binaries
}