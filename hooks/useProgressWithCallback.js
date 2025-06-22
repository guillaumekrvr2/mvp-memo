//hooks/useProgressWithCallback.js
import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

/**
 * Fait progresser une valeur animée [0→1], puis appelle callback.
 * @param {number} durationSec Durée de l’anim en secondes
 * @param {() => void} onComplete Ce qu’on fait quand c’est fini
 * @returns {Animated.Value} La valeur animée à passer au ProgressBar
 */
export default function useProgressWithCallback(durationSec, onComplete) {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    progress.setValue(0)
    Animated.timing(progress, {
      toValue: 1,
      duration: durationSec * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onComplete?.()
    })
  }, [durationSec, progress])

  return progress
}
