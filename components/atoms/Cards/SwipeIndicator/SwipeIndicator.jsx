import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

export function SwipeIndicator({ isVisible }) {
  if (!isVisible) return null

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ↑ Swipe up to send
      </Text>
    </View>
  )
}