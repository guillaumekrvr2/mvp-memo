// components/atoms/InputCell/InputCell.jsx
import React, { forwardRef, memo } from 'react'
import { TextInput, Platform } from 'react-native'

const InputCell = memo(forwardRef(function InputCell(
  { value, style, onChangeText, onKeyPress },
  ref
) {
  return (
    <TextInput
      ref={ref}
      value={value}
      style={style}
      keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
      maxLength={1}
      blurOnSubmit={false}
      selectTextOnFocus={true}  // Sélectionne le texte au focus pour remplacement rapide
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
      // Optimisations supplémentaires
      returnKeyType="next"
      textContentType="oneTimeCode"  // Aide pour l'accessibilité
      autoCorrect={false}
      spellCheck={false}
    />
  )
}))

export default InputCell