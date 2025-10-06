// hooks/useCaretPosition.js
import { useCallback, useRef } from 'react'
import { Platform } from 'react-native'

/**
 * Hook pour corriger automatiquement la position du curseur avec letterSpacing
 * Corrige les décalages entre position visuelle et position technique
 */
export function useCaretPosition(letterSpacing = 25, fontSize = 18, cols = 12) {
  const inputRef = useRef(null)
  const lastCorrectedPosition = useRef(-1)

  // Calcule la position de caractère la plus proche basée sur letterSpacing
  const snapToNearestPosition = useCallback((position, textLength) => {
    // Éviter les corrections en boucle
    if (position === lastCorrectedPosition.current) {
      return position
    }

    // Position sécurisée dans les limites du texte
    const safePosition = Math.max(0, Math.min(position, textLength))

    // Sur iOS, compenser le décalage du letterSpacing
    if (Platform.OS === 'ios') {
      // Ajustement basé sur l'observation que iOS décale d'environ letterSpacing/4 par caractère
      const adjustment = Math.floor(safePosition * letterSpacing / (fontSize * 4))
      const correctedPosition = Math.max(0, safePosition - adjustment)

      lastCorrectedPosition.current = correctedPosition
      return correctedPosition
    }

    // Android fonctionne généralement mieux, correction minimale
    lastCorrectedPosition.current = safePosition
    return safePosition
  }, [letterSpacing, fontSize])

  // Gestionnaire pour onSelectionChange avec auto-correction
  const handleSelectionChange = useCallback((event, currentText = '') => {
    const { selection } = event.nativeEvent
    const { start, end } = selection

    // Ne corriger que si c'est une simple position de curseur (pas une sélection)
    if (start === end && inputRef.current) {
      const textLength = currentText.length || 0
      const correctedPosition = snapToNearestPosition(start, textLength)

      // Appliquer la correction si nécessaire
      if (correctedPosition !== start) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelection(correctedPosition, correctedPosition)
          }
        }, 10) // Petit délai pour éviter les conflits avec React Native
      }
    }
  }, [snapToNearestPosition])

  // Calcule la position de caractère basée sur les coordonnées de touch
  const calculatePositionFromTouch = useCallback((touchX, containerWidth, textLength) => {
    // Largeur approximative d'un caractère avec letterSpacing
    const charWidth = fontSize + letterSpacing

    // Position relative dans le conteneur (0-1)
    const relativeX = touchX / containerWidth

    // Estimer la position du caractère
    const estimatedPosition = Math.round((relativeX * containerWidth) / charWidth)

    // Limiter aux bornes du texte
    return Math.max(0, Math.min(estimatedPosition, textLength))
  }, [fontSize, letterSpacing])

  // Gestionnaire pour les touches précises
  const handlePreciseTouch = useCallback((event, textLength, containerWidth) => {
    const touchX = event.nativeEvent.locationX
    const position = calculatePositionFromTouch(touchX, containerWidth, textLength)

    // Appliquer la position calculée
    if (inputRef.current) {
      inputRef.current.focus()
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelection(position, position)
        }
      }, 50)
    }
  }, [calculatePositionFromTouch])

  return {
    inputRef,
    handleSelectionChange,
    handlePreciseTouch,
    snapToNearestPosition
  }
}