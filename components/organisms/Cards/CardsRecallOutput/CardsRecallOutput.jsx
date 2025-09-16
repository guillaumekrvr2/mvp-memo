import React, { forwardRef } from 'react'
import { OutputCarousel } from '../../../molecules/Cards/OutputCarousel/OutputCarousel'

export const CardsRecallOutput = forwardRef(({
  outputSlots,
  objectif,
  onCardRemove,
  // Props pour le slot selection
  selectedSlotIndex,
  onSlotSelect,
  // Props pour le mode correction
  correctCards = [],
  showCorrection = false
}, ref) => {
  return (
    <OutputCarousel
      ref={ref}
      outputSlots={outputSlots}
      objectif={objectif}
      spacing={30}
      onCardRemove={onCardRemove}
      selectedSlotIndex={selectedSlotIndex}
      onSlotSelect={onSlotSelect}
      correctCards={correctCards}
      showCorrection={showCorrection}
    />
  )
})