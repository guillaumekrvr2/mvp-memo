
// 📁 components/atoms/PlayingCard/PlayingCard.jsx
import React from 'react'
import { Image, Dimensions, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import { styles } from './styles'

const { width: screenWidth } = Dimensions.get('window')

export function PlayingCard({ 
  card, 
  index, 
  originalIndex, 
  isTopCard, 
  isSwipable = true,
  totalCards,
  panGesture,
  translateX,
  translateY,
  rotateZ,
  scale
}) {
  const animatedStyle = useAnimatedStyle(() => {
    if (isSwipable) {
      // Mode pile classique (1 carte) : effet d'empilement vertical + animations
      const stackY = (totalCards - 1 - index) * -6
      const opacity = Math.max(0, 1 - Math.abs(translateX.value) / (screenWidth * 0.8))
      
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value + stackY },
          { rotateZ: `${rotateZ.value}deg` },
          { scale: scale.value },
        ],
        opacity: opacity,
        zIndex: totalCards - index, // zIndex relatif dans la pile
      }
    } else {
      // Mode groupe (2+ cartes) : affichage en éventail centré + décalé à droite
      // Calcul pour centrer l'éventail selon le nombre total de cartes
      const centerOffset = ((totalCards - 1) * 18) / 2 // Centre de l'éventail
      const rightShift = 14 // Décalage de ~5% vers la droite (280px * 0.05 = 14px)
      
      // Rotations fixes selon la position (pas selon totalCards)
      const standardRotations = {
        0: '6deg',    // Carte du dessus : toujours +6°
        1: '-2deg',   // Carte 1 : toujours -4°
        2: '-8deg'    // Carte 2 : toujours -8°
      }
      
      if (index === 0) {
        // Première carte (dessus) : rotation fixe
        return {
          position: 'absolute',
          transform: [
            { translateX: centerOffset - 10 + rightShift }, // Décalé vers la droite
            { translateY: -5 }, 
            { rotate: standardRotations[0] },
          ],
          transformOrigin: 'bottom center',
          zIndex: 5,
        }
      } else {
        // Cartes suivantes : rotations fixes selon l'index
        const leftOffset = centerOffset - (index * 20)
        const upOffset = index * 18
        const rotation = standardRotations[index] || '-12deg' // Rotation fixe par position
        
        return {
          position: 'absolute',
          transform: [
            { translateX: leftOffset + rightShift }, // Décalé vers la droite
            { translateY: -upOffset },
            { rotate: rotation },
          ],
          transformOrigin: 'bottom center',
          zIndex: 5 - index,
        }
      }
    }
  })

  return (
    <View style={styles.cardWrapper}>
      {isSwipable && panGesture ? (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.animatedCard, animatedStyle]}>
            <Image source={card.asset} style={styles.cardImage} resizeMode="contain" />
          </Animated.View>
        </GestureDetector>
      ) : (
        <Animated.View style={[styles.animatedCard, animatedStyle]}>
          <Image source={card.asset} style={styles.cardImage} resizeMode="contain" />
        </Animated.View>
      )}
    </View>
  )
}