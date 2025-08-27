// screens/common/DecompteScreen/DecompteScreen.jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native'
import * as Haptics from 'expo-haptics'
import { theme } from '../../../theme'
import * as S from './styles'
import { useCardDeck } from '../../../hooks/Cards/useCardDeck'
import { useFirstCards } from '../../../hooks/Cards/useFirstCards'

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
    discipline, // 🎯 Nouveau paramètre pour déterminer la discipline
    fromValue,
    toValue,
    useSpecificRange,
    cardFilters = null // 🎯 Filtres pour les cartes (avec valeur par défaut)
  } = route.params

  const [counter, setCounter] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)

  // 🃏 Hook léger pour preload rapide des 6 premières cartes seulement
  const shouldPreloadCards = discipline === 'cards'
  const firstCards = shouldPreloadCards ? useFirstCards(6) : []

  // 🃏 Preload RAPIDE des 6 premières cartes dès qu'elles sont prêtes
  useEffect(() => {
    if (shouldPreloadCards && firstCards.length > 0) {
      console.log('🚀 Démarrage preload des 6 premières cartes')
      
      firstCards.forEach((card, index) => {
        // Preload immédiat sans délai
        setTimeout(() => {
          try {
            const resolvedAsset = Image.resolveAssetSource(card.asset)
            if (resolvedAsset && resolvedAsset.uri) {
              Image.prefetch(resolvedAsset.uri)
              console.log(`✅ Carte ${index + 1}/6 preloadée`)
            }
          } catch (error) {
            console.log(`❌ Erreur preload carte ${index + 1}:`, error)
          }
        }, index * 50) // 50ms entre chaque = 300ms total pour 6 cartes
      })
    }
  }, [shouldPreloadCards, firstCards])

  // 🚀 Fonction pour passer directement au prochain écran
  const handleSkipCountdown = () => {
    if (discipline === 'cards') {
      navigation.replace('CardsGame', { 
        objectif, 
        temps, 
        variant, 
        cardsCount, 
        autoAdvance,
        mode,
        discipline,
        cardFilters // 🎯 Transmet les filtres de cartes
      })
    } else if (discipline === 'binaries') {
      navigation.replace('BinaryMemo', { 
        objectif, 
        temps, 
        variant, 
        digitCount, 
        autoAdvance 
      })
    } else {
      navigation.replace('Memorisation', { 
        objectif, 
        temps, 
        variant, 
        digitCount, 
        autoAdvance,
        fromValue,
        toValue,
        useSpecificRange
      })
    }
  }

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
          discipline,
          cardFilters // 🎯 Transmet les filtres de cartes
        })
      } else if (discipline === 'binaries') {
        // 🔢 Navigation vers 'BinaryMemo' pour les binaires
        navigation.replace('BinaryMemo', { 
          objectif, 
          temps, 
          variant, 
          digitCount, 
          autoAdvance 
        })
      } else {
        // Par défaut, navigation vers MemoScreen pour les numbers
        navigation.replace('Memorisation', { 
          objectif, 
          temps, 
          variant, 
          digitCount, 
          autoAdvance,
          fromValue,
          toValue,
          useSpecificRange
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
    if (discipline === 'cards') return 'Cartes'
    if (discipline === 'binaries') return 'Objectif (bits)'
    return 'Objectif'
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

        {/* Bouton Skip Countdown */}
        <S.SkipButton onPress={handleSkipCountdown}>
          <S.SkipButtonText>Skip countdown ›</S.SkipButtonText>
        </S.SkipButton>
      </S.Container>
    </SafeAreaView>
  )
}