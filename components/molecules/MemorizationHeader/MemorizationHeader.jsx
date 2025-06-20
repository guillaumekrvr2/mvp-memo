import React from 'react'
import { View, StyleSheet } from 'react-native'
import BackButton from '../../atoms/BackButton/BackButton'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import DoneButton from '../../atoms/DoneButton/DoneButton'
import styles from './styles'

export default function MemorizationHeader({ onBack, onDone, duration }) {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} />
      <ProgressBar duration={duration} />
      <DoneButton onPress={onDone} />
    </View>
  )
}