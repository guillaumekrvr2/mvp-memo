import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, Vibration } from 'react-native'
import { styles } from './styles'

export function CorrectionCard({ 
  userCard,
  correctCard,
  isCorrect,
  position,
  isEmpty = false
}) {
  const [showCorrection, setShowCorrection] = useState(false)

  const handlePress = () => {
    if (!isCorrect && !isEmpty) {
      setShowCorrection(!showCorrection)
      Vibration.vibrate(10)
    }
  }

  // Couleur de bordure selon l'état
  const getBorderColor = () => {
    if (isEmpty) return 'rgba(255, 255, 255, 0.3)' // Gris pour vide
    return isCorrect ? '#4caf50' : '#f44336' // Vert/Rouge
  }

  const getBorderWidth = () => {
    return isEmpty ? 1 : 4
  }

  if (isEmpty) {
    return (
      <View style={[
        styles.container,
        {
          borderColor: getBorderColor(),
          borderWidth: getBorderWidth()
        }
      ]}>
        <Text style={styles.emptyText}>—</Text>
        <Text style={styles.positionText}>{position}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: getBorderColor(),
          borderWidth: getBorderWidth()
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isCorrect}
    >
      {/* Carte utilisateur */}
      <View style={styles.cardContainer}>
        <Image 
          source={userCard.asset} 
          style={styles.cardImage} 
          resizeMode="contain" 
        />
        {isCorrect && (
          <View style={styles.correctBadge}>
            <Text style={styles.correctBadgeText}>✓</Text>
          </View>
        )}
      </View>

      {/* Correction (si incorrecte et révélée) */}
      {!isCorrect && showCorrection && (
        <View style={styles.correctionContainer}>
          <Text style={styles.correctionLabel}>Correct:</Text>
          <Image 
            source={correctCard.asset} 
            style={styles.correctionImage} 
            resizeMode="contain" 
          />
        </View>
      )}

      {/* Position */}
      <Text style={styles.positionText}>{position}</Text>
    </TouchableOpacity>
  )
}