import React from 'react'
import { View } from 'react-native'
import { UndoRedoButton } from '../../../atoms/Cards/UndoRedoButton/UndoRedoButton'
import { styles } from './styles'

export function UndoRedoControls({ 
  undoCount, 
  redoCount, 
  onUndo, 
  onRedo 
}) {
  return (
    <View style={styles.container}>
      <UndoRedoButton
        type="undo"
        count={undoCount}
        onPress={onUndo}
        disabled={undoCount === 0}
      />
      
      <UndoRedoButton
        type="redo"
        count={redoCount}
        onPress={onRedo}
        disabled={redoCount === 0}
      />
    </View>
  )
}