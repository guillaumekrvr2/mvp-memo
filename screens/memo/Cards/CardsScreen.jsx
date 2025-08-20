// screens/memo/Cards/CardsScreen.jsx - VERSION AVEC GROUPES/PAQUETS
import React, { useState, useMemo, useCallback } from 'react'
import { SafeAreaView, View } from 'react-native'
import MemorizationHeader from '../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { CardsStack } from '../../../components/molecules/Cards/CardsStack/CardsStack'
import { CardsThumbnailRow } from '../../../components/molecules/Cards/CardsThumbnailRow/CardsThumbnailRow'
import { ChevronButton } from '../../../components/atoms/Cards/ChevronButton/ChevronButton'
import { useCardDeck } from '../../../hooks/Cards/useCardDeck'
import useAutoAdvance from '../../../hooks/useAutoAdvance'
import { styles } from './styles'

export default function CardsScreen({ route, navigation }) {
  // 🃏 Récupération des paramètres depuis la navigation avec valeurs par défaut
  const { 
    objectif = 52, 
    temps = 120, 
    cardsCount = 1, // 🃏 IMPORTANT : par défaut 1 carte
    mode,
    variant,
    autoAdvance,
    discipline 
  } = route.params || {}
  
  // État local pour l'index du groupe actuel
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  
  const {
    deck,
    totalCards,
    isComplete
  } = useCardDeck(objectif, 1) // 🃏 Le hook génère le deck complet

  // 🃏 Création des groupes de cartes selon cardsCount
  const cardGroups = useMemo(() => {
    const groups = []
    for (let i = 0; i < deck.length; i += cardsCount) {
      groups.push(deck.slice(i, i + cardsCount))
    }
    return groups
  }, [deck, cardsCount])

  // Groupes à afficher : groupe actuel + quelques suivants pour l'effet de pile
  const getGroupsToDisplay = () => {
    const maxGroupsToShow = cardsCount === 1 ? 5 : 3
    const groupsToDisplay = []
    
    for (let i = currentGroupIndex; i < Math.min(currentGroupIndex + maxGroupsToShow, cardGroups.length); i++) {
      if (cardGroups[i]) {
        groupsToDisplay.push(cardGroups[i])
      }
    }
    
    return groupsToDisplay
  }

  const groupsToDisplay = getGroupsToDisplay()
  const currentGroup = cardGroups[currentGroupIndex] || []
  const totalGroups = cardGroups.length
  const isLastGroup = currentGroupIndex >= totalGroups - 1

  // 🎯 Auto-advance : avance automatiquement entre les groupes de cartes
  useAutoAdvance(autoAdvance, temps, totalGroups, setCurrentGroupIndex)

  // 🃏 Navigation vers CardsRecall
  const navigateToRecall = useCallback(() => {
    
    try {
      navigation.navigate('CardsRecall', {
        objectif,
        temps,
        mode,
        variant,
        discipline,
        memorizedCards: deck
      })
      console.log('✅ Navigation successful!')
    } catch (error) {
      console.error('❌ Navigation failed:', error)
      console.error('Error details:', error.message)
    }
  }, [navigation, objectif, temps, mode, variant, discipline, deck])

  // 🃏 Gestion du swipe de groupe - tout le groupe part d'un coup
  const handleGroupSwipe = () => {
  
    
    if (isLastGroup) {
      // Dernier groupe → navigation vers CardsRecall
      setTimeout(() => {
        navigateToRecall()
      }, 1000)
    } else {
      // Passer au groupe suivant
      setCurrentGroupIndex(prev => prev + 1)
    }
  }

  // 🃏 Gestion du bouton Done - toujours aller au recall
  const handleDone = useCallback(() => {
    navigateToRecall()
  }, [navigateToRecall])

  // 🎯 Navigation entre les groupes avec les chevrons
  const handlePreviousGroup = useCallback(() => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1)
    }
  }, [currentGroupIndex])

  const handleNextGroup = useCallback(() => {
    if (currentGroupIndex < totalGroups - 1) {
      setCurrentGroupIndex(prev => prev + 1)
    }
  }, [currentGroupIndex, totalGroups])

  return (
    <SafeAreaView style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={handleDone} // 🃏 Utilise la nouvelle fonction handleDone
        duration={temps} // 🃏 Utilise le temps des paramètres
      />

      {/* Container pour les cartes avec chevrons */}
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Chevron gauche */}
        <ChevronButton
          direction="left"
          onPress={handlePreviousGroup}
          disabled={currentGroupIndex === 0}
          style={{ 
            position: 'absolute',
            left: 20,
            top: '45%',
            zIndex: 1000,
            elevation: 1000,
            transform: [{ translateY: -20 }]
          }}
        />

        {/* Chevron droit */}
        <ChevronButton
          direction="right"
          onPress={handleNextGroup}
          disabled={currentGroupIndex >= totalGroups - 1}
          style={{ 
            position: 'absolute',
            right: 20,
            top: '45%',
            zIndex: 1000,
            elevation: 1000,
            transform: [{ translateY: -20 }]
          }}
        />

        <CardsStack
          groupsToDisplay={groupsToDisplay} // 🃏 Passe les groupes structurés
          deck={deck}
          onCardSwipe={handleGroupSwipe} // 🃏 Swipe de tout le groupe
          cardsCount={cardsCount} // 🃏 Pour l'affichage en superposition
          currentGroupSize={currentGroup.length} // 🃏 Taille du groupe actuel pour le swipe
        />
      </View>

      <CardsThumbnailRow
        deck={deck} // 🃏 Toutes les cartes du deck
        currentGroupIndex={currentGroupIndex} // 🃏 Progrès par groupes
        groupSize={cardsCount}
      />
    </SafeAreaView>
  )
}