// hooks/Cards/useCardsRecall.js - Hook principal qui combine tout
import { useCardDeck } from './useCardDeck'
import { useCardsBySuit } from './useCardsBySuit'
import { useCardsRecallState } from './useCardsRecallState'
import { useCardsRecallActions } from './useCardsRecallActions'

export function useCardsRecall({ objectif, navigation }) {
  const { deck } = useCardDeck(objectif)
  const cardsBySuit = useCardsBySuit(deck)
  
  const {
    startTime,
    outputSlots,
    setOutputSlots,
    undoStack,
    setUndoStack,
    redoStack,
    setRedoStack,
    selectedSuitTab,
    setSelectedSuitTab,
    outputScrollRef
  } = useCardsRecallState(objectif)

  const {
    handleCardSelect,
    handleUndo,
    handleRedo,
    handleRemoveCard,
    handleComplete
  } = useCardsRecallActions({
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
  })

  return {
    // State
    outputSlots,
    selectedSuitTab,
    setSelectedSuitTab,
    outputScrollRef,
    undoStack,
    redoStack,
    
    // Data
    cardsBySuit,
    
    // Actions
    handleCardSelect,
    handleUndo,
    handleRedo,
    handleRemoveCard
  }
}