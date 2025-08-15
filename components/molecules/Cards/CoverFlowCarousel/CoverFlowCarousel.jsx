import React, { useState } from 'react'
import { View, PanResponder, Vibration } from 'react-native'
import { CoverFlowCard } from '../../../atoms/Cards/CoverFlowCard/CoverFlowCard'
import { SwipeIndicator } from '../../../atoms/Cards/SwipeIndicator/SwipeIndicator'
import { styles } from './styles'

export function CoverFlowCarousel({ 
  cards, 
  onCardSelect,
  containerWidth = 400,
  cardWidth = 90,
  cardHeight = 135
}) {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(-1)
  const [panStartY, setPanStartY] = useState(0)
  const [containerRef, setContainerRef] = useState(null)

  const totalCards = cards.length
  const spacing = totalCards > 1 ? (containerWidth - cardWidth) / (totalCards - 1) : containerWidth

  // Navigation functions
  const navigateToCard = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(hoveredCardIndex + 1, totalCards - 1)
      : Math.max(hoveredCardIndex - 1, 0)
    
    if (newIndex !== hoveredCardIndex) {
      setHoveredCardIndex(newIndex)
      Vibration.vibrate(10)
    }
  }

  const handlePreviousCard = () => navigateToCard('previous')
  const handleNextCard = () => navigateToCard('next')

  const carouselPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (evt) => {
      setPanStartY(evt.nativeEvent.pageY)
      if (containerRef) {
        containerRef.measureInWindow((x, y, width) => {
          const touchX = evt.nativeEvent.pageX - x
          
          // Calcul amélioré : trouve la carte la plus proche du touch
          let closestCardIndex = -1
          let minDistance = Infinity
          
          for (let i = 0; i < totalCards; i++) {
            const cardCenterX = (i * spacing) + (cardWidth / 2)
            const distance = Math.abs(touchX - cardCenterX)
            if (distance < minDistance && distance < cardWidth) {
              minDistance = distance
              closestCardIndex = i
            }
          }
          
          if (closestCardIndex >= 0) {
            setHoveredCardIndex(closestCardIndex)
            Vibration.vibrate(10)
          }
        })
      }
    },
    
    onPanResponderMove: (evt, gestureState) => {
      if (Math.abs(gestureState.dy) < 50 && containerRef) {
        containerRef.measureInWindow((x, y, width) => {
          const touchX = evt.nativeEvent.pageX - x
          
          // Même calcul amélioré pour le move
          let closestCardIndex = -1
          let minDistance = Infinity
          
          for (let i = 0; i < totalCards; i++) {
            const cardCenterX = (i * spacing) + (cardWidth / 2)
            const distance = Math.abs(touchX - cardCenterX)
            if (distance < minDistance && distance < cardWidth) {
              minDistance = distance
              closestCardIndex = i
            }
          }
          
          if (closestCardIndex >= 0 && closestCardIndex !== hoveredCardIndex) {
            setHoveredCardIndex(closestCardIndex)
            Vibration.vibrate(3)
          }
        })
      }
    },
    
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy < -50 && hoveredCardIndex >= 0) {
        const selectedCard = cards[hoveredCardIndex]
        if (selectedCard) {
          onCardSelect(selectedCard)
          Vibration.vibrate([0, 30, 20, 50])
        }
      }
      setHoveredCardIndex(-1)
    }
  })

  return (
    <View style={styles.container}>
      
      <View 
        style={styles.carouselContainer}
        ref={setContainerRef}
        {...carouselPanResponder.panHandlers}
      >
        {cards.map((card, index) => {
          const isHovered = hoveredCardIndex === index
          const distanceFromHovered = hoveredCardIndex >= 0 ? Math.abs(index - hoveredCardIndex) : 5
          
          const waveEffect = hoveredCardIndex >= 0 ? Math.max(0, 25 - distanceFromHovered * 5) : 0
          const separationEffect = isHovered ? 40 : 0
          
          return (
            <CoverFlowCard
              key={card.id}
              card={card}
              index={index}
              spacing={spacing}
              isHovered={isHovered}
              waveEffect={waveEffect}
              separationEffect={separationEffect}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          )
        })}
      </View>
      
      <SwipeIndicator isVisible={hoveredCardIndex >= 0} />
    </View>
  )
}