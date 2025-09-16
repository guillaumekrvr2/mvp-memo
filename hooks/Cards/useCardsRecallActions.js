// hooks/Cards/useCardsRecallActions.js
import { useCallback } from 'react'
import { Vibration } from 'react-native'

export function useCardsRecallActions({
  outputSlots,
  setOutputSlots,
  undoStack,
  setUndoStack,
  redoStack,
  setRedoStack,
  selectedSlotIndex,
  setSelectedSlotIndex,
  outputScrollRef,
  objectif,
  navigation,
  startTime,
  memorizedCards,
  variant,
  mode,
  temps
}) {
  const handleComplete = useCallback((finalSlots) => {
    const endTime = Date.now()
    const durationMs = endTime - startTime.current
    const placedCards = finalSlots.map(slot => slot.card).filter(Boolean)
    
    // Calcul des erreurs en comparant avec les cartes mémorisées
    const errorsCount = placedCards.reduce((errors, placedCard, index) => {
      const correctCard = memorizedCards[index]
      return errors + (placedCard && correctCard && placedCard.id !== correctCard.id ? 1 : 0)
    }, 0)
    
    const result = {
      userCards: placedCards,
      correctCards: memorizedCards,
      durationMs,
      errorsCount,
      objectif,
      variant,
      mode,
      temps
    }

    // Navigation vers l'écran de correction des cartes
    navigation.navigate('CardsCorrection', result)
  }, [navigation, startTime, memorizedCards, objectif, variant, mode, temps])

  const handleSlotSelect = useCallback((slotIndex) => {
    const slot = outputSlots[slotIndex]
    if (!slot || slot.card !== null) {
      return // Slot already filled
    }

    setSelectedSlotIndex(slotIndex)
    Vibration.vibrate([0, 20])
  }, [outputSlots, setSelectedSlotIndex])

  const handleCardSelect = useCallback((card) => {
    let targetSlotIndex = selectedSlotIndex

    // If no slot is selected, find first available slot
    if (targetSlotIndex === null) {
      const availableSlots = outputSlots.filter(slot => slot.card === null)
      if (availableSlots.length === 0) {
        Vibration.vibrate([0, 50, 100, 50])
        return
      }
      targetSlotIndex = availableSlots[0].id
    }

    const targetSlot = outputSlots[targetSlotIndex]
    if (!targetSlot || targetSlot.card !== null) {
      Vibration.vibrate([0, 50, 100, 50])
      return
    }

    // Save current state for undo
    const currentState = {
      outputSlots: [...outputSlots]
    }
    setUndoStack(prev => [...prev, currentState])
    setRedoStack([])

    // Add card to selected slot
    const newOutputSlots = [...outputSlots]
    newOutputSlots[targetSlotIndex] = {
      ...targetSlot,
      card: card
    }
    setOutputSlots(newOutputSlots)

    // Clear selected slot
    setSelectedSlotIndex(null)

    Vibration.vibrate([0, 30, 20, 50])

    // Auto-scroll to focus on the placed card
    setTimeout(() => {
      if (outputScrollRef.current) {
        const cardSpacing = 30
        outputScrollRef.current.scrollTo({
          x: Math.max(0, (targetSlotIndex - 1) * cardSpacing),
          animated: true
        })
      }
    }, 200)

    // Check completion
    const filledSlots = newOutputSlots.filter(slot => slot.card !== null).length
    if (filledSlots >= objectif) {
      handleComplete(newOutputSlots)
    }
  }, [outputSlots, selectedSlotIndex, objectif, handleComplete, setOutputSlots, setUndoStack, setRedoStack, setSelectedSlotIndex, outputScrollRef])

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) {
      Vibration.vibrate([0, 30, 30, 30])
      return
    }

    const lastState = undoStack[undoStack.length - 1]
    const currentState = {
      outputSlots: [...outputSlots]
    }

    setRedoStack(prev => [...prev, currentState])
    setUndoStack(prev => prev.slice(0, -1))
    
    setOutputSlots(lastState.outputSlots)
    
    Vibration.vibrate([0, 40, 20, 40])
  }, [undoStack, outputSlots, setOutputSlots, setUndoStack, setRedoStack])

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) {
      Vibration.vibrate([0, 30, 30, 30])
      return
    }

    const nextState = redoStack[redoStack.length - 1]
    const currentState = {
      outputSlots: [...outputSlots]
    }

    setUndoStack(prev => [...prev, currentState])
    setRedoStack(prev => prev.slice(0, -1))
    
    setOutputSlots(nextState.outputSlots)
    
    Vibration.vibrate([0, 20, 40, 20])
  }, [redoStack, outputSlots, setOutputSlots, setUndoStack, setRedoStack])

  const handleRemoveCard = useCallback((slotIndex) => {
    const slot = outputSlots[slotIndex]
    if (!slot || !slot.card) {
      return // Pas de carte à supprimer
    }

    // Save current state for undo
    const currentState = {
      outputSlots: [...outputSlots]
    }
    setUndoStack(prev => [...prev, currentState])
    setRedoStack([])

    // Remove card from slot
    const newOutputSlots = [...outputSlots]
    newOutputSlots[slotIndex] = {
      ...slot,
      card: null
    }
    setOutputSlots(newOutputSlots)
    
    Vibration.vibrate([0, 20, 40])
  }, [outputSlots, setOutputSlots, setUndoStack, setRedoStack])

  return {
    handleCardSelect,
    handleSlotSelect,
    handleUndo,
    handleRedo,
    handleRemoveCard,
    handleComplete
  }
}