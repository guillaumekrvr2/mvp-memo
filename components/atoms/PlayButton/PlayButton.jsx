// src/components/atoms/PlayButton/PlayButton.jsx
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import * as Haptics from 'expo-haptics'
import styles from './styles'

/**
 * Atomique : un simple bouton circulaire "PLAY".
 * - onPress : callback déclenché après vibration.
 * - label   : texte affiché (par défaut "PLAY").
 */
export default function PlayButton({ onPress, label = 'PLAY' }) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress()
  }

  return (
    <TouchableOpacity
      style={styles.playButton}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.playText}>{label}</Text>
    </TouchableOpacity>
  )
}
