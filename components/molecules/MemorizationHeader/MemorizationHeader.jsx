// components/molecules/MemorizationHeader/MemorizationHeader.jsx
import React from 'react'
import { View } from 'react-native'
import BackButton from '../../atoms/BackButton/BackButton'
import DoneButton from '../../atoms/DoneButton/DoneButton'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import useProgressWithCallback from '../../../hooks/useProgressWithCallback'
import * as S from './styles'

export default function MemorizationHeader({ 
  onBack, 
  onDone, 
  duration
}) {
  const progress = useProgressWithCallback(duration, onDone)

  return (
    <S.Header>
      <BackButton onPress={onBack} variant="minimal" />
      <ProgressBar progress={progress} />
      <DoneButton onPress={onDone} variant="primary" label="Done" />
    </S.Header>
  )
}