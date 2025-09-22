import React, { useState } from 'react'
import { TouchableOpacity, Vibration, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { styles } from './styles'

export function PlacedCard({
  card,
  index,
  spacing = 30,
  onPress,
  // Props pour le mode correction
  isCorrect = null,
  showCorrection = false,
  correctCard = null,
  // Position pour afficher le numéro de slot
  position
}) {
  // État local pour l'effet peek (maintenir pour voir la vraie carte)
  const [isPeeking, setIsPeeking] = useState(false)
  const handlePress = () => {
    if (onPress) {
      Vibration.vibrate(15)
      onPress()
    }
  }
  
  const handlePressIn = () => {
    // Si on est en mode correction et que c'est une carte fausse, montrer la vraie carte
    if (showCorrection && !isCorrect && correctCard) {
      Vibration.vibrate(15)
      setIsPeeking(true)
    }
  }
  
  const handlePressOut = () => {
    // Arrêter de montrer la vraie carte
    setIsPeeking(false)
  }

  // Style de correction : grisement pour cartes fausses
  const getCorrectionStyle = () => {
    if (!showCorrection || isCorrect === null) {
      return {}
    }
    // Griser seulement les cartes fausses (sauf quand on fait peek)
    if (!isCorrect && !isPeeking) {
      return {
        opacity: 0.4
      }
    }
    return {}
  }
  
  // Déterminer quelle carte afficher : vraie carte pendant le peek, sinon carte utilisateur
  const displayCard = showCorrection && !isCorrect && isPeeking && correctCard ? correctCard : card

  return (
    <View
      style={[
        styles.wrapper,
        {
          transform: [{ translateX: index * spacing }],
          zIndex: index * 10 + 1005
        }
      ]}
    >
      {/* Numéro de slot au-dessus */}
      {position && (
        <Text style={styles.slotNumber}>
          {position}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.container,
          getCorrectionStyle()
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Image
          source={displayCard.asset}
          style={styles.cardImage}
          contentFit="contain"
          priority="high"
          cachePolicy="memory-disk"
        />
      </TouchableOpacity>
    </View>
  )
}