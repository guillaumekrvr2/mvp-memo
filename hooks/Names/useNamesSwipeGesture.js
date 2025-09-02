// hooks/Names/useNamesSwipeGesture.js
import { useSharedValue } from 'react-native-reanimated'
import { Gesture } from 'react-native-gesture-handler'
import { withSpring, withTiming, runOnJS } from 'react-native-reanimated'
import { Dimensions } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

export function useNamesSwipeGesture({ isTopProfile, onSwipe }) {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotateZ = useSharedValue(0)
  const scale = useSharedValue(1)
  
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      if (isTopProfile) {
        scale.value = withSpring(1.05)
      }
    })
    .onUpdate((event) => {
      if (isTopProfile) {
        translateX.value = event.translationX
        translateY.value = event.translationY * 0.5 // Même ratio que les cartes
        rotateZ.value = -10 + (event.translationX / 10) // Même rotation que les cartes
      }
    })
    .onEnd((event) => {
      const threshold = screenWidth * 0.3
      const isSwipeOut = Math.abs(event.translationX) > threshold || Math.abs(event.velocityX) > 500
      
      if (isTopProfile && isSwipeOut) {
        const direction = event.translationX > 0 ? 1 : -1
        
        // Animation de sortie identique aux cartes
        translateX.value = withTiming(direction * screenWidth * 1.5, { duration: 400 })
        translateY.value = withTiming(translateY.value + direction * 150, { duration: 400 })
        rotateZ.value = withTiming(direction * 25, { duration: 400 })
        scale.value = withTiming(0.8, { duration: 400 })
        
        // Déclencher le callback IMMÉDIATEMENT comme les cartes
        runOnJS(onSwipe)()
      } else {
        // Retour à la position initiale avec les mêmes paramètres que les cartes
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 })
        translateY.value = withSpring(0, { damping: 15, stiffness: 150 })
        rotateZ.value = withSpring(0, { damping: 15 })
        scale.value = withSpring(1, { damping: 15, stiffness: 150 })
      }
    })

  return {
    panGesture,
    translateX,
    translateY,
    rotateZ,
    scale
  }
}