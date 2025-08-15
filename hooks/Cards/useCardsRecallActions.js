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
  outputScrollRef,
  objectif,
  navigation,
  startTime
}) {
  const handleComplete = useCallback((finalSlots) => {
    const endTime = Date.now()
    const durationMs = endTime - startTime.current
    const placedCards = finalSlots.map(slot => slot.card).filter(Boolean)
    
    const errorsCount = 0 // TODO: comparer avec memorizedCards
    
    const result = {
      placed: placedCards,
      durationMs,
      errorsCount
    }

    navigation.goBack()
    // TODO: navigation.navigate('Correction', result)
  }, [navigation, startTime])

  const handleCardSelect = useCallback((card) => {
    const availableSlots = outputSlots.filter(slot => slot.card === null)
    if (availableSlots.length === 0) {
      Vibration.vibrate([0, 50, 100, 50])
      return
    }

    // Save current state for undo
    const currentState = {
      outputSlots: [...outputSlots]
    }
    setUndoStack(prev => [...prev, currentState])
    setRedoStack([])

    // Add card to first available slot
    const newOutputSlots = [...outputSlots]
    newOutputSlots[availableSlots[0].id] = {
      ...availableSlots[0],
      card: card
    }
    setOutputSlots(newOutputSlots)
    
    Vibration.vibrate([0, 30, 20, 50])

    // Auto-scroll to focus on the last filled card
    setTimeout(() => {
      const lastFilledIndex = newOutputSlots.map((slot, index) => slot.card ? index : -1)
        .filter(index => index >= 0)
        .pop()
      
      if (lastFilledIndex >= 0 && outputScrollRef.current) {
        const cardSpacing = 30
        outputScrollRef.current.scrollTo({
          x: Math.max(0, (lastFilledIndex - 1) * cardSpacing),
          animated: true
        })
      }
    }, 200)

    // Check completion
    const filledSlots = newOutputSlots.filter(slot => slot.card !== null).length
    if (filledSlots >= objectif) {
      handleComplete(newOutputSlots)
    }
  }, [outputSlots, objectif, handleComplete, setOutputSlots, setUndoStack, setRedoStack, outputScrollRef])

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
    handleUndo,
    handleRedo,
    handleRemoveCard,
    handleComplete
  }
}