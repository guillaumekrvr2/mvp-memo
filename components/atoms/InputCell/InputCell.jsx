// src/components/atoms/InputCell.jsx
import React, { forwardRef } from 'react'
import { TextInput } from 'react-native'

const InputCell = forwardRef(function InputCell(
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

export default React.memo(InputCell)
