// 📁 components/molecules/CardsStack/CardsStack.jsx
import Animated from 'react-native-reanimated'
import { PlayingCard } from '../../../atoms/Cards/PlayingCard/PlayingCard'
import { useCardSwipeGesture } from '../../../../hooks/Cards/useCardSwipeGesture'
import { styles } from './styles'

export function CardsStack({ 
  groupsToDisplay = [], // Tableau de groupes au lieu de cartes aplaties
  deck, 
  onCardSwipe,
  cardsCount = 1,
  currentGroupSize = 1
}) {
  // Aplatir tous les groupes en une seule liste pour le rendu
  const allCards = groupsToDisplay.flat()

  if (cardsCount === 1) {
    // Mode 1 carte : affichage en pile classique (chaque carte a son gesture)
    return (
      <Animated.View style={styles.deckArea}>
        <Animated.View style={styles.cardsStack}>
          {allCards.map((card, index) => {
            const originalIndex = deck.findIndex(c => c.id === card.id)
            const isTopCard = index === 0
            
            return (
              <PlayingCardWithGesture
                key={card.id}
                card={card}
                index={index}
                originalIndex={originalIndex}
                isTopCard={isTopCard}
                totalCards={allCards.length}
                onCardSwipe={onCardSwipe}
              />
            )
          })}
        </Animated.View>
      </Animated.View>
    )
  } else {
    // Mode 2+ cartes : affichage en groupe (un seul gesture pour le groupe)
    const currentGroupId = groupsToDisplay[0]?.[0]?.id || 'empty'

    return (
      <Animated.View style={styles.deckArea}>
        <Animated.View style={styles.cardsStack}>
          <CardsGroup
            key={currentGroupId} // 🚨 KEY pour reset les animations à chaque nouveau groupe
            groupsToDisplay={groupsToDisplay}
            deck={deck}
            cardsCount={cardsCount}
            currentGroupSize={currentGroupSize}
            onCardSwipe={onCardSwipe} // Passe la fonction de swipe au composant
          />
        </Animated.View>
      </Animated.View>
    )
  }
}

// Composant pour gérer les cartes individuelles (mode 1 carte)
function PlayingCardWithGesture({ 
  card, 
  index, 
  originalIndex, 
  isTopCard, 
  totalCards,
  onCardSwipe
}) {
  const { panGesture, translateX, translateY, rotateZ, scale } = useCardSwipeGesture({
    originalIndex,
    isTopCard,
    onSwipe: onCardSwipe
  })

  return (
    <PlayingCard
      card={card}
      index={index}
      originalIndex={originalIndex}
      isTopCard={isTopCard}
      isSwipable={true} // En mode 1 carte, les cartes sont swipables individuellement
      totalCards={totalCards}
      panGesture={panGesture}
      translateX={translateX}
      translateY={translateY}
      rotateZ={rotateZ}
      scale={scale}
    />
  )
}

// Composant pour afficher un groupe de cartes avec un seul gesture
function CardsGroup({ 
  groupsToDisplay,
  deck,
  cardsCount,
  currentGroupSize,
  onCardSwipe
}) {
  const { width: screenWidth } = require('react-native').Dimensions.get('window')
  const { useAnimatedStyle } = require('react-native-reanimated')
  const { GestureDetector } = require('react-native-gesture-handler')

  // 🚨 Hook déplacé ICI pour être recréé à chaque changement de key
  const { panGesture, translateX, translateY, rotateZ, scale } = useCardSwipeGesture({
    originalIndex: 0,
    isTopCard: true,
    onSwipe: onCardSwipe
  })

  // Style animé pour tout le groupe
  const groupAnimatedStyle = useAnimatedStyle(() => {
    const opacity = Math.max(0, 1 - Math.abs(translateX.value) / (screenWidth * 0.8))
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotateZ.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity,
    }
  })

  if (!groupsToDisplay.length) return null

  const currentGroup = groupsToDisplay[0] // Premier groupe = groupe actuel (éventail)
  const backgroundGroups = groupsToDisplay.slice(1) // Autres groupes = arrière-plan (piles)
  const backgroundCards = backgroundGroups.flat() // Aplatir les groupes d'arrière-plan

  // 🚨 DEBUG: Logs pour voir les groupes
  console.log('🔍 CardsGroup DEBUG:')
  console.log('  - groupsToDisplay.length:', groupsToDisplay.length)
  console.log('  - currentGroup.length:', currentGroup.length)
  console.log('  - backgroundGroups.length:', backgroundGroups.length)
  console.log('  - backgroundCards.length:', backgroundCards.length)
  console.log('  - currentGroup cards:', currentGroup.map(c => c.id))
  console.log('  - background cards:', backgroundCards.slice(0, 6).map(c => c.id), '...')

  return (
    <>
      {/* Cartes d'arrière-plan : pile statique sans gesture */}
      <Animated.View style={styles.backgroundStack}>
        {backgroundCards.map((card, index) => {
          const originalIndex = deck.findIndex(c => c.id === card.id)
          
          return (
            <PlayingCard
              key={card.id}
              card={card}
              index={index} // Position dans la pile arrière
              originalIndex={originalIndex}
              isTopCard={false}
              isSwipable={true} // Mode pile pour affichage
              totalCards={backgroundCards.length}
              panGesture={null}
              translateX={{ value: 0 }}
              translateY={{ value: 0 }}
              rotateZ={{ value: 0 }}
              scale={{ value: 1 }}
            />
          )
        })}
      </Animated.View>
      
      {/* Groupe actuel : éventail avec gesture */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.groupContainer, groupAnimatedStyle]}>
          {currentGroup.map((card, index) => {
            const originalIndex = deck.findIndex(c => c.id === card.id)
            
            return (
              <PlayingCard
                key={card.id}
                card={card}
                index={index} // Position dans l'éventail
                originalIndex={originalIndex}
                isTopCard={index === 0}
                isSwipable={false} // Pas de gesture individuel
                totalCards={currentGroup.length}
                panGesture={null}
                translateX={{ value: 0 }}
                translateY={{ value: 0 }}
                rotateZ={{ value: 0 }}
                scale={{ value: 1 }}
              />
            )
          })}
        </Animated.View>
      </GestureDetector>
    </>
  )
}