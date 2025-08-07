// components/atoms/BackButton/BackButton.jsx
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import * as S from './styles'

export default function BackButton({ onPress, variant = 'minimal' }) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }

  return (
    <S.Container onPress={handlePress} activeOpacity={0.7} variant={variant}>
      <S.IconWrapper variant={variant}>
        <Ionicons 
          name="chevron-back" 
          size={24} 
          color="#fff" 
        />
      </S.IconWrapper>
    </S.Container>
  )
}