import { Platform } from 'react-native'

/**
 * Formate le texte avec espaces Unicode et retours à la ligne forcés tous les N caractères
 * @param {string} text - Texte à formater
 * @param {number} cols - Nombre de caractères par ligne
 * @returns {string} Texte formaté avec espaces Unicode et retours à la ligne
 */
export function formatDisplayText(text, cols = 6) {
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
 * Nettoie le texte d'input utilisateur
 * - Retire les espaces Unicode ajoutés pour l'affichage
 * - Retire les retours à la ligne
 * - Convertit les tirets iOS "intelligents" en tirets simples
 * - Garde uniquement chiffres et tirets simples
 * @param {string} text - Texte brut de l'input
 * @param {number} maxLength - Longueur maximale autorisée
 * @returns {string} Texte nettoyé
 */
export function cleanNumberInput(text, maxLength) {
  if (!text) return ''

  // Retire les espaces Unicode ajoutés pour l'affichage ET les retours à la ligne
  let cleanText = text.replace(/\u2009/g, '').replace(/\n/g, '')

  // Remplace les tirets iOS "intelligents" par des tirets simples
  cleanText = cleanText
    .replace(/—/g, '-')  // tiret cadratin → tiret simple
    .replace(/–/g, '-')  // tiret demi-cadratin → tiret simple

  // Garde uniquement les chiffres et tirets simples
  cleanText = cleanText.replace(/[^0-9\-]/g, '').slice(0, maxLength)

  return cleanText
}

/**
 * Convertit l'input utilisateur en tableau pour la correction
 * - Les tirets '-' deviennent des chaînes vides (skip)
 * - Complète avec des chaînes vides jusqu'à l'objectif
 * @param {string} input - Input utilisateur nettoyé
 * @param {number} objectif - Nombre total de chiffres attendus
 * @returns {string[]} Tableau de chiffres avec '' pour les skips
 */
export function convertToAnswerArray(input, objectif) {
  if (!input) return Array(objectif).fill('')

  const chars = input.split('')
  // Remplace les tirets par des chaînes vides (skip)
  const processedChars = chars.map(char => char === '-' ? '' : char)
  // Complète avec des chaînes vides jusqu'à l'objectif
  return processedChars.concat(Array(objectif - processedChars.length).fill(''))
}
