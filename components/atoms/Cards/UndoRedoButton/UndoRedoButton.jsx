import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { styles } from './styles'

export function UndoRedoButton({ 
  type, 
  count, 
  onPress, 
  disabled 
}) {
  const isUndo = type === 'undo'
  const icon = isUndo ? '↶' : '↷'
  const label = isUndo ? 'Undo' : 'Redo'

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>
        {icon} {label} ({count})
      </Text>
    </TouchableOpacity>
  )
}