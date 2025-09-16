// hooks/Cards/useCardsBySuit.js
import { useMemo } from 'react'

const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'queen', 'king']

export function useCardsBySuit(deck, usedCards = [], objectif = 52) {
  const cardsBySuit = useMemo(() => {
    // Créer un Set des IDs des cartes utilisées pour une recherche rapide
    const usedCardIds = new Set(usedCards.map(card => card?.id).filter(Boolean))

    // Fonction pour filtrer les cartes utilisées si objectif = 52
    const filterUsedCards = (cards) => {
      if (objectif !== 52) return cards
      return cards.filter(card => !usedCardIds.has(card.id))
    }

    return {
      spades: filterUsedCards(cardOrder.map(rank => deck.find(card => card.suit === 'spades' && card.rank === rank)).filter(Boolean)),
      hearts: filterUsedCards(cardOrder.map(rank => deck.find(card => card.suit === 'hearts' && card.rank === rank)).filter(Boolean)),
      diamonds: filterUsedCards(cardOrder.map(rank => deck.find(card => card.suit === 'diamonds' && card.rank === rank)).filter(Boolean)),
      clubs: filterUsedCards(cardOrder.map(rank => deck.find(card => card.suit === 'clubs' && card.rank === rank)).filter(Boolean))
    }
  }, [deck, usedCards, objectif])

  return cardsBySuit
}