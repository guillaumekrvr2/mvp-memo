// 📁 components/atoms/CardThumbnail/CardThumbnail.jsx
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { styles } from './styles'

export function CardThumbnail({ 
  item, 
  index, 
  isRemoved, 
  onPress 
}) {
  return (
    <TouchableOpacity 
      style={[
        styles.cardThumbnail,
        !isRemoved && styles.cardThumbnailActive
      ]}
      onPress={() => onPress(index)}
    >
      <Animated.Image 
        source={item.asset}
        style={[
          styles.cardThumbnailImage,
          { opacity: isRemoved ? 0.3 : 1 }
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}