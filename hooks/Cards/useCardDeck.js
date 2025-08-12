// hooks/Cards/useCardDeck.js - VERSION AMÉLIORÉE
import { useState, useCallback, useEffect } from 'react'

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
}

// 🃏 Génération du paquet complet de 52 cartes
const generateFullDeck = () => {
  const suits = ['clubs', 'diamonds', 'hearts', 'spades']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack2', 'queen2', 'king2']
  
  return suits.flatMap(suit => 
    ranks.map(rank => {
      // Gestion des noms spéciaux pour les assets
      const assetKey = (rank.endsWith('2') && rank !== '2') 
        ? rank.replace('2', '') + '_of_' + suit + '2'  // Figures : jack2 → jack_of_clubs2
        : rank + '_of_' + suit                         // Normales : 2 → 2_of_clubs
      
      return {
        id: `${rank}_of_${suit}`,
        suit,
        rank: rank.replace('2', ''), // Nettoie le nom pour l'affichage
        asset: cardAssets[assetKey]
      }
    })
  )
}

// 🃏 Fonction de shuffle (Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 🃏 Génère le deck selon l'objectif
const generateDeckForObjective = (objectif) => {
  const fullDeck = generateFullDeck() // 52 cartes
  const fullDecks = Math.floor(objectif / 52) // Nombre de paquets complets
  const remainder = objectif % 52 // Cartes supplémentaires
  
  let finalDeck = []
  
  // Ajoute les paquets complets
  for (let i = 0; i < fullDecks; i++) {
    finalDeck = [...finalDeck, ...shuffleArray(fullDeck)]
  }
  
  // Ajoute les cartes supplémentaires si nécessaire
  if (remainder > 0) {
    const shuffledDeck = shuffleArray(fullDeck)
    finalDeck = [...finalDeck, ...shuffledDeck.slice(0, remainder)]
  }
  
  // Shuffle final du deck complet
  return shuffleArray(finalDeck)
}

export function useCardDeck(objectif = 52, displayCount = 1) { // renommé pour clarifier
  const [deck, setDeck] = useState([])
  const [removedCards, setRemovedCards] = useState(new Set())
  
  // 🃏 Génération du deck au changement d'objectif
  useEffect(() => {
    const initialDeck = generateDeckForObjective(objectif)
    setDeck(initialDeck)
    setRemovedCards(new Set())
    console.log(`🃏 Deck généré: ${initialDeck.length} cartes pour objectif de ${objectif}`)
  }, [objectif])
  
  const handleCardSwipe = useCallback((originalIndex) => {
    if (removedCards.has(originalIndex)) return
    
    setRemovedCards(prev => {
      const newSet = new Set([...prev, originalIndex])
      
      // Auto-reset si toutes les cartes sont supprimées (pour mode démo)
      if (newSet.size >= deck.length) {
        console.log('🎯 Toutes les cartes mémorisées!')
        setTimeout(() => {
          setRemovedCards(new Set())
          setDeck(generateDeckForObjective(objectif))
        }, 1500)
      }
      
      return newSet
    })
  }, [deck.length, removedCards, objectif])

  const handleCardRestore = useCallback((index) => {
    if (removedCards.has(index)) {
      setRemovedCards(prev => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    }
  }, [removedCards])

  // 🃏 Cartes visibles (non supprimées) - PLUS de limitation par displayCount
  const allVisibleCards = deck.filter((_, index) => !removedCards.has(index))
  const visibleCards = allVisibleCards // Plus de slice ici, c'est le CardsScreen qui gère

  return {
    deck,
    removedCards,
    visibleCards,
    allVisibleCards,
    handleCardSwipe,
    handleCardRestore,
    totalCards: deck.length,
    remainingCards: deck.length - removedCards.size,
    isComplete: removedCards.size >= deck.length
  }
}