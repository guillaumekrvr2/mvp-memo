// screens/memo/Binaries/CorrectionScreen/CorrectionScreen.jsx
import React, { useEffect, useState, useRef } from 'react'
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
import NewRecordModal from '../../../../components/molecules/Commons/NewRecordModal/NewRecordModal'
import Header from '../../../../components/Header.jsx'
import styles from './styles'

export default function BinaryCorrectionScreen({ route, navigation }) {

  const { inputs, binaries, temps, variant, mode, modeVariantId } = route.params

  // État pour la modal du nouveau record
  const [showNewRecordModal, setShowNewRecordModal] = useState(false)
  const [previousScore, setPreviousScore] = useState(null)

  // Protection contre les paramètres manquants - AMÉLIORE
  if (!inputs || !binaries) {
    console.error('BinaryCorrectionScreen: Paramètres manquants!', { inputs, binaries })
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

  // Calcul du score
  const total = inputs.length
  const score = inputs.reduce((acc, v, i) => {
    return acc + (v === String(binaries[i]) ? 1 : 0)
  }, 0)

  // Hook pour la sauvegarde du meilleur score
  const { saveBestScore, loading, error } = useSaveBestScore()

  // Calcul de la précision
  const accuracy = Math.round((score / total) * 100)

  // Flag pour éviter les sauvegardes multiples
  const hasSavedRef = useRef(false)

  // Sauvegarde automatique du score à l'affichage - une seule fois
  useEffect(() => {
    const saveScore = async () => {
      if (hasSavedRef.current) return
      
      if (!modeVariantId || typeof modeVariantId !== 'number') return

      hasSavedRef.current = true

      try {
        const result = await saveBestScore(modeVariantId, score)
        
        // Si un nouveau record a été établi, afficher la modal
        if (result.updated) {
          setShowNewRecordModal(true)
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
          console.error('Erreur lors de la sauvegarde automatique:', error)
        }
      }
    }

    const timeoutId = setTimeout(saveScore, 100)
    return () => clearTimeout(timeoutId)
  }, [modeVariantId, score, saveBestScore, navigation])

  const handleRetry = () => {
    navigation.navigate('Binaries')
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
            binaries={binaries} 
            cols={6} 
          />
        </BorderedContainer>

        {/* INSTRUCTIONS + BOUTON RETRY */}
        <View style={styles.bottomSection}>
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>
              Cellules vertes = correctes
            </Text>
            <Text style={styles.instructionsText}>
              Cellules rouges = incorrectes (appuyez pour révéler)
            </Text>
          </View>
          
          <PrimaryButton
            style={styles.retryButton}
            onPress={handleRetry}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Retry'}
          </PrimaryButton>
        </View>
      </View>

      {/* Modal de nouveau record */}
      <NewRecordModal
        visible={showNewRecordModal}
        onClose={() => setShowNewRecordModal(false)}
        score={score}
        previousScore={previousScore}
        discipline="Binaries"
      />
    </SafeAreaView>
  )
}