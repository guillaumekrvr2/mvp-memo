// 📁 components/molecules/CardsThumbnailRow/CardsThumbnailRow.jsx
import React, { useMemo, useRef, useEffect } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { CardThumbnail } from '../../../atoms/Cards/CardThumbnail/CardThumbnail'
import { styles } from './styles'

export function CardsThumbnailRow({ 
  deck, 
  currentGroupIndex = 0,
  groupSize = 1
}) {
  const scrollViewRef = useRef(null)
  const { width: screenWidth } = Dimensions.get('window')
  const cardSpacing = 8 // Espacement uniforme entre chaque carte (tranche visible)

  // Auto-scroll pour maintenir le groupe actuel au centre
  useEffect(() => {
    if (scrollViewRef.current && deck.length > 0) {
      const currentGroupStartIndex = currentGroupIndex * groupSize
      const groupCenterIndex = currentGroupStartIndex + Math.floor(groupSize / 2)
      const cardPosition = groupCenterIndex * cardSpacing
      const centerOffset = screenWidth / 2
      const scrollPosition = Math.max(0, cardPosition - centerOffset)
      
      scrollViewRef.current.scrollTo({
        x: scrollPosition,
        animated: true
      })
    }
  }, [currentGroupIndex, deck.length, groupSize, screenWidth, cardSpacing])

  const renderCard = (card, index) => {
    const cardGroupIndex = Math.floor(index / groupSize)
    const isInCurrentGroup = cardGroupIndex === currentGroupIndex
    const isCompleted = cardGroupIndex < currentGroupIndex
    
    // Calculer le nombre total de groupes
    const totalGroups = Math.ceil(deck.length / groupSize)
    const isInLastGroup = cardGroupIndex === totalGroups - 1
    const hasReachedLastGroup = currentGroupIndex >= totalGroups - 1
    
    return (
      <View
        key={card.id}
        style={[
          styles.uniformCard,
          {
            left: index * cardSpacing,
            zIndex: index, // Premières cartes au-dessus pour tranche gauche visible
            elevation: index
          }
        ]}
      >
        <CardThumbnail
          item={card}
          index={index}
          isRemoved={isCompleted || (isInLastGroup && hasReachedLastGroup)} // Griser si complété OU si dans le dernier groupe ET qu'on l'a atteint
          onPress={() => {}}
        />
      </View>
    )
  }

  // Calculer la position de l'indicateur de focus
  const focusIndicatorPosition = useMemo(() => {
    const groupStartIndex = currentGroupIndex * groupSize
    const groupEndIndex = Math.min(groupStartIndex + groupSize - 1, deck.length - 1)
    const startPosition = groupStartIndex * cardSpacing
    const endPosition = groupEndIndex * cardSpacing + 50 // +50 pour la largeur de la carte
    const width = endPosition - startPosition
    
    return { left: startPosition, width }
  }, [currentGroupIndex, groupSize, deck.length, cardSpacing])

  return (
    <View style={styles.cardsRow}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.cardsRowContent,
          { width: (deck.length - 1) * cardSpacing + 50 + 32 } // Largeur totale + padding
        ]}
      >
        {/* Conteneur pour toutes les cartes empilées */}
        <View style={styles.uniformContainer}>
          {deck.map((card, index) => renderCard(card, index))}
          
          {/* Plus d'indicateur de focus */}
        </View>
      </ScrollView>
    </View>
  )
}