// hooks/Commons/useCountdownDisplay.js
import { useMemo } from 'react'

/**
 * Hook pour gérer l'affichage conditionnel selon le type de décompte
 * @param {string} discipline - Type de discipline ('spokens', 'cards', 'numbers')
 * @param {Object} data - Données pour l'affichage (objectif, temps, etc.)
 * @param {string} currentItem - Item actuel à afficher (pour les séquences)
 * @param {number} currentPhaseIndex - Index de la phase actuelle
 * @param {number} counter - Compteur classique (pour décompte normal)
 */
export const useCountdownDisplay = (discipline, data, currentItem, currentPhaseIndex, counter) => {
  const { objectif, temps, cardsCount } = data
  
  // Fonction pour obtenir le label de l'objectif
  const getObjectifLabel = useMemo(() => {
    switch (discipline) {
      case 'cards': return 'Cartes'
      case 'spokens': return 'Chiffres à retenir'
      default: return 'Objectif'
    }
  }, [discipline])
  
  // Fonction pour obtenir la valeur de l'objectif
  const getObjectifValue = useMemo(() => {
    switch (discipline) {
      case 'cards': 
        return `${objectif} cartes (${cardsCount} simultanées)`
      case 'spokens': 
        return `${objectif} chiffres`
      default: 
        return objectif
    }
  }, [discipline, objectif, cardsCount])
  
  // Fonction pour obtenir l'affichage central
  const getDisplayValue = useMemo(() => {
    if (discipline === 'spokens') {
      return currentItem || 'A'
    }
    return counter
  }, [discipline, currentItem, counter])
  
  // Fonction pour obtenir le texte d'instruction
  const getInstructionText = useMemo(() => {
    if (discipline === 'spokens') {
      switch (currentPhaseIndex) {
        case 0: return 'Préparez-vous...'
        case 1: return 'Décompte final...'
        default: return 'Préparez-vous...'
      }
    }
    return 'Préparez-vous...'
  }, [discipline, currentPhaseIndex])
  
  // Fonction pour obtenir les détails additionnels
  const getAdditionalDetails = useMemo(() => {
    const details = []
    
    if (discipline === 'spokens') {
      details.push({
        label: 'Mode',
        value: 'Audio'
      })
    } else if (temps !== undefined) {
      details.push({
        label: 'Temps',
        value: `${temps} secondes`
      })
    }
    
    return details
  }, [discipline, temps])
  
  return {
    objectifLabel: getObjectifLabel,
    objectifValue: getObjectifValue,
    displayValue: getDisplayValue,
    instructionText: getInstructionText,
    additionalDetails: getAdditionalDetails
  }
}