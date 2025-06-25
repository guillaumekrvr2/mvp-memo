//hooks/useInputGrid.js
import useGrid from './useGrid'


export default function useInputGrid(cellCount, cols, grouping = 1) {
  // 1) on initialise le tableau à des chaînes vides
  const initial = Array(cellCount).fill('')
  // on réutilise useGrid en mode input (flag=true)
  const {
    rows,
    values,
    setCellValue,
    highlightIndex,
    setHighlightIndex,
    maxIndex,
    highlightDigits,
    totalGroups,
  } = useGrid(initial, cols, grouping, true)

  return {
    rows,
    values,
    setCellValue,
    highlightIndex,
    setHighlightIndex,
    maxIndex,
    highlightDigits,
    totalGroups,
  }
}