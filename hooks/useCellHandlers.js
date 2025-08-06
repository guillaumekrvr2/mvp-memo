// hooks/useCellHandlers.js
import React, { useCallback, useRef } from 'react'

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
  
  // Ref pour éviter les focus multiples
  const focusTimeoutRef = useRef(null)
  
  // Fonction utilitaire pour focus avec délai
  const focusWithDelay = useCallback((targetIdx, delay = 10) => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current)
    }
    focusTimeoutRef.current = setTimeout(() => {
      inputRefs[targetIdx]?.current?.focus()
    }, delay)
  }, [inputRefs])

  const onChangeText = useCallback(
    text => {
      // Mise à jour immédiate sans conditions
      setCellValue(row, col, text)
      
      // Focus automatique seulement si :
      // 1. Un caractère est saisi (pas une suppression)
      // 2. Il reste des cellules
      // 3. Le texte n'est pas vide
      if (text.length > 0 && idx + 1 < objectif) {
        focusWithDelay(idx + 1)
      }
    },
    [row, col, idx, objectif, setCellValue, focusWithDelay]
  )

  const onKeyPress = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.key !== 'Backspace') return
      
      const current = values[idx] || ''
      
      if (current === '' && idx > 0) {
        // Si vide, efface la cellule précédente et focus dessus
        const prev = idx - 1
        setCellValue(Math.floor(prev / cols), prev % cols, '')
        focusWithDelay(prev, 50) // Délai plus long pour backspace
      } else {
        // Sinon, efface la cellule courante (sans changer le focus)
        setCellValue(row, col, '')
      }
    },
    [row, col, idx, cols, values, setCellValue, focusWithDelay]
  )

  // Nettoyage du timeout au démontage
  React.useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current)
      }
    }
  }, [])

  return { onChangeText, onKeyPress }
}