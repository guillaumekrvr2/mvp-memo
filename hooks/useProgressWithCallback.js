//hooks/useProgressWithCallback.js
import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

/**
 * Fait progresser une valeur animée [0→1], puis appelle callback.
 * @param {number} durationSec Durée de l'anim en secondes
 * @param {() => void} onComplete Ce qu'on fait quand c'est fini
 * @returns {Animated.Value} La valeur animée à passer au ProgressBar
 */
export default function useProgressWithCallback(durationSec, onComplete) {
  const progress = useRef(new Animated.Value(0)).current
  const callbackRef = useRef(onComplete)
  
  // Mettre à jour la référence du callback sans redémarrer l'animation
  useEffect(() => {
    callbackRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    progress.setValue(0)
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: durationSec * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    })
    
    animation.start(({ finished }) => {
      if (finished) callbackRef.current?.()
    })

    // Cleanup: arrêter l'animation si le composant se démonte ou si durationSec change
    return () => {
      animation.stop()
    }
  }, [durationSec, progress]) // Retiré onComplete des dépendances

  return progress
}
