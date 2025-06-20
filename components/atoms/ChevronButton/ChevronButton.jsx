//components/atoms/ChevronButton/ChevronButton.jsx
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import styles from './styles'

/**
 * @param {'left'|'right'} direction  Orientation du chevron
 * @param {() => void} onPress       Callback au clic
 * @param {number} [size=40]         Taille de l'icône
 * @param {string} [color='#fff']    Couleur de l'icône
 * @param {object} [style]           Styles additionnels pour le container
 */
export default function ChevronButton({
  direction,
  onPress,
  size = 40,
  color = '#fff',
  style,
}) {
  const iconName =
    direction === 'left'
      ? 'chevron-back-circle'
      : 'chevron-forward-circle'

  const handlePress = () => {
    // Vibration légère à chaque pression
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    // Appel de la callback fournie
    onPress && onPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, style]}
      hitSlop={styles.hitSlop}
      activeOpacity={0.7}
    >
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  )
}
