// screens/common/DecompteScreen/DecompteScreen.jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import * as Haptics from 'expo-haptics'
import { theme } from '../../../theme'
import * as S from './styles'

export default function DecompteScreen({ route, navigation }) {
  // 🎯 Récupération de tous les paramètres incluant la discipline
  const { 
    objectif, 
    temps, 
    variant, 
    digitCount, 
    cardsCount, 
    autoAdvance,
    mode,
    discipline // 🎯 Nouveau paramètre pour déterminer la discipline
  } = route.params

  const [counter, setCounter] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (counter <= 0) {
      // 🎯 Navigation conditionnelle selon la discipline
      if (discipline === 'cards') {
        // 🃏 Navigation vers 'CardsGame' pour lancer le jeu de cartes
        navigation.replace('CardsGame', { 
          objectif, 
          temps, 
          variant, 
          cardsCount, 
          autoAdvance,
          mode,
          discipline
        })
      } else {
        // Par défaut, navigation vers MemoScreen pour les numbers
        navigation.replace('Memorisation', { 
          objectif, 
          temps, 
          variant, 
          digitCount, 
          autoAdvance 
        })
      }
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
  }, [counter, navigation, objectif, temps, variant, digitCount, cardsCount, autoAdvance, mode, discipline])

  // 🎯 Affichage conditionnel des détails selon la discipline
  const getObjectifLabel = () => {
    return discipline === 'cards' ? 'Cartes' : 'Objectif'
  }

  const getObjectifValue = () => {
    if (discipline === 'cards') {
      return `${objectif} cartes (${cardsCount} simultanées)`
    }
    return objectif
  }

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
              <S.DetailLabel>{getObjectifLabel()}</S.DetailLabel>
              <S.DetailValue>{getObjectifValue()}</S.DetailValue>
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