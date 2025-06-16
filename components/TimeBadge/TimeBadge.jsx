// src/components/TimeBadge/TimeBadge.jsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../theme'        // ou 'src/theme' si tu utilises un alias
import styles from './styles'

export default function TimeBadge({ minutes }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="time-outline"
        size={16}
        color={theme.colors.icon}           // ou un color littéral, p.ex. "#A2A2A2"
      />
      <Text style={styles.text}>{minutes} min</Text>
    </View>
  )
}
