// screens/memo/CorrectionScreen/CorrectionScreen.jsx
import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from 'react-native'
import { SecondaryButton } from '../../../components/atoms/SecondaryButton/SecondaryButton'
import BorderedContainer from '../../../components/atoms/BorderedContainer/BorderedContainer'
import CorrectionGrid from '../../../components/organisms/CorrectionGrid/CorrectionGrid'
import useSaveBestScore from '../../../hooks/useSaveBestScore'
import styles from './styles'

export default function CorrectionScreen({ route, navigation }) {
  // Debug: logguer les paramètres reçus
  console.log('CorrectionScreen route.params:', route.params)

  const { inputs, numbers, temps, variant, mode } = route.params

  // Protection contre les paramètres manquants - AMÉLIORE
  if (!inputs || !numbers) {
    console.error('CorrectionScreen: Paramètres manquants!', { inputs, numbers })
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center', marginTop: 100 }}>
          Erreur: Paramètres manquants
        </Text>
      </SafeAreaView>
    )
  }

  // Protection contre mode undefined
  const safeMode = mode || 'custom' // fallback si mode est undefined
  console.log('Mode corrigé:', safeMode)

  // Le variant contient l'ID du mode variant
  const modeVariantId = variant || safeMode

  // Calcul du score
  const total = inputs.length
  const score = inputs.reduce((acc, v, i) => {
    return acc + (v === String(numbers[i]) ? 1 : 0)
  }, 0)

  // Calcul de la précision
  const accuracy = Math.round((score / total) * 100)

  console.log('CorrectionScreen rendering with:', { 
    inputsLength: inputs.length, 
    numbersLength: numbers.length, 
    score, 
    total, 
    accuracy 
  })

  const handleRetry = () => {
    console.log('Retry button pressed')
    navigation.navigate('Numbers')
  }

  // VERSION FINALE AVEC TOUS LES COMPOSANTS ET STYLES
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* RÉSULTATS */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Résultats</Text>
          <Text style={styles.scoreText}>
            Score: {score} / {total}
          </Text>
          <Text style={styles.accuracyText}>
            Précision: {accuracy}%
          </Text>
        </View>

        {/* GRILLE DE CORRECTION */}
        <BorderedContainer style={styles.gridContainer}>
          <CorrectionGrid 
            inputs={inputs} 
            numbers={numbers} 
            cols={6} 
          />
        </BorderedContainer>

        {/* INSTRUCTIONS */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Cellules vertes = correctes
          </Text>
          <Text style={styles.instructionsText}>
            Cellules rouges = incorrectes (appuyez pour révéler)
          </Text>
        </View>

        {/* BOUTON RETRY */}
        <SecondaryButton
          style={styles.retryButton}
          onPress={handleRetry}
        >
          Retry
        </SecondaryButton>
      </ScrollView>
    </SafeAreaView>
  )
}