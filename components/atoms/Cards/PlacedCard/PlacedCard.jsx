import React from 'react'
import { View, Image } from 'react-native'
import { styles } from './styles'

export function PlacedCard({ 
  card, 
  index, 
  spacing = 30 
}) {
  return (
    <View
      style={[
        styles.container,
        {
          transform: [{ translateX: index * spacing }],
          zIndex: index + 1
        }
      ]}
    >
      <Image 
        source={card.asset} 
        style={styles.cardImage} 
        resizeMode="contain" 
      />
    </View>
  )
}