//components/atoms/ChevronButton/ChevronButton.jsx
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { styles } from './styles'

/**
 * @param {'left'|'right'} direction  Orientation du chevron
 * @param {() => void} onPress       Callback au clic
 * @param {() => void} [onLongPress] Callback au long press (3 secondes)
 * @param {number} [size=28]         Taille de l'icône
 * @param {object} [style]           Styles additionnels pour le container
 */
export default function ChevronButton({
  direction,
  onPress,
  onLongPress,
  size = 28,
  style,
}) {
  const iconName =
    direction === 'left'
      ? 'chevron-back-outline'
      : 'chevron-forward-outline'

  const handlePress = () => {
    // Vibration légère à chaque pression
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    // Appel de la callback fournie
    onPress && onPress()
  }

  const handleLongPress = () => {
    // Vibration plus forte pour le long press
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    // Appel de la callback de long press si fournie
    onLongPress && onLongPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={onLongPress ? handleLongPress : undefined}
      style={[styles.button, style]}
      hitSlop={styles.hitSlop}
      activeOpacity={0.7}
    >      
      {/* Icône chevron avec effet glow */}
      <Ionicons 
        name={iconName} 
        size={size} 
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  )
}