// components/atoms/ProgressBar/ProgressBar.jsx
import React from 'react'
import * as S from './styles'

/**
 * @param {Animated.Value} progress  Valeur animée [0→1] gérée à l'extérieur
 */
export default function ProgressBar({ progress }) {
  return (
    <S.Container>
      <S.Bar
        style={{
          width: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </S.Container>
  )
}