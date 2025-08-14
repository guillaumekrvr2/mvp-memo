import React from 'react'
import { View, Image } from 'react-native'
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
          borderWidth: isHovered ? 4 : 2,
          borderColor: isHovered ? '#ff4444' : '#4caf50',
          transform: [
            { translateY: -(waveEffect + separationEffect) },
            { scale: isHovered ? 1.15 : 1 },
            { rotateZ: isHovered ? '2deg' : '0deg' }
          ],
          shadowOffset: { width: 3, height: isHovered ? 12 : 4 },
          shadowOpacity: isHovered ? 0.6 : 0.3,
          shadowRadius: isHovered ? 12 : 4
        }
      ]}>
        <Image 
          source={card.asset} 
          style={styles.cardImage} 
          resizeMode="contain" 
        />
      </Animated.View>
    </View>
  )
}