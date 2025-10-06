import { useState, useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { formatDisplayText, cleanNumberInput, convertToAnswerArray } from '../../utils/numbers/formatters'

/**
 * Hook pour gérer l'input de rappel de nombres
 * @param {number} objectif - Nombre de chiffres attendus
 * @param {number} cols - Nombre de colonnes pour l'affichage (défaut: 6)
 * @param {number} lineHeight - Hauteur d'une ligne en pixels (défaut: 72)
 * @returns {Object} Propriétés et méthodes pour gérer l'input
 */
export default function useNumbersRecallInput(objectif, cols = 6, lineHeight = 72) {
  const [userInput, setUserInput] = useState('')

  // Calcul de la hauteur optimale du TextInput basé sur l'objectif
  const calculatedInputHeight = useMemo(() => {
    const estimatedLines = Math.ceil(objectif / cols)
    const minHeight = 300
    const calculatedHeight = estimatedLines * lineHeight + 100
    return Math.max(minHeight, calculatedHeight)
  }, [objectif, cols, lineHeight])

  // Placeholder pour l'affichage
  const placeholder = useMemo(() => {
    return '123456...' // 6 chiffres par ligne
  }, [])

  // Styles dynamiques pour le TextInput principal
  const mainInputStyle = useMemo(() => ({
    height: calculatedInputHeight,
    ...(Platform.OS === 'ios' && {
      textAlign: 'center',
      width: '100%',
      alignSelf: 'center',
      fontVariant: ['tabular-nums'],
      paddingHorizontal: 12,
    })
  }), [calculatedInputHeight])

  // Styles dynamiques pour le ScrollView content
  const inputScrollContentStyle = useMemo(() => ({
    ...(Platform.OS === 'ios' && {
      alignItems: 'center',
      justifyContent: 'flex-start',
    })
  }), [])

  // Handler pour le changement d'input
  const handleInputChange = useCallback((text) => {
    const cleanText = cleanNumberInput(text, objectif)
    setUserInput(cleanText)
  }, [objectif])

  // Formate le texte pour l'affichage
  const displayValue = useMemo(() => {
    return formatDisplayText(userInput, cols)
  }, [userInput, cols])

  // Convertit l'input en tableau pour la navigation vers correction
  const getAnswerArray = useCallback(() => {
    return convertToAnswerArray(userInput, objectif)
  }, [userInput, objectif])

  return {
    userInput,
    displayValue,
    handleInputChange,
    getAnswerArray,
    placeholder,
    mainInputStyle,
    inputScrollContentStyle,
    calculatedInputHeight,
  }
}
