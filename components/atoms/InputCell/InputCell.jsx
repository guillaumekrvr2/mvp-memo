// src/components/atoms/InputCellUI.jsx
import React, { forwardRef } from 'react'
import { TextInput } from 'react-native'

const InputCellUI = forwardRef(function InputCellUI(
  { value, style, onChangeText, onKeyPress },
  ref
) {
  return (
    <TextInput
      ref={ref}
      value={value}
      style={style}
      keyboardType="number-pad"
      maxLength={1}
      blurOnSubmit={false}
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
    />
  )
})

export default React.memo(InputCellUI)
