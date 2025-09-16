// hooks/Cards/useCardsRecall.js - Hook principal qui combine tout
import { useCardDeck } from './useCardDeck'
import { useCardsBySuit } from './useCardsBySuit'
import { useCardsRecallState } from './useCardsRecallState'
import { useCardsRecallActions } from './useCardsRecallActions'

export function useCardsRecall({ objectif, navigation, memorizedCards = [], variant, mode, temps }) {
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
    selectedSlotIndex,
    setSelectedSlotIndex,
    outputScrollRef
  } = useCardsRecallState(objectif)

  const {
    handleCardSelect,
    handleSlotSelect,
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
  })

  return {
    // State
    outputSlots,
    selectedSuitTab,
    setSelectedSuitTab,
    selectedSlotIndex,
    outputScrollRef,
    undoStack,
    redoStack,

    // Data
    cardsBySuit,

    // Actions
    handleCardSelect,
    handleSlotSelect,
    handleUndo,
    handleRedo,
    handleRemoveCard,
    handleComplete
  }
}