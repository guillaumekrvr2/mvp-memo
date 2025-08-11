// components/molecules/MemorizationHeader/MemorizationHeader.jsx
import React, { useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '../../../atoms/Commons/BackButton/BackButton'
import DoneButton from '../../../atoms/Commons/DoneButton/DoneButton'
import ProgressBar from '../../../atoms/Commons/ProgressBar/ProgressBar'
import useProgressWithCallback from '../../../../hooks/useProgressWithCallback'

export default function MemorizationHeader({ 
  onBack, 
  onDone, 
  duration
}) {
  // Récupère les insets de la safe area
  const insets = useSafeAreaInsets()
  
  // Crée une Animated.Value statique pour le cas sans timer
  const staticProgress = useRef(new Animated.Value(0)).current

  // N'utilise le hook de progress QUE si duration est un nombre > 0
  const progress = (duration && duration > 0) 
    ? useProgressWithCallback(duration, onDone) 
    : staticProgress

  return (
    <View style={[styles.container, { paddingTop: insets.top + 5 }]}>
      <View style={styles.header}>
        <BackButton onPress={onBack} variant="minimal" />
        <ProgressBar progress={progress} />
        <DoneButton onPress={onDone} variant="primary" label="Done" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
})