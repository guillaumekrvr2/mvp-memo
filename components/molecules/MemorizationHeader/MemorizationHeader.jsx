// components/molecules/MemorizationHeader/MemorizationHeader.jsx
import React, { useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import BackButton from '../../atoms/BackButton/BackButton'
import DoneButton from '../../atoms/DoneButton/DoneButton'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import useProgressWithCallback from '../../../hooks/useProgressWithCallback'

export default function MemorizationHeader({ 
  onBack, 
  onDone, 
  duration
}) {
  // Crée une Animated.Value statique pour le cas sans timer
  const staticProgress = useRef(new Animated.Value(0)).current

  // N'utilise le hook de progress QUE si duration est un nombre > 0
  const progress = (duration && duration > 0) 
    ? useProgressWithCallback(duration, onDone) 
    : staticProgress // Utilise la valeur statique au lieu d'un nombre

  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} variant="minimal" />
      <ProgressBar progress={progress} />
      <DoneButton onPress={onDone} variant="primary" label="Done" />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
})