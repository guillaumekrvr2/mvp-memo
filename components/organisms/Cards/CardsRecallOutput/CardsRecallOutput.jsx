import React, { forwardRef } from 'react'
import { OutputCarousel } from '../../../molecules/Cards/OutputCarousel/OutputCarousel'

export const CardsRecallOutput = forwardRef(({ 
  outputSlots, 
  objectif 
}, ref) => {
  return (
    <OutputCarousel
      ref={ref}
      outputSlots={outputSlots}
      objectif={objectif}
      spacing={30}
    />
  )
})