//hooks/useProgressWithCallback.js
import { useRef, useEffect, useState } from 'react'
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
  const [isMounted, setIsMounted] = useState(true)
  const animationRef = useRef(null) // 🆕 Ref pour l'animation

  // Mettre à jour la référence du callback sans redémarrer l'animation
  useEffect(() => {
    callbackRef.current = onComplete
  }, [onComplete])

  // Suivre l'état monté du composant
  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
      // 🆕 Cleanup supplémentaire : annuler le callback pour empêcher les navigations fantômes
      callbackRef.current = null
    }
  }, [])

  useEffect(() => {
    progress.setValue(0)
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: durationSec * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    })

    animationRef.current = animation // 🆕 Sauvegarder la ref de l'animation

    animation.start(({ finished }) => {
      // 🆕 Double vérification : isMounted ET callbackRef existe
      if (finished && isMounted && callbackRef.current) {
        callbackRef.current()
      }
    })

    // Cleanup amélioré : stop explicite de l'animation
    return () => {
      if (animationRef.current) {
        animationRef.current.stop() // 🆕 Stop explicite via la ref
        animationRef.current = null
      }
    }
  }, [durationSec, progress]) // ✅ Retiré isMounted - ne doit pas relancer l'animation

  return progress
}
