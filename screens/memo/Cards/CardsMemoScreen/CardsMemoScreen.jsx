// screens/memo/Cards/CardsScreen.jsx - VERSION AVEC GROUPES/PAQUETS
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { SafeAreaView, View, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { CardsStack } from '../../../../components/molecules/Cards/CardsStack/CardsStack'
import { CardsThumbnailRow } from '../../../../components/molecules/Cards/CardsThumbnailRow/CardsThumbnailRow'
import { SmallChevronButton } from '../../../../components/atoms/Commons/SmallChevronButton/SmallChevronButton'
import { useCardDeck } from '../../../../hooks/Cards/useCardDeck'
import useAutoAdvance from '../../../../hooks/useAutoAdvance'
import { usePracticeTracking } from '../../../../hooks/Analytics'
import { styles } from './styles'

export default function CardsScreen({ route, navigation }) {
  const { trackPracticeStarted } = usePracticeTracking();
  // 🃏 Récupération des paramètres depuis la navigation avec valeurs par défaut
  const { 
    objectif = 52, 
    temps = 120, 
    cardsCount = 1, // 🃏 IMPORTANT : par défaut 1 carte
    mode,
    variant,
    autoAdvance,
    discipline,
    cardFilters // 🎯 Nouveaux filtres de cartes
  } = route.params || {}
  
  // État local pour l'index du groupe actuel
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)

  // Ref pour nettoyer le setTimeout
  const swipeTimeoutRef = useRef(null)

  // 🆕 Ref pour suivre si le composant est monté
  const isMountedRef = useRef(true)

  // Container conditionnel comme NumbersMemoScreen
  const Container = Platform.OS === 'ios' ? View : SafeAreaView;

  const {
    deck,
    totalCards,
    isComplete
  } = useCardDeck(objectif, 1, cardFilters) // 🃏 Le hook génère le deck complet avec filtres

  // 🆕 Ref pour garder deck à jour sans recréer navigateToRecall
  const deckRef = useRef(deck)
  useEffect(() => {
    deckRef.current = deck
  }, [deck])

  // Track practice started
  useEffect(() => {
    trackPracticeStarted('cards', variant || mode || 'custom', {
      cardCount: objectif,
      memorizeTime: temps,
      cardsPerGroup: cardsCount,
      autoAdvance,
    });
  }, []);

  // 🃏 Preload fait maintenant dans DecompteScreen pendant les 3 secondes

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
    // 🆕 Triple vérification : composant monté + écran en focus + navigation possible
    if (!isMountedRef.current || !navigation.isFocused()) {
      return
    }

    try {
      navigation.navigate('CardsRecall', {
        objectif,
        temps,
        mode,
        variant,
        discipline,
        memorizedCards: deckRef.current // ✅ Utilise la ref au lieu de deck
      })
    } catch (error) {
      console.error('❌ Navigation failed:', error)
      console.error('Error details:', error.message)
    }
  }, [navigation, objectif, temps, mode, variant, discipline]) // ✅ Retiré deck des dépendances

  // 🃏 Gestion du swipe de groupe - tout le groupe part d'un coup
  const handleGroupSwipe = () => {
    
    if (isLastGroup) {
      // Dernier groupe → navigation vers CardsRecall avec timeout nettoyable
      swipeTimeoutRef.current = setTimeout(() => {
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

  // 🎯 Long press sur chevron gauche → retour au début
  const handleResetToBeginning = useCallback(() => {
    setCurrentGroupIndex(0)
  }, [])

  // 🆕 Suivre l'état monté du composant et nettoyer au démontage
  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      // Nettoyer le timeout
      if (swipeTimeoutRef.current) {
        clearTimeout(swipeTimeoutRef.current)
        swipeTimeoutRef.current = null
      }
    }
  }, [])

  // 🛡️ Protection ultime : détecter quand l'écran perd le focus
  useFocusEffect(
    useCallback(() => {
      // Écran devient visible/actif
      isMountedRef.current = true

      return () => {
        // Écran perd le focus → TOUT annuler immédiatement
        isMountedRef.current = false
        if (swipeTimeoutRef.current) {
          clearTimeout(swipeTimeoutRef.current)
          swipeTimeoutRef.current = null
        }
      }
    }, [])
  )

  return (
    <Container style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.popToTop()}
        onDone={handleDone} // 🃏 Utilise la nouvelle fonction handleDone
        duration={temps} // 🃏 Utilise le temps des paramètres
      />

      {/* Container pour les cartes avec chevrons */}
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Chevron gauche */}
        <SmallChevronButton
          direction="left"
          onPress={handlePreviousGroup}
          onLongPress={handleResetToBeginning} // Long press → retour au début
          disabled={currentGroupIndex === 0}
          style={{
            left: 20,
            top: '45%',
            zIndex: 1000,
            elevation: 1000
          }}
        />

        {/* Chevron droit */}
        <SmallChevronButton
          direction="right"
          onPress={handleNextGroup}
          disabled={currentGroupIndex >= totalGroups - 1}
          style={{
            right: 20,
            top: '45%',
            zIndex: 1000,
            elevation: 1000
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
    </Container>
  )
}