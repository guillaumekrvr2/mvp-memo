import React from 'react'
import { View } from 'react-native'
import { SuitTabBar } from '../../../molecules/Cards/SuitTabBar/SuitTabBar'
import { CoverFlowCarousel } from '../../../molecules/Cards/CoverFlowCarousel/CoverFlowCarousel'
import { styles } from './styles'

export function CardsRecallInput({ 
  cardsBySuit,
  selectedSuit,
  onSuitSelect,
  onCardSelect,
}) {
  const suits = ['spades', 'hearts', 'diamonds', 'clubs']
  const selectedCards = cardsBySuit[selectedSuit] || []

  return (
    <View style={styles.container}>
      <SuitTabBar
        suits={suits}
        selectedSuit={selectedSuit}
        onSuitSelect={onSuitSelect}
      />

      <CoverFlowCarousel
        cards={selectedCards}
        onCardSelect={onCardSelect}
        containerWidth={400}
        cardWidth={90}
        cardHeight={135}
      />
    </View>
  )
}