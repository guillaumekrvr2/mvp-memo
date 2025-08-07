// screens/common/DecompteScreen.jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import * as Haptics from 'expo-haptics'
import { theme } from '../../../theme'
import * as S from './styles'

export default function DecompteScreen({ route, navigation }) {
  const { objectif, temps, variant, digitCount, autoAdvance } = route.params
  const [counter, setCounter] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (counter <= 0) {
      // Une fois à zéro, on navigue vers l'écran de mémorisation
      navigation.replace('Memorisation', { objectif, temps, variant, digitCount, autoAdvance })
      return
    }

    const id = setTimeout(async () => {
      // Déclenchement d'une vibration à chaque décompte
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      
      // Animation pour le changement de chiffre
      setIsAnimating(true)
      setTimeout(() => {
        setCounter(counter - 1)
        setIsAnimating(false)
      }, 100)
    }, 1000)

    return () => clearTimeout(id)
  }, [counter])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <S.Container>
        <S.CountdownWrapper>
          <S.CountdownCircle>
            <S.CounterText isAnimating={isAnimating}>
              {counter}
            </S.CounterText>
          </S.CountdownCircle>
          
          <S.ReadyText>
            Préparez-vous...
          </S.ReadyText>
          
          <S.DetailsContainer>
            <S.DetailItem>
              <S.DetailLabel>Objectif</S.DetailLabel>
              <S.DetailValue>{objectif}</S.DetailValue>
            </S.DetailItem>
            
            <S.DetailItem>
              <S.DetailLabel>Temps</S.DetailLabel>
              <S.DetailValue>{temps} secondes</S.DetailValue>
            </S.DetailItem>
          </S.DetailsContainer>
        </S.CountdownWrapper>
      </S.Container>
    </SafeAreaView>
  )
}