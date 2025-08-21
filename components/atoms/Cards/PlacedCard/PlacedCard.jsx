import React from 'react'
import { TouchableOpacity, Image, Vibration } from 'react-native'
import { styles } from './styles'

export function PlacedCard({ 
  card, 
  index, 
  spacing = 30,
  onPress,
  // Props pour le mode correction
  isCorrect = null,
  showCorrection = false
}) {
  const handlePress = () => {
    if (onPress) {
      Vibration.vibrate(15)
      onPress()
    }
  }

  // Style de correction : grisement pour cartes fausses
  const getCorrectionStyle = () => {
    if (!showCorrection || isCorrect === null) {
      return {}
    }
    // Griser seulement les cartes fausses
    if (!isCorrect) {
      return {
        opacity: 0.4
      }
    }
    return {}
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          transform: [{ translateX: index * spacing }],
          zIndex: index + 1
        },
        getCorrectionStyle()
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