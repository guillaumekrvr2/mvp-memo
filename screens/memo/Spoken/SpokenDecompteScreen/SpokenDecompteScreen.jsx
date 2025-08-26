// screens/memo/Spoken/SpokenDecompteScreen/SpokenDecompteScreen.jsx
import React from 'react'
import { SafeAreaView } from 'react-native'
import * as Haptics from 'expo-haptics'
import { theme } from '../../../../theme'
import * as S from '../../../common/DecompteScreen/styles'
import { useSequenceCountdown, useCountdownDisplay } from '../../../../hooks/Commons'

export default function SpokenDecompteScreen({ route, navigation }) {
  const { 
    objectif, 
    temps, 
    variant, 
    autoAdvance,
    mode,
    discipline = 'spokens'
  } = route.params

  // Configuration des séquences pour spokens
  const sequences = [
    ['A', 'B', 'C'],  // Phase 1: lettres
    ['3', '2', '1']   // Phase 2: chiffres
  ]
  
  // Configuration des vibrations pour chaque phase
  const hapticConfig = {
    0: Haptics.ImpactFeedbackStyle.Light,  // Lettres: vibration douce
    1: Haptics.ImpactFeedbackStyle.Heavy   // Chiffres: vibration forte
  }

  // Fonction appelée à la fin du décompte
  const handleCountdownComplete = () => {
    navigation.replace('SpokenMemo', { 
      objectif, 
      temps, 
      variant, 
      autoAdvance,
      mode,
      discipline
    })
  }

  // Fonction pour passer directement au prochain écran
  const handleSkipCountdown = () => {
    navigation.replace('SpokenMemo', { 
      objectif, 
      temps, 
      variant, 
      autoAdvance,
      mode,
      discipline
    })
  }

  // Utilisation du hook de décompte séquentiel
  const { currentItem, currentPhaseIndex, isAnimating } = useSequenceCountdown(
    sequences,
    handleCountdownComplete,
    hapticConfig
  )

  // Utilisation du hook d'affichage conditionnel
  const { objectifLabel, objectifValue, displayValue, instructionText, additionalDetails } = useCountdownDisplay(
    discipline,
    { objectif, temps },
    currentItem,
    currentPhaseIndex,
    null // counter non utilisé pour spokens
  )


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <S.Container>
        <S.CountdownWrapper>
          <S.CountdownCircle>
            <S.CounterText isAnimating={isAnimating} isReady={displayValue === 'Prêt'}>
              {displayValue}
            </S.CounterText>
          </S.CountdownCircle>
          
          <S.ReadyText>
            {instructionText}
          </S.ReadyText>
          
          <S.DetailsContainer>
            <S.DetailItem>
              <S.DetailLabel>{objectifLabel}</S.DetailLabel>
              <S.DetailValue>{objectifValue}</S.DetailValue>
            </S.DetailItem>
            
            {additionalDetails.map((detail, index) => (
              <S.DetailItem key={index}>
                <S.DetailLabel>{detail.label}</S.DetailLabel>
                <S.DetailValue>{detail.value}</S.DetailValue>
              </S.DetailItem>
            ))}
          </S.DetailsContainer>
        </S.CountdownWrapper>

        {/* Bouton Skip Countdown */}
        <S.SkipButton onPress={handleSkipCountdown}>
          <S.SkipButtonText>Skip countdown ›</S.SkipButtonText>
        </S.SkipButton>
      </S.Container>
    </SafeAreaView>
  )
}