// hooks/Cards/useCardsBySuit.js
import { useMemo } from 'react'

const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'queen', 'king']

export function useCardsBySuit(deck) {
  const cardsBySuit = useMemo(() => {
    return {
      spades: cardOrder.map(rank => deck.find(card => card.suit === 'spades' && card.rank === rank)).filter(Boolean),
      hearts: cardOrder.map(rank => deck.find(card => card.suit === 'hearts' && card.rank === rank)).filter(Boolean),
      diamonds: cardOrder.map(rank => deck.find(card => card.suit === 'diamonds' && card.rank === rank)).filter(Boolean),
      clubs: cardOrder.map(rank => deck.find(card => card.suit === 'clubs' && card.rank === rank)).filter(Boolean)
    }
  }, [deck])

  return cardsBySuit
}