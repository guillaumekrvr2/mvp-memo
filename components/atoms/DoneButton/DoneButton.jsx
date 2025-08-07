// components/atoms/DoneButton/DoneButton.jsx
import React from 'react'
import * as Haptics from 'expo-haptics'
import * as S from './styles'

export default function DoneButton({ onPress, variant = 'primary', label = 'Done' }) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress()
  }

  return (
    <S.Container onPress={handlePress} activeOpacity={0.8} variant={variant}>
      <S.Label variant={variant}>{label}</S.Label>
    </S.Container>
  )
}