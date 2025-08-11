// 📁 components/molecules/CardsStack/CardsStack.jsx
import Animated from 'react-native-reanimated'
import { PlayingCard } from '../../../atoms/Cards/PlayingCard/PlayingCard'
import { useCardSwipeGesture } from '../../../../hooks/Cards/useCardSwipeGesture'
import { styles } from './styles'

export function CardsStack({ 
  visibleCards, 
  deck, 
  onCardSwipe 
}) {
  return (
    <Animated.View style={styles.deckArea}>
      <Animated.View style={styles.cardsStack}>
        {visibleCards.map((card, index) => {
          const originalIndex = deck.findIndex(c => c.id === card.id)
          const isTopCard = index === 0
          
          return (
            <PlayingCardWithGesture
              key={card.id}
              card={card}
              index={index}
              originalIndex={originalIndex}
              isTopCard={isTopCard}
              totalCards={visibleCards.length}
              onCardSwipe={onCardSwipe}
            />
          )
        })}
      </Animated.View>
    </Animated.View>
  )
}

// Composant séparé pour gérer les hooks
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
      totalCards={totalCards}
      panGesture={panGesture}
      translateX={translateX}
      translateY={translateY}
      rotateZ={rotateZ}
      scale={scale}
    />
  )
}