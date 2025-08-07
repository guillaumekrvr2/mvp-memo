// components/molecules/RecordDisplay/RecordDisplay.jsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'

export default function RecordDisplay({ score, time, hidden = false }) {
  if (hidden) {
    return <View style={styles.hiddenContainer} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="trophy"
          size={20}
          color="#FACC48"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Meilleur score</Text>
        <Text style={styles.score}>
          {score} en {time}s
        </Text>
      </View>
    </View>
  )
}