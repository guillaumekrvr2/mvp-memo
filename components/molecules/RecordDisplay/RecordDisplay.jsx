// components/molecules/RecordDisplay/RecordDisplay.jsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'

export default function RecordDisplay({ score, time, hidden = false }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="trophy-outline"
        size={20}
        color={hidden ? 'transparent' : '#fff'}
      />
      <Text style={[styles.text, hidden && styles.hiddenText]}>
        Last best : {score} en {time}s
      </Text>
    </View>
  )
}
