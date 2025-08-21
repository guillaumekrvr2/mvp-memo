import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

export function CardSlot({ 
  position, 
  index, 
  spacing = 30 
}) {
  return (
    <View 
      style={[
        styles.container,
        {
          transform: [{ translateX: index * spacing }],
          zIndex: -index
        }
      ]}
    >
      {/* Numéro de position supprimé */}
    </View>
  )
}