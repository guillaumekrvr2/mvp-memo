//hooks/useGrid.js
import { useMemo, useState } from 'react'
/**
 * @param {number[]} items      Tableau de valeurs
 * @param {number} cols        Nombre de colonnes
 * @param {number} grouping    Taille d’un groupe pour highlight
 * @param {boolean} inputMode  true si on veut modifier les cellules
 */
export default function useGrid(
  items,
  cols,
  grouping,
  inputMode = false
) {
  const total = items.length
  const maxIndex = Math.ceil(total / grouping) - 1
  const totalGroups = Math.ceil(total / grouping)
  const [highlightIndex, setHighlightIndex] = useState(0)

  // 1) state des valeurs en mode input
  const [values, setValues] = useState(inputMode ? [...items] : null)

  // 2) découpe plate → matrice à partir de items ou values
  const rows = useMemo(() => {
    const source = inputMode ? values : items
    const r = []
    for (let i = 0; i < total; i += cols) {
      r.push(source.slice(i, i + cols))
    }
    return r
  }, [inputMode, items, values, cols, total])

  // 3) setter ciblé pour inputs
  const setCellValue = inputMode
    ? (rowIdx, colIdx, raw) => {
        const idx = rowIdx * cols + colIdx
        const clean = raw.replace(/[^0-9]/g, '')
        setValues(v => {
          const copy = [...v]
          copy[idx] = clean
          return copy
        })
      }
    : undefined

  // 4) calcul des chiffres surlignés
  const highlightDigits = useMemo(() => {
    const start = highlightIndex * grouping
    const source = inputMode ? values : items
    return source.slice(start, start + grouping).join('')
  }, [inputMode, items, values, grouping, highlightIndex])

  // 5) on expose setCellValue et values uniquement si inputMode
  return {
    rows,
    highlightIndex,
    setHighlightIndex,
    maxIndex,
    highlightDigits,
    totalGroups,
    ...(inputMode && { values, setCellValue }),
  }
}
