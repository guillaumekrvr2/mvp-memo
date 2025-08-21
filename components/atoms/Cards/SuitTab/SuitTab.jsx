import React from 'react'
import { TouchableOpacity, Text, Vibration } from 'react-native'
import { styles } from './styles'

export function SuitTab({ 
  suit, 
  isSelected, 
  onPress, 
  suitSymbol, 
  suitColor 
}) {
  const handlePress = () => {
    Vibration.vibrate(15)
    onPress(suit)
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected
      ]}
      onPress={handlePress}
    >
      <Text style={[
        styles.symbol,
        { color: suitColor === '#000' ? '#fff' : suitColor }
      ]}>
        {suitSymbol}
      </Text>
      {/* Initiales supprimées */}
    </TouchableOpacity>
  )
}