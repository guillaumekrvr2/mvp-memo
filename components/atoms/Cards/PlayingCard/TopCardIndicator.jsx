// 📁 components/atoms/PlayingCard/TopCardIndicator.jsx
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

export function TopCardIndicator({ originalIndex }) {
  return (
    <View style={styles.topCardIndicator}>
      <Text style={styles.topCardText}>#{originalIndex}</Text>
    </View>
  )
}