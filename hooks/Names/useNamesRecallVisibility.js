// hooks/Names/useNamesRecallVisibility.js
import { useState, useCallback, useEffect } from 'react'

/**
 * Hook pour gérer la visibilité des éléments dans la liste de rappel des noms
 * Implémente un lazy loading avec buffer pour optimiser les performances
 * @param {Array} profiles - Liste des profils
 * @param {Object} options - Options de configuration
 * @param {boolean} options.isComplexLayout - True si layout complexe (NamesCorrectionScreen)
 */
export const useNamesRecallVisibility = (profiles) => {
  const [visibleItems, setVisibleItems] = useState(new Set())

  // Initialiser avec les premiers éléments visibles
  useEffect(() => {
    if (profiles.length > 0) {
      // Version simple identique à NamesRecallScreen
      const initialVisible = new Set(
        profiles.slice(0, 6).map(p => p.id)
      )
      setVisibleItems(initialVisible)
    }
  }, [profiles])


  // Gestionnaire de changement de visibilité
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 0) return
    const visibleIndices = viewableItems.map(item => 
      profiles.findIndex(p => p.id === item.item.id)
    ).filter(index => index !== -1)
    
    if (visibleIndices.length === 0) return
    
    const minIndex = Math.min(...visibleIndices)
    const maxIndex = Math.max(...visibleIndices)
    
    const bufferSize = 2
    const startIndex = Math.max(0, minIndex - bufferSize)
    const endIndex = Math.min(profiles.length - 1, maxIndex + bufferSize)
    
    const bufferedVisibleIds = new Set()
    for (let i = startIndex; i <= endIndex; i++) {
      bufferedVisibleIds.add(profiles[i].id)
    }
    
    setVisibleItems(prev => {
      const combined = new Set([...prev, ...bufferedVisibleIds])
      
      const cleanedVisibleIds = new Set()
      const maxDistance = 4
      
      for (const id of combined) {
        const itemIndex = profiles.findIndex(p => p.id === id)
        if (itemIndex !== -1) {
          const distanceFromBuffer = Math.min(
            Math.abs(itemIndex - startIndex),
            Math.abs(itemIndex - endIndex)
          )
          
          if (itemIndex >= startIndex && itemIndex <= endIndex) {
            cleanedVisibleIds.add(id)
          } else if (distanceFromBuffer <= maxDistance) {
            cleanedVisibleIds.add(id)
          }
        }
      }
      
      return cleanedVisibleIds
    })
  }, [profiles])

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    waitForInteraction: false,
    minimumViewTime: 200,
  }

  return {
    visibleItems,
    onViewableItemsChanged,
    viewabilityConfig,
    isItemVisible: useCallback((itemId) => visibleItems.has(itemId), [visibleItems])
  }
}