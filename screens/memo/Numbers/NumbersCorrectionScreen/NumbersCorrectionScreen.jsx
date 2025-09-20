// screens/memo/CorrectionScreen/CorrectionScreen.jsx
import React, { useEffect, useRef, useCallback, useState } from 'react'
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
import useSaveScoreWithAuth from '../../../../hooks/useSaveScoreWithAuth'
import NewRecordModal from '../../../../components/molecules/Commons/NewRecordModal/NewRecordModal'
import Header from '../../../../components/Header.jsx'
import styles from './styles'

export default function CorrectionScreen({ route, navigation }) {
  // Debug: logguer les paramètres reçus
  console.log('CorrectionScreen route.params:', route.params)

  const { inputs, numbers, temps, variant, mode } = route.params

  // État pour la modal du nouveau record
  const [showNewRecordModal, setShowNewRecordModal] = useState(false)
  const [previousScore, setPreviousScore] = useState(null)

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

  // Hook pour la sauvegarde du meilleur score avec gestion d'auth
  const { saveScoreWithAuth, loading, error } = useSaveScoreWithAuth()

  // Calcul de la précision
  const accuracy = Math.round((score / total) * 100)

  console.log('CorrectionScreen rendering with:', { 
    inputsLength: inputs.length, 
    numbersLength: numbers.length, 
    score, 
    total, 
    accuracy 
  })

  // Flag pour éviter les sauvegardes multiples
  const hasSavedRef = useRef(false)

  // Sauvegarde automatique du score à l'affichage - une seule fois
  useEffect(() => {
    const saveScore = async () => {
      // Ne s'exécuter que si on n'a pas encore sauvegardé et que les données sont prêtes
      if (hasSavedRef.current) {
        console.log('Score already saved, skipping...')
        return
      }

      if (!modeVariantId || typeof modeVariantId !== 'number') {
        console.log('No valid modeVariantId to save score for:', modeVariantId)
        return
      }

      // Marquer immédiatement pour éviter les race conditions
      hasSavedRef.current = true

      console.log('Auto-saving score on screen mount...')
      const result = await saveScoreWithAuth(modeVariantId, score, navigation, (result) => {
        console.log('Score auto-saved successfully!', result)

        // Si un nouveau record a été établi, afficher la modal
        if (result.updated) {
          setShowNewRecordModal(true)
        }
      })
    }

    saveScore()
  }, [modeVariantId, score, saveScoreWithAuth, navigation]) // Toutes les dépendances nécessaires

  const handleRetry = () => {
    navigation.navigate('Numbers')
  }

  // VERSION AVEC ARCHITECTURE MEMO SCREEN (space-between layout)
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      {/* CONTENU PRINCIPAL avec espacement équitable */}
      <View style={styles.mainContent}>
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
        <BorderedContainer>
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
      </View>

      {/* BOUTON RETRY - positionné en bas avec padding */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          style={styles.retryButton}
          onPress={handleRetry}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Retry'}
        </PrimaryButton>
      </View>

      {/* Modal nouveau record */}
      <NewRecordModal
        visible={showNewRecordModal}
        onClose={() => setShowNewRecordModal(false)}
        score={score}
        previousScore={previousScore}
        discipline="Numbers"
      />
    </SafeAreaView>
  )
}