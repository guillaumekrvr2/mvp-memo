import { useState, useCallback, useMemo } from 'react'
import { Platform } from 'react-native'

/**
 * Formate le texte binaire avec espaces Unicode et retours à la ligne forcés tous les N caractères
 * @param {string} text - Texte à formater
 * @param {number} cols - Nombre de caractères par ligne
 * @returns {string} Texte formaté avec espaces Unicode et retours à la ligne
 */
function formatBinaryDisplay(text, cols = 12) {
  if (Platform.OS !== 'ios' || !text) return text

  // Crée des lignes de N caractères avec espaces Unicode
  const lines = []
  for (let i = 0; i < text.length; i += cols) {
    const line = text.slice(i, i + cols)
    // Ajoute espaces Unicode entre chaque caractère de la ligne
    const spacedLine = line.split('').join('\u2009') // THIN SPACE U+2009
    lines.push(spacedLine)
  }

  // Joint les lignes avec des retours à la ligne
  return lines.join('\n')
}

/**
 * Nettoie le texte d'input utilisateur pour binaires
 * - Retire les espaces Unicode ajoutés pour l'affichage
 * - Retire les retours à la ligne
 * - Convertit les tirets iOS "intelligents" en tirets simples
 * - Garde uniquement 0, 1 et tirets simples
 * @param {string} text - Texte brut de l'input
 * @param {number} maxLength - Longueur maximale autorisée
 * @returns {string} Texte nettoyé
 */
function cleanBinaryInput(text, maxLength) {
  if (!text) return ''

  // Retire les espaces Unicode ajoutés pour l'affichage ET les retours à la ligne
  let cleanText = text.replace(/\u2009/g, '').replace(/\n/g, '')

  // Remplace les tirets iOS "intelligents" par des tirets simples
  cleanText = cleanText
    .replace(/—/g, '-')  // tiret cadratin → tiret simple
    .replace(/–/g, '-')  // tiret demi-cadratin → tiret simple

  // Garde uniquement 0, 1 et tirets simples
  cleanText = cleanText.replace(/[^01\-]/g, '').slice(0, maxLength)

  return cleanText
}

/**
 * Convertit l'input utilisateur en tableau pour la correction
 * - Les tirets '-' deviennent des chaînes vides (skip)
 * - Complète avec des chaînes vides jusqu'à l'objectif
 * @param {string} input - Input utilisateur nettoyé
 * @param {number} objectif - Nombre total de bits attendus
 * @returns {string[]} Tableau de bits avec '' pour les skips
 */
function convertToAnswerArray(input, objectif) {
  if (!input) return Array(objectif).fill('')

  const chars = input.split('')
  // Remplace les tirets par des chaînes vides (skip)
  const processedChars = chars.map(char => char === '-' ? '' : char)
  // Complète avec des chaînes vides jusqu'à l'objectif
  return processedChars.concat(Array(objectif - processedChars.length).fill(''))
}

/**
 * Hook pour gérer l'input de rappel de binaires avec support des tirets pour skip
 * @param {number} objectif - Nombre de bits attendus
 * @param {number} cols - Nombre de colonnes pour l'affichage (défaut: 12)
 * @param {number} lineHeight - Hauteur d'une ligne en pixels (défaut: 36)
 * @returns {Object} Propriétés et méthodes pour gérer l'input
 */
export default function useBinariesRecallInput(objectif, cols = 12, lineHeight = 36) {
  const [userInput, setUserInput] = useState('')

  // Calcul de la hauteur optimale du TextInput basé sur l'objectif
  const calculatedInputHeight = useMemo(() => {
    const estimatedLines = Math.ceil(objectif / cols)
    const minHeight = 200
    const calculatedHeight = estimatedLines * lineHeight + 50
    return Math.max(minHeight, calculatedHeight)
  }, [objectif, cols, lineHeight])

  // Placeholder pour l'affichage
  const placeholder = useMemo(() => {
    return '010101010101...'
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
    const cleanText = cleanBinaryInput(text, objectif)
    setUserInput(cleanText)
  }, [objectif])

  // Formate le texte pour l'affichage
  const displayValue = useMemo(() => {
    return formatBinaryDisplay(userInput, cols)
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
