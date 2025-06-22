// src/components/atoms/BorderedContainer/BorderedContainer.jsx
import React from 'react'
import { View } from 'react-native'
import styles from './styles'

export default function BorderedContainer({ children, onLayout }) {
  return (
    <View style={styles.container} onLayout={onLayout}>
      {children}
    </View>
  )
}
