// hooks/useNamesRecallNavigation.js
import { useRef, useCallback } from 'react'

/**
 * Hook pour gérer la navigation entre les champs de saisie des cartes de rappel
 * Gère les refs des inputs et la logique de navigation avec scrolling automatique
 */
export const useNamesRecallNavigation = (profiles) => {
  const inputRefs = useRef({})
  const flatListRef = useRef(null)

  // Navigation vers le prochain input
  const navigateToNextInput = useCallback((currentProfileId, currentField) => {
    const currentIndex = profiles.findIndex(p => p.id === currentProfileId)
    
    if (currentField === 'firstName') {
      // Prénom → Nom de la même carte
      const lastNameRef = inputRefs.current[`${currentProfileId}-lastName`]
      lastNameRef?.focus()
    } else if (currentField === 'lastName') {
      // Nom → Prénom de la carte suivante
      const nextIndex = currentIndex + 1
      if (nextIndex < profiles.length) {
        const nextProfileId = profiles[nextIndex].id
        const nextFirstNameRef = inputRefs.current[`${nextProfileId}-firstName`]
        
        if (nextFirstNameRef) {
          // La ref existe déjà, focus direct
          nextFirstNameRef.focus()
        } else {
          // La carte n'est pas encore rendue, forcer le scroll et attendre
          flatListRef.current?.scrollToIndex({ 
            index: nextIndex, 
            animated: true,
            viewPosition: 0.5
          })
          
          // Attendre le rendu puis focus
          const checkAndFocus = () => {
            const ref = inputRefs.current[`${nextProfileId}-firstName`]
            if (ref) {
              ref.focus()
            } else {
              setTimeout(checkAndFocus, 50)
            }
          }
          
          setTimeout(checkAndFocus, 100)
        }
      } else {
        // Dernière carte, fermer le clavier
        const currentRef = inputRefs.current[`${currentProfileId}-lastName`]
        currentRef?.blur()
      }
    }
  }, [profiles])

  return {
    inputRefs,
    flatListRef,
    navigateToNextInput
  }
}