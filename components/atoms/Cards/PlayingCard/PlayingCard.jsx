
// 📁 components/atoms/PlayingCard/PlayingCard.jsx
import React from 'react'
import { Image, Dimensions, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import { TopCardIndicator } from './TopCardIndicator'
import { styles } from './styles'

const { width: screenWidth } = Dimensions.get('window')

export function PlayingCard({ 
  card, 
  index, 
  originalIndex, 
  isTopCard, 
  totalCards,
  panGesture,
  translateX,
  translateY,
  rotateZ,
  scale
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const stackY = (totalCards - 1 - index) * -6
    const stackScale = 1
    const opacity = Math.max(0, 1 - Math.abs(translateX.value) / (screenWidth * 0.8))
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + stackY },
        { rotateZ: `${rotateZ.value}deg` },
        { scale: scale.value * stackScale },
      ],
      opacity: opacity,
      zIndex: totalCards - index,
    }
  })

  return (
    <View style={styles.cardWrapper}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.animatedCard, animatedStyle]}>
          <Image source={card.asset} style={styles.cardImage} resizeMode="contain" />
          {isTopCard && (
            <TopCardIndicator originalIndex={originalIndex} />
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}