// hooks/Cards/useCardsRecall.js - Hook principal qui combine tout
import { useCardDeck } from './useCardDeck'
import { useCardsBySuit } from './useCardsBySuit'
import { useCardsRecallState } from './useCardsRecallState'
import { useCardsRecallActions } from './useCardsRecallActions'

export function useCardsRecall({ objectif, navigation, memorizedCards = [], variant, mode, temps, isMountedRef }) {
  const { deck } = useCardDeck(52)

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
    lastUsedSlotIndex,
    setLastUsedSlotIndex,
    outputScrollRef
  } = useCardsRecallState(objectif)

  // Extraire les cartes utilisées des slots de sortie
  const usedCards = outputSlots.map(slot => slot.card).filter(Boolean)
  const cardsBySuit = useCardsBySuit(deck, usedCards, objectif)

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
    lastUsedSlotIndex,
    setLastUsedSlotIndex,
    outputScrollRef,
    objectif,
    navigation,
    startTime,
    memorizedCards,
    variant,
    mode,
    temps,
    isMountedRef // 🛡️ Passer la ref pour protection
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