// hooks/Cards/useCardsRecallState.js
import { useState, useEffect, useRef } from 'react'

export function useCardsRecallState(objectif) {
  const startTime = useRef(Date.now())
  const [outputSlots, setOutputSlots] = useState([])
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [selectedSuitTab, setSelectedSuitTab] = useState('spades')
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null)
  const outputScrollRef = useRef(null)

  // Initialize output slots
  useEffect(() => {
    const slots = Array.from({ length: objectif }, (_, i) => ({
      id: i,
      position: i + 1,
      card: null
    }))
    setOutputSlots(slots)
  }, [objectif])

  return {
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
  }
}