// screens/memo/Spoken/SpokenCorrectionScreen/SpokenCorrectionScreen.jsx
import React, { useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native'

import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton'
import BorderedContainer from '../../../../components/atoms/Commons/BorderedContainer/BorderedContainer'
import CorrectionGrid from '../../../../components/organisms/CorrectionGrid/CorrectionGrid'
import useSaveBestScore from '../../../../hooks/useSaveBestScore'
import styles from './styles'

export default function SpokenCorrectionScreen({ route, navigation }) {
  console.log('SpokenCorrectionScreen route.params:', route.params)

  const { inputs, digitSequence, temps, variant, mode, discipline = 'spokens', objectif } = route.params

  // Protection contre les paramètres manquants
  if (!inputs || !digitSequence) {
    console.error('SpokenCorrectionScreen: Paramètres manquants!', { inputs, digitSequence })
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center', marginTop: 100 }}>
          Erreur: Paramètres manquants
        </Text>
      </SafeAreaView>
    )
  }

  // Protection contre mode undefined
  const safeMode = mode || 'custom'
  console.log('Mode corrigé:', safeMode)

  // Le variant contient l'ID du mode variant
  const modeVariantId = variant || safeMode

  // Calcul du score
  const total = inputs.length
  const score = inputs.reduce((acc, v, i) => {
    return acc + (v === String(digitSequence[i]) ? 1 : 0)
  }, 0)

  // Hook pour la sauvegarde du meilleur score
  const { saveBestScore, loading, error } = useSaveBestScore()

  // Calcul de la précision
  const accuracy = Math.round((score / total) * 100)

  console.log('SpokenCorrectionScreen rendering with:', { 
    inputsLength: inputs.length, 
    digitSequenceLength: digitSequence.length, 
    score, 
    total, 
    accuracy 
  })

  // Sauvegarde automatique du score à l'affichage
  useEffect(() => {
    const saveScoreOnMount = async () => {
      try {
        console.log('Auto-saving spoken score on screen mount...')
        
        // Sauvegarde conditionnelle du score s'il est meilleur
        if (modeVariantId && typeof modeVariantId === 'number') {
          await saveBestScore(modeVariantId, score)
          console.log('Spoken score auto-saved successfully!')
        } else {
          console.log('No modeVariantId to save spoken score for:', modeVariantId)
        }
      } catch (error) {
        // Si l'utilisateur n'est pas connecté, afficher popup de connexion
        if (error.message === 'No user logged in') {
          Alert.alert(
            'Score non sauvegardé',
            'Connecte-toi pour sauvegarder tes scores !',
            [
              {
                text: 'Plus tard',
                style: 'cancel'
              },
              {
                text: 'Se connecter',
                onPress: () => navigation.navigate('SignUp')
              }
            ]
          )
        } else {
          // Autres erreurs : logguer
          console.error('Erreur lors de la sauvegarde automatique spoken:', error)
        }
      }
    }

    saveScoreOnMount()
  }, [modeVariantId, score, saveBestScore, navigation])

  const handleRetry = () => {
    navigation.navigate('Spoken')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 80, paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* RÉSULTATS */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Résultats Spokens 🎤</Text>
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
            numbers={digitSequence} 
            cols={6} 
          />
        </BorderedContainer>

        {/* INSTRUCTIONS */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Cellules vertes = chiffres corrects
          </Text>
          <Text style={styles.instructionsText}>
            Cellules rouges = chiffres incorrects (appuyez pour révéler)
          </Text>
        </View>

        {/* BOUTON RETRY */}
        <PrimaryButton
          style={styles.retryButton}
          onPress={handleRetry}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Retry'}
        </PrimaryButton>
      </ScrollView>
    </SafeAreaView>
  )
}