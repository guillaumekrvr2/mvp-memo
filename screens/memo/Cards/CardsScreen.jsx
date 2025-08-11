// screens/memo/Cards/CardsScreen.jsx
import React, { useState } from 'react'
import { SafeAreaView, View, Image, Dimensions, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import MemorizationHeader from '../../../components/molecules/MemorizationHeader/MemorizationHeader'
import BorderedContainer from '../../../components/atoms/BorderedContainer/BorderedContainer'

const { width, height } = Dimensions.get('window')

// Mapping des assets de cartes (version réduite pour test)
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

// Génération d'un paquet de cartes
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

export default function CardsScreen({ navigation }) {
  const [deck] = useState(generateDeck())
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  
  const totalTime = 2 * 60
  const currentCard = deck[currentCardIndex]

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={() => navigation.goBack()}
        duration={totalTime}
      />

      {/* PAQUET DE CARTES PRINCIPAL - 60% de l'écran */}
      <View style={styles.deckArea}>
        <BorderedContainer>
          <View style={styles.deckContainer}>
            {currentCard && (
              <Image 
                source={currentCard.asset}
                style={styles.cardImage}
                resizeMode="contain"
              />
            )}
          </View>
        </BorderedContainer>
      </View>

      {/* RANGÉE DE TOUTES LES CARTES EN BAS */}
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
              index === currentCardIndex && styles.cardThumbnailActive
            ]}
            onPress={() => setCurrentCardIndex(index)}
          >
            <Image 
              source={item.asset}
              style={styles.cardThumbnailImage}
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
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  deckContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cardImage: {
    width: 200,
    height: 280,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardsRow: {
    flex: 0.4,
    backgroundColor: '#1e1e2e',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  cardsRowContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  cardThumbnail: {
    width: 60,
    height: 84,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardThumbnailActive: {
    borderWidth: 3,
    borderColor: '#4ecdc4',
    transform: [{ scale: 1.1 }],
    shadowColor: '#4ecdc4',
    shadowOpacity: 0.4,
    elevation: 6,
  },
  cardThumbnailImage: {
    width: '100%',
    height: '100%',
  },
})