import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { Animated } from 'react-native'
import { styles } from './styles'

export function CoverFlowCard({ 
  card, 
  index, 
  spacing, 
  isHovered, 
  waveEffect, 
  separationEffect,
  cardWidth = 90,
  cardHeight = 135
}) {
  return (
    <View
      style={[
        styles.container,
        {
          left: index * spacing,
          width: cardWidth,
          height: cardHeight,
          zIndex: isHovered ? 100 : index,
          elevation: isHovered ? 100 : index
        }
      ]}
    >
      <Animated.View style={[
        styles.animatedContainer,
        {
          width: cardWidth,
          height: cardHeight,
          transform: [
            { translateY: -(waveEffect + separationEffect) },
            { scale: isHovered ? 1.15 : 1 },
            { rotateZ: isHovered ? '2deg' : '0deg' }
          ]
        }
      ]}>
        <Image
          source={card.asset}
          style={styles.cardImage}
          contentFit="contain"
          priority="high"
          cachePolicy="memory-disk"
          transition={{ duration: 0 }}
        />
      </Animated.View>
    </View>
  )
}