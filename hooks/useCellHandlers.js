// src/hooks/useCellHandlers.js
import { useCallback } from 'react'

/**
 * @param {object}   params
 * @param {number}   params.row
 * @param {number}   params.col
 * @param {number}   params.cols
 * @param {number}   params.objectif
 * @param {string[]} params.values
 * @param {Function} params.setCellValue  (row, col, text) => void
 * @param {React.RefObject[]} params.inputRefs
 */
export default function useCellHandlers({
  row,
  col,
  cols,
  objectif,
  values,
  setCellValue,
  inputRefs,
}) {
  const idx = row * cols + col

  const onChangeText = useCallback(
    text => {
      setCellValue(row, col, text)
      if (text && idx + 1 < objectif) {
        inputRefs.current[idx + 1]?.current.focus()
      }
    },
    [row, col, idx, objectif, setCellValue, inputRefs]
  )

  const onKeyPress = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.key !== 'Backspace') return
      const current = values[idx] || ''
      if (current === '' && idx > 0) {
        const prev = idx - 1
        setCellValue(Math.floor(prev / cols), prev % cols, '')
        inputRefs.current[prev]?.current.focus()
      } else {
        setCellValue(row, col, '')
      }
    },
    [row, col, idx, cols, values, setCellValue, inputRefs]
  )

  return { onChangeText, onKeyPress }
}
