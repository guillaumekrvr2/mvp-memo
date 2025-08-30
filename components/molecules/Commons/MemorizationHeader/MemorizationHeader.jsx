// components/molecules/MemorizationHeader/MemorizationHeader.jsx
import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '../../../atoms/Commons/BackButton/BackButton'
import DoneButton from '../../../atoms/Commons/DoneButton/DoneButton'
import ProgressBar from '../../../atoms/Commons/ProgressBar/ProgressBar'
import useProgressWithCallback from '../../../../hooks/useProgressWithCallback'

export default function MemorizationHeader({ 
  onBack, 
  onDone, 
  duration,
  // Props spécifiques aux spokens
  isSpoken = false,
  currentDigitIndex = -1,
  totalDigits = 0
}) {
  // Récupère les insets de la safe area
  const insets = useSafeAreaInsets()
  
  // Animated.Value pour le progress (utilisé différemment selon le type)
  const staticProgress = useRef(new Animated.Value(0)).current
  const spokenProgress = useRef(new Animated.Value(0)).current

  // Logique différente selon le type de discipline
  let progress;
  
  if (isSpoken) {
    // Pour les spokens : progress basé sur le nombre de chiffres
    progress = spokenProgress;
    
    useEffect(() => {
      if (totalDigits > 0 && currentDigitIndex >= 0) {
        // Calculer le progrès en temps réel pendant la lecture de chaque chiffre
        const baseProgress = currentDigitIndex / totalDigits;
        const nextProgress = (currentDigitIndex + 1) / totalDigits;
        
        // Animation fluide de 1.8 seconde (speech + pause) pour chaque chiffre
        Animated.timing(progress, {
          toValue: nextProgress,
          duration: 1800, // Durée totale par chiffre (speech + pause entre chiffres)
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(({ finished }) => {
          // Quand la progress bar est complète (dernière animation), déclencher onDone
          if (finished && nextProgress >= 1.0) {
            onDone?.();
          }
        });
      }
    }, [currentDigitIndex, totalDigits, progress, onDone]);
  } else {
    // Pour les autres disciplines : progress basé sur le temps
    progress = (duration && duration > 0) 
      ? useProgressWithCallback(duration, onDone) 
      : staticProgress;
  }

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