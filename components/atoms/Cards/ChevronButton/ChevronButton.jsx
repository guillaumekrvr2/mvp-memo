import React from 'react'
import { TouchableOpacity, Text, Vibration } from 'react-native'
import { styles } from './styles'

export function ChevronButton({ 
  direction, 
  onPress, 
  disabled = false,
  style 
}) {
  const handlePress = () => {
    if (!disabled) {
      Vibration.vibrate(50)
      onPress()
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