// src/components/atoms/InputField/InputField.jsx
import React, { memo } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import styles from './styles'
import useControlledInput from '../../../hooks/useControlledInput'

function InputField({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  style,
  placeholderTextColor = '#888',
  ...rest
}) {

  const [internal, handleChange] = useControlledInput(value, onChangeText)

  return (
    <TextInput
      value={internal}
      onChangeText={handleChange}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      autoCompleteType="off"
      clearButtonMode="never"
      clearTextOnFocus={false}
      underlineColorAndroid="transparent"
      style={[styles.base, style]}
      {...rest}
    />
  )
}

// On mémoïse proprement :
const MemoInputField = memo(InputField)
// Facultatif, mais ça évite certains warnings de React Native :
MemoInputField.displayName = 'InputField'

export default MemoInputField