import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'

export function CardSlot({
  position,
  index,
  spacing = 30,
  isSelected = false,
  onPress
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        {
          transform: [{ translateX: index * spacing }],
          zIndex: index * 10 + 1000
        }
      ]}
      onPress={() => onPress && onPress(index)}
      activeOpacity={0.8}
    >
      {/* Numéro de slot au-dessus */}
      <Text style={styles.slotNumber}>
        {position}
      </Text>
    </TouchableOpacity>
  )
}