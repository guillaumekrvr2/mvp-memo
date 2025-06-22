// src/hooks/useGrid.js
import { useMemo, useState } from 'react'
/**
 * @param {number[]} items      Tableau de valeurs
 * @param {number} cols        Nombre de colonnes
 * @param {number} grouping    Taille d’un groupe pour highlight
 */
export default function useGrid(items, cols, grouping) {
  const total = items.length
  const maxIndex = Math.ceil(total / grouping) - 1
  const [highlightIndex, setHighlightIndex] = useState(0)
  const totalGroups = Math.ceil(total / grouping)

  const rows = useMemo(() => {
    const r = []
    for (let i = 0; i < total; i += cols) {
      r.push(items.slice(i, i + cols))
    }
    return r
  }, [items, cols, total])

  const highlightDigits = useMemo(() => {
    const start = highlightIndex * grouping
    return items.slice(start, start + grouping).join('')
  }, [items, grouping, highlightIndex])

  return { rows, highlightIndex, setHighlightIndex, maxIndex, highlightDigits, totalGroups }
}
