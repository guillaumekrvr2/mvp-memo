import React from 'react'
import { View } from 'react-native'
import { SuitTab } from '../../../atoms/Cards/SuitTab/SuitTab'
import { styles } from './styles'

const suitColors = {
  spades: '#000',
  clubs: '#000', 
  hearts: '#d32f2f',
  diamonds: '#d32f2f'
}

const suitSymbols = {
  spades: '♠',
  hearts: '♥', 
  diamonds: '♦',
  clubs: '♣'
}

export function SuitTabBar({ 
  suits = ['spades', 'hearts', 'diamonds', 'clubs'],
  selectedSuit, 
  onSuitSelect 
}) {
  return (
    <View style={styles.container}>
      {suits.map(suit => (
        <SuitTab
          key={suit}
          suit={suit}
          isSelected={selectedSuit === suit}
          onPress={onSuitSelect}
          suitSymbol={suitSymbols[suit]}
          suitColor={suitColors[suit]}
        />
      ))}
    </View>
  )
}