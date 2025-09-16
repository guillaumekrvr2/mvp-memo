import React, { forwardRef } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { CardSlot } from '../../../atoms/Cards/CardSlot/CardSlot'
import { PlacedCard } from '../../../atoms/Cards/PlacedCard/PlacedCard'
import { styles } from './styles'

export const OutputCarousel = forwardRef(({ 
  outputSlots, 
  objectif,
  spacing = 30,
  onCardRemove,
  // Props pour le mode correction
  correctCards = [],
  showCorrection = false
}, ref) => {
  const filledCount = outputSlots.filter(slot => slot.card).length

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Séquence restituée ({filledCount}/{objectif})
      </Text>
      
      <ScrollView 
        ref={ref}
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            width: Math.max(1000, outputSlots.length * spacing + 200)
          }
        ]}
      >
        <View style={styles.cardsContainer}>
          {outputSlots.map((slot, index) => {
            if (!slot.card) {
              return (
                <CardSlot
                  key={slot.id}
                  position={slot.position}
                  index={index}
                  spacing={spacing}
                />
              )
            }
            
            // Calcul de la correction pour cette carte - comparer suit + rank
            const correctCard = correctCards[index]
            const isCorrect = showCorrection && correctCard && slot.card
              ? slot.card.suit === correctCard.suit && slot.card.rank === correctCard.rank
              : null
            
            return (
              <PlacedCard
                key={slot.id}
                card={slot.card}
                index={index}
                spacing={spacing}
                position={slot.position}
                onPress={() => onCardRemove && onCardRemove(index)}
                isCorrect={isCorrect}
                showCorrection={showCorrection}
                correctCard={correctCard}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
})