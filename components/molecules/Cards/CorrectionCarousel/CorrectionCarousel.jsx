import React, { useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { CorrectionCard } from '../../../atoms/Cards/CorrectionCard/CorrectionCard'
import { ChevronButton } from '../../../atoms/Cards/ChevronButton/ChevronButton'
import { styles } from './styles'

export function CorrectionCarousel({ 
  userCards, 
  correctCards, 
  maxSlots 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Préparation des données de comparaison
  const comparisonData = Array.from({ length: maxSlots }, (_, index) => {
    const userCard = userCards[index] || null
    const correctCard = correctCards[index] || null
    const isEmpty = !userCard
    const isCorrect = userCard && correctCard && userCard.id === correctCard.id

    return {
      position: index + 1,
      userCard,
      correctCard,
      isEmpty,
      isCorrect
    }
  })

  // Navigation
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < maxSlots - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Calcul des statistiques
  const totalAnswered = comparisonData.filter(item => !item.isEmpty).length
  const totalCorrect = comparisonData.filter(item => item.isCorrect).length

  return (
    <View style={styles.container}>
      {/* Header avec statistiques */}
      <View style={styles.header}>
        <Text style={styles.cardCounter}>
          Carte {currentIndex + 1} / {maxSlots}
        </Text>
        <Text style={styles.stats}>
          Correctes: {totalCorrect} / {totalAnswered}
        </Text>
      </View>

      {/* Carousel avec navigation */}
      <View style={styles.carouselContainer}>
        {/* Chevron gauche */}
        <ChevronButton
          direction="left"
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={styles.chevronLeft}
        />

        {/* Carte actuelle */}
        <View style={styles.cardWrapper}>
          <CorrectionCard
            userCard={comparisonData[currentIndex].userCard}
            correctCard={comparisonData[currentIndex].correctCard}
            isCorrect={comparisonData[currentIndex].isCorrect}
            position={comparisonData[currentIndex].position}
            isEmpty={comparisonData[currentIndex].isEmpty}
          />
        </View>

        {/* Chevron droit */}
        <ChevronButton
          direction="right"
          onPress={handleNext}
          disabled={currentIndex >= maxSlots - 1}
          style={styles.chevronRight}
        />
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          • Vert = Correct ✓ • Rouge = Incorrect (tap pour voir la réponse)
        </Text>
      </View>
    </View>
  )
}