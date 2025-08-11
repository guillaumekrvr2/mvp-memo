// 📁 screens/memo/Cards/CardsScreen.jsx - VERSION REFACTORISÉE
import React from 'react'
import { SafeAreaView } from 'react-native'
import MemorizationHeader from '../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { CardsStack } from '../../../components/molecules/Cards/CardsStack/CardsStack'
import { CardsThumbnailRow } from '../../../components/molecules/Cards/CardsThumbnailRow/CardsThumbnailRow'
import { useCardDeck } from '../../../hooks/Cards/useCardDeck'
import { styles } from './styles'

export default function CardsScreen({ navigation }) {
  const totalTime = 2 * 60
  
  const {
    deck,
    removedCards,
    visibleCards,
    handleCardSwipe,
    handleCardRestore
  } = useCardDeck()

  return (
    <SafeAreaView style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={() => navigation.goBack()}
        duration={totalTime}
      />

      <CardsStack
        visibleCards={visibleCards}
        deck={deck}
        onCardSwipe={handleCardSwipe}
      />

      <CardsThumbnailRow
        deck={deck}
        removedCards={removedCards}
        onCardRestore={handleCardRestore}
      />
    </SafeAreaView>
  )
}