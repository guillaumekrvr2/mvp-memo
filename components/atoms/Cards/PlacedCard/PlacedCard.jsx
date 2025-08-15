import React from 'react'
import { TouchableOpacity, Image, Vibration } from 'react-native'
import { styles } from './styles'

export function PlacedCard({ 
  card, 
  index, 
  spacing = 30,
  onPress 
}) {
  const handlePress = () => {
    if (onPress) {
      Vibration.vibrate(15)
      onPress()
    }
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          transform: [{ translateX: index * spacing }],
          zIndex: index + 1
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image 
        source={card.asset} 
        style={styles.cardImage} 
        resizeMode="contain" 
      />
    </TouchableOpacity>
  )
}