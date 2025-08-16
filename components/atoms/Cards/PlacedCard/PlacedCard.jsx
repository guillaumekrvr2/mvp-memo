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

  // Style de bordure pour la correction
  const getBorderStyle = () => {
    if (!showCorrection || isCorrect === null) {
      return {}
    }
    return {
      borderWidth: 2,
      borderColor: isCorrect ? '#4caf50' : '#f44336',
      borderRadius: 5
    }
  }

  // Style du container pour le mode correction
  const getContainerStyle = () => {
    if (!showCorrection || isCorrect === null) {
      return {}
    }
    return getBorderStyle()
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          transform: [{ translateX: index * spacing }],
          zIndex: index + 1
        },
        getContainerStyle()
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