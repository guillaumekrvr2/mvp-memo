import React from 'react'
import { TouchableOpacity, Text, Vibration } from 'react-native'
import { styles } from './styles'

/**
 * SmallChevronButton - Composant mutualisé pour les chevrons dans Cards et Names
 * @param {'left'|'right'} direction - Direction du chevron
 * @param {() => void} onPress - Callback au clic normal
 * @param {() => void} [onLongPress] - Callback au long press (optionnel)
 * @param {boolean} [disabled=false] - État désactivé
 * @param {object} [style] - Styles additionnels
 */
export function SmallChevronButton({
  direction,
  onPress,
  onLongPress,
  disabled = false,
  style
}) {
  const handlePress = () => {
    if (!disabled) {
      Vibration.vibrate(50)
      onPress()
    }
  }

  const handleLongPress = () => {
    if (!disabled && onLongPress) {
      Vibration.vibrate(100) // Vibration plus forte pour le long press
      onLongPress()
    }
  }

  const chevronIcon = direction === 'left' ? '‹' : '›'

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        disabled && styles.disabled
      ]}
      onPress={handlePress}
      onLongPress={onLongPress && !disabled ? handleLongPress : undefined}
      disabled={disabled}
    >
      <Text style={[
        styles.chevron,
        disabled && styles.chevronDisabled
      ]}>
        {chevronIcon}
      </Text>
    </TouchableOpacity>
  )
}