import { useState, useCallback } from 'react'

const cardAssets = {
  // 2
  '2_of_clubs': require('../../assets/cards/2_of_clubs.png'),
  '2_of_diamonds': require('../../assets/cards/2_of_diamonds.png'),
  '2_of_hearts': require('../../assets/cards/2_of_hearts.png'),
  '2_of_spades': require('../../assets/cards/2_of_spades.png'),

  // 3
  '3_of_clubs': require('../../assets/cards/3_of_clubs.png'),
  '3_of_diamonds': require('../../assets/cards/3_of_diamonds.png'),
  '3_of_hearts': require('../../assets/cards/3_of_hearts.png'),
  '3_of_spades': require('../../assets/cards/3_of_spades.png'),

  // 4
  '4_of_clubs': require('../../assets/cards/4_of_clubs.png'),
  '4_of_diamonds': require('../../assets/cards/4_of_diamonds.png'),
  '4_of_hearts': require('../../assets/cards/4_of_hearts.png'),
  '4_of_spades': require('../../assets/cards/4_of_spades.png'),

  // 5
  '5_of_clubs': require('../../assets/cards/5_of_clubs.png'),
  '5_of_diamonds': require('../../assets/cards/5_of_diamonds.png'),
  '5_of_hearts': require('../../assets/cards/5_of_hearts.png'),
  '5_of_spades': require('../../assets/cards/5_of_spades.png'),

  // 6
  '6_of_clubs': require('../../assets/cards/6_of_clubs.png'),
  '6_of_diamonds': require('../../assets/cards/6_of_diamonds.png'),
  '6_of_hearts': require('../../assets/cards/6_of_hearts.png'),
  '6_of_spades': require('../../assets/cards/6_of_spades.png'),

  // 7
  '7_of_clubs': require('../../assets/cards/7_of_clubs.png'),
  '7_of_diamonds': require('../../assets/cards/7_of_diamonds.png'),
  '7_of_hearts': require('../../assets/cards/7_of_hearts.png'),
  '7_of_spades': require('../../assets/cards/7_of_spades.png'),

  // 8
  '8_of_clubs': require('../../assets/cards/8_of_clubs.png'),
  '8_of_diamonds': require('../../assets/cards/8_of_diamonds.png'),
  '8_of_hearts': require('../../assets/cards/8_of_hearts.png'),
  '8_of_spades': require('../../assets/cards/8_of_spades.png'),

  // 9
  '9_of_clubs': require('../../assets/cards/9_of_clubs.png'),
  '9_of_diamonds': require('../../assets/cards/9_of_diamonds.png'),
  '9_of_hearts': require('../../assets/cards/9_of_hearts.png'),
  '9_of_spades': require('../../assets/cards/9_of_spades.png'),

  // 10
  '10_of_clubs': require('../../assets/cards/10_of_clubs.png'),
  '10_of_diamonds': require('../../assets/cards/10_of_diamonds.png'),
  '10_of_hearts': require('../../assets/cards/10_of_hearts.png'),
  '10_of_spades': require('../../assets/cards/10_of_spades.png'),

  // Aces
  'ace_of_clubs': require('../../assets/cards/ace_of_clubs.png'),
  'ace_of_diamonds': require('../../assets/cards/ace_of_diamonds.png'),
  'ace_of_hearts': require('../../assets/cards/ace_of_hearts.png'),
  'ace_of_spades': require('../../assets/cards/ace_of_spades.png'),

  // Jacks (variante ...2 selon tes fichiers)
  'jack_of_clubs2': require('../../assets/cards/jack_of_clubs2.png'),
  'jack_of_diamonds2': require('../../assets/cards/jack_of_diamonds2.png'),
  'jack_of_hearts2': require('../../assets/cards/jack_of_hearts2.png'),
  'jack_of_spades2': require('../../assets/cards/jack_of_spades2.png'),

  // Queens (variante ...2)
  'queen_of_clubs2': require('../../assets/cards/queen_of_clubs2.png'),
  'queen_of_diamonds2': require('../../assets/cards/queen_of_diamonds2.png'),
  'queen_of_hearts2': require('../../assets/cards/queen_of_hearts2.png'),
  'queen_of_spades2': require('../../assets/cards/queen_of_spades2.png'),

  // Kings (variante ...2)
  'king_of_clubs2': require('../../assets/cards/king_of_clubs2.png'),
  'king_of_diamonds2': require('../../assets/cards/king_of_diamonds2.png'),
  'king_of_hearts2': require('../../assets/cards/king_of_hearts2.png'),
  'king_of_spades2': require('../../assets/cards/king_of_spades2.png'),
};

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

export function useCardDeck() {
  const [deck, setDeck] = useState(generateDeck())
  const [removedCards, setRemovedCards] = useState(new Set())
  
  const handleCardSwipe = useCallback((originalIndex) => {
    if (removedCards.has(originalIndex)) return
    
    setRemovedCards(prev => {
      const newSet = new Set([...prev, originalIndex])
      
      if (newSet.size >= deck.length) {
        setTimeout(() => {
          setRemovedCards(new Set())
          setDeck(generateDeck())
        }, 1500)
      }
      
      return newSet
    })
  }, [deck.length, removedCards])

  const handleCardRestore = useCallback((index) => {
    if (removedCards.has(index)) {
      setRemovedCards(prev => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    }
  }, [removedCards])

  const visibleCards = deck.filter((_, index) => !removedCards.has(index))

  return {
    deck,
    removedCards,
    visibleCards,
    handleCardSwipe,
    handleCardRestore
  }
}