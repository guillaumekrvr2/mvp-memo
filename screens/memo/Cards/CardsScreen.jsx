// screens/memo/Cards/CardsScreen.jsx - VERSION SÛRE POUR DEBUG
import React, { useState, useCallback } from 'react'
import { SafeAreaView, Dimensions, FlatList, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import MemorizationHeader from '../../../components/molecules/MemorizationHeader/MemorizationHeader'

const { width: screenWidth } = Dimensions.get('window')

// Mapping des assets de cartes complet
const cardAssets = {
  '2_of_clubs': require('../../../assets/cards/2_of_clubs.png'),
  '2_of_diamonds': require('../../../assets/cards/2_of_diamonds.png'),
  '2_of_hearts': require('../../../assets/cards/2_of_hearts.png'),
  '2_of_spades': require('../../../assets/cards/2_of_spades.png'),
  '3_of_clubs': require('../../../assets/cards/3_of_clubs.png'),
  '3_of_diamonds': require('../../../assets/cards/3_of_diamonds.png'),
  '3_of_hearts': require('../../../assets/cards/3_of_hearts.png'),
  '3_of_spades': require('../../../assets/cards/3_of_spades.png'),
}

// Génération d'un paquet de cartes (plus grand pour tester)
const generateDeck = () => {
  const suits = ['clubs', 'diamonds', 'hearts', 'spades']
  const ranks = ['2', '3']
  
  return suits.flatMap(suit => 
    ranks.map(rank => ({
      id: `${rank}_of_${suit}`,
      suit,
      rank,
      asset: cardAssets[`${rank}_of_${suit}`]
    }))
  )
}

// Composant Card avec animations améliorées
const Card = ({ card, index, originalIndex, isTopCard, onSwipe, totalCards }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotateZ = useSharedValue(-10 + Math.random() * 20) // ← Rotation aléatoire initiale
  const scale = useSharedValue(1)
  
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      if (isTopCard) {
        scale.value = withSpring(1.1) // ← Animation au touch
      }
    })
    .onUpdate((event) => {
      if (isTopCard) {
        translateX.value = event.translationX
        translateY.value = event.translationY * 0.5 // ← Mouvement Y réduit
        rotateZ.value = -10 + (event.translationX / 10) // ← Rotation basée sur le swipe
      }
    })
    .onEnd((event) => {
      console.log('🎮 Card gesture end:', { originalIndex, translationX: event.translationX, velocityX: event.velocityX })
      
      const threshold = screenWidth * 0.3
      const isSwipeOut = Math.abs(event.translationX) > threshold || Math.abs(event.velocityX) > 500
      
      if (isTopCard && isSwipeOut) {
        console.log('✅ Valid swipe detected for card:', originalIndex)
        const direction = event.translationX > 0 ? 1 : -1
        
        // Animation de sortie avec physics
        translateX.value = withTiming(direction * screenWidth * 1.5, { duration: 400 })
        translateY.value = withTiming(translateY.value + direction * 150, { duration: 400 })
        rotateZ.value = withTiming(direction * 25, { duration: 400 })
        scale.value = withTiming(0.8, { duration: 400 })
        
        // Appel immédiat de onSwipe
        runOnJS(onSwipe)(originalIndex)
      } else {
        // Retour à la position initiale avec spring
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 })
        translateY.value = withSpring(0, { damping: 15, stiffness: 150 })
        rotateZ.value = withSpring(-10 + Math.random() * 20, { damping: 15 })
        scale.value = withSpring(1, { damping: 15, stiffness: 150 })
      }
    })

  const animatedStyle = useAnimatedStyle(() => {
    // Position dans la stack (sans changement de taille)
    const stackY = (totalCards - 1 - index) * -6
    const stackScale = 1 // ← TOUTES LES CARTES À LA MÊME TAILLE
    
    // Opacité basée sur la distance de swipe
    const opacity = Math.max(0, 1 - Math.abs(translateX.value) / (screenWidth * 0.8))
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + stackY },
        { rotateZ: `${rotateZ.value}deg` },
        { scale: scale.value * stackScale }, // ← Plus de réduction de taille
      ],
      opacity: opacity,
      zIndex: totalCards - index,
    }
  })

  return (
    <View style={styles.cardWrapper}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.animatedCard, animatedStyle]}>
          <Image source={card.asset} style={styles.cardImage} resizeMode="contain" />
          {isTopCard && (
            <View style={styles.topCardIndicator}>
              <Text style={styles.topCardText}>#{originalIndex}</Text>
            </View>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

export default function CardsScreen({ navigation }) {
  const [deck, setDeck] = useState(generateDeck())
  const [removedCards, setRemovedCards] = useState(new Set())
  
  const totalTime = 2 * 60

  const handleCardSwipe = useCallback((originalIndex) => {
    console.log('🔥 handleCardSwipe called with:', originalIndex)
    console.log('📊 Current state - deck length:', deck.length, 'removed:', Array.from(removedCards))
    
    if (removedCards.has(originalIndex)) {
      console.log('⚠️ Card already removed, skipping')
      return
    }
    
    setRemovedCards(prev => {
      const newSet = new Set([...prev, originalIndex])
      console.log('🔄 New removed set:', Array.from(newSet))
      
      // Si toutes les cartes sont supprimées, reset après délai
      if (newSet.size >= deck.length) {
        console.log('🎯 All cards swiped! Resetting in 1.5s...')
        setTimeout(() => {
          setRemovedCards(new Set())
          setDeck(generateDeck())
        }, 1500)
      }
      
      return newSet
    })
  }, [deck.length, removedCards])

  const visibleCards = deck.filter((_, index) => !removedCards.has(index))
  
  console.log('🎯 Render - visible:', visibleCards.length, 'total:', deck.length, 'removed:', Array.from(removedCards))

  return (
    <SafeAreaView style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={() => navigation.goBack()}
        duration={totalTime}
      />

      <Animated.View style={styles.deckArea}>
        <Animated.View style={styles.cardsStack}>
          {visibleCards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              originalIndex={deck.findIndex(c => c.id === card.id)}
              isTopCard={index === 0}
              onSwipe={handleCardSwipe}
              totalCards={visibleCards.length}
            />
          ))}
        </Animated.View>
      </Animated.View>

      {/* MINIATURES */}
      <FlatList
        style={styles.cardsRow}
        contentContainerStyle={styles.cardsRowContent}
        data={deck}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={[
              styles.cardThumbnail,
              !removedCards.has(index) && styles.cardThumbnailActive
            ]}
            onPress={() => {
              // Fonction pour "ressusciter" une carte
              if (removedCards.has(index)) {
                setRemovedCards(prev => {
                  const newSet = new Set(prev)
                  newSet.delete(index)
                  return newSet
                })
              }
            }}
          >
            <Animated.Image 
              source={item.asset}
              style={[
                styles.cardThumbnailImage,
                { opacity: removedCards.has(index) ? 0.3 : 1 }
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  deckArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 140,
  },
  cardsStack: {
    position: 'relative',
    width: 280,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    width: 280,
    height: 380,
  },
  animatedCard: {
    position: 'absolute',
    width: 280,
    height: 380,
    borderRadius: 16,
    backgroundColor: 'transparent', // ← Fond transparent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  topCardIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topCardText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardsRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#1e1e2e',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  cardsRowContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
    alignItems: 'center',
    height: '100%',
  },
  cardThumbnail: {
    width: 50,
    height: 70,
    marginHorizontal: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
  },
  cardThumbnailActive: {
    borderWidth: 2,
    borderColor: '#4ecdc4',
    transform: [{ scale: 1.05 }],
  },
  cardThumbnailImage: {
    width: '100%',
    height: '100%',
  },
})