// hooks/Cards/useFirstCards.js - Hook optimisé pour générer rapidement les premières cartes
import { useState, useEffect } from 'react'

// 🃏 Assets des cartes - version simplifiée pour le preload rapide
const cardAssets = {
  // As
  'ace_of_clubs': require('../../assets/cards/ace_of_clubs.png'),
  'ace_of_diamonds': require('../../assets/cards/ace_of_diamonds.png'),
  'ace_of_hearts': require('../../assets/cards/ace_of_hearts.png'),
  'ace_of_spades': require('../../assets/cards/ace_of_spades.png'),
  
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

  // Valets
  'jack_of_clubs': require('../../assets/cards/jack_of_clubs2.png'),
  'jack_of_diamonds': require('../../assets/cards/jack_of_diamonds2.png'),
  'jack_of_hearts': require('../../assets/cards/jack_of_hearts2.png'),
  'jack_of_spades': require('../../assets/cards/jack_of_spades2.png'),

  // Dames
  'queen_of_clubs': require('../../assets/cards/queen_of_clubs2.png'),
  'queen_of_diamonds': require('../../assets/cards/queen_of_diamonds2.png'),
  'queen_of_hearts': require('../../assets/cards/queen_of_hearts2.png'),
  'queen_of_spades': require('../../assets/cards/queen_of_spades2.png'),

  // Rois
  'king_of_clubs': require('../../assets/cards/king_of_clubs2.png'),
  'king_of_diamonds': require('../../assets/cards/king_of_diamonds2.png'),
  'king_of_hearts': require('../../assets/cards/king_of_hearts2.png'),
  'king_of_spades': require('../../assets/cards/king_of_spades2.png'),
}

// 🃏 Fonction de shuffle (Fisher-Yates) - copiée de useCardDeck
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Hook léger pour générer uniquement les premières cartes (pour preload rapide)
 * @param {number} count - Nombre de cartes à générer (ex: 6 pour 2 triplettes)
 * @returns {Array} firstCards - Array des premières cartes avec leurs assets
 */
export const useFirstCards = (count = 6) => {
  const [firstCards, setFirstCards] = useState([])
  
  useEffect(() => {
    // Génération rapide et simple des premières cartes
    const generateFirstCards = () => {
      
      // Créer le deck standard (52 cartes)
      const suits = ['spades', 'hearts', 'diamonds', 'clubs']
      const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
      
      const fullDeck = []
      suits.forEach(suit => {
        ranks.forEach(rank => {
          const cardKey = `${rank}_of_${suit}`
          if (cardAssets[cardKey]) {
            fullDeck.push({
              id: `${rank}-${suit}`,
              suit,
              rank,
              asset: cardAssets[cardKey]
            })
          }
        })
      })
      
      // Mélanger le deck
      const shuffledDeck = shuffleArray([...fullDeck])
      
      // Retourner seulement les N premières cartes
      const cards = shuffledDeck.slice(0, count)
      
      return cards
    }

    const cards = generateFirstCards()
    setFirstCards(cards)
  }, [count])

  return firstCards
}