// components/molecules/Names/NamesCorrectionCard/NamesCorrectionCard.jsx
import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LazyImage from '../../../atoms/Commons/LazyImage/LazyImage'
import { styles } from './styles'

const NamesCorrectionCard = memo(({ 
  profile, 
  userAnswer = {}, 
  isVisible = true,
  onReveal
}) => {
  // Vérifier si les réponses sont correctes
  const isFirstNameCorrect = userAnswer.firstName?.toLowerCase().trim() === profile.firstName?.toLowerCase().trim()
  const isLastNameCorrect = userAnswer.lastName?.toLowerCase().trim() === profile.lastName?.toLowerCase().trim()
  
  // État de révélation
  const isRevealed = userAnswer.isRevealed

  const handlePress = () => {
    if (!isRevealed) {
      onReveal?.(profile.id)
    }
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
    >
      
      {/* Image du profil */}
      <View style={styles.imageContainer}>
        <LazyImage
          source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
          style={styles.profileImage}
          profileId={`correction-${profile.id}`}
          isVisible={isVisible}
          resizeMode="cover"
        />
      </View>

      {/* Champs de saisie pour prénom et nom */}
      <View style={styles.inputContainer}>
        {/* Prénom */}
        <View style={[
          styles.nameInput,
          isFirstNameCorrect ? styles.correctAnswerCell : styles.incorrectAnswerCell
        ]}>
          <Text style={[
            styles.nameInputText,
            isFirstNameCorrect ? styles.correctAnswerText : styles.incorrectAnswerText
          ]}>
            {isRevealed ? profile.firstName : (userAnswer.firstName || '—')}
          </Text>
        </View>

        {/* Nom */}
        <View style={[
          styles.nameInput,
          isLastNameCorrect ? styles.correctAnswerCell : styles.incorrectAnswerCell
        ]}>
          <Text style={[
            styles.nameInputText,
            isLastNameCorrect ? styles.correctAnswerText : styles.incorrectAnswerText
          ]}>
            {isRevealed ? profile.lastName : (userAnswer.lastName || '—')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})

NamesCorrectionCard.displayName = 'NamesCorrectionCard'

export default NamesCorrectionCard