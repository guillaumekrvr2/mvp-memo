// screens/memo/Spoken/SpokenCorrectionScreen/SpokenCorrectionScreen.jsx
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Alert,
} from 'react-native'

import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton'
import BorderedContainer from '../../../../components/atoms/Commons/BorderedContainer/BorderedContainer'
import CorrectionGrid from '../../../../components/organisms/CorrectionGrid/CorrectionGrid'
import NewRecordModal from '../../../../components/molecules/Commons/NewRecordModal/NewRecordModal'
import useSaveBestScore from '../../../../hooks/useSaveBestScore'
import Header from '../../../../components/Header.jsx'
import styles from './styles'

export default function SpokenCorrectionScreen({ route, navigation }) {

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

  // Pour Spokens, utiliser toujours le variant 18 (seul variant Spokens dans Supabase)
  const modeVariantId = 18

  // État pour la modal de nouveau record
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [recordData, setRecordData] = useState(null)

  // Calcul du score
  const total = inputs.length
  const score = inputs.reduce((acc, v, i) => {
    return acc + (v === String(digitSequence[i]) ? 1 : 0)
  }, 0)

  // Hook pour la sauvegarde du meilleur score
  const { saveBestScore, loading, error } = useSaveBestScore()

  // Calcul de la précision
  const accuracy = Math.round((score / total) * 100)


  // Sauvegarde automatique du score à l'affichage
  useEffect(() => {
    const saveScoreOnMount = async () => {
      try {
        
        // Sauvegarde du score avec le variant Spokens (18)
        const result = await saveBestScore(modeVariantId, score)
        
        // Afficher modal si nouveau record
        if (result.updated) {
          setRecordData({
            score: score,
            previousScore: result.record.previousBestScore,
            discipline: 'Spokens'
          })
          setShowRecordModal(true)
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

  const closeRecordModal = () => {
    setShowRecordModal(false)
  }

  // VERSION AVEC ARCHITECTURE MEMO SCREEN (space-between layout)
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      {/* CONTENU PRINCIPAL avec espacement équitable */}
      <View style={styles.mainContent}>
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
        <BorderedContainer>
          <CorrectionGrid 
            inputs={inputs} 
            numbers={digitSequence} 
            cols={6} 
          />
        </BorderedContainer>

        {/* INSTRUCTIONS + BOUTON RETRY */}
        <View style={styles.bottomSection}>
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>
              Cellules vertes = chiffres corrects
            </Text>
            <Text style={styles.instructionsText}>
              Cellules rouges = chiffres incorrects (appuyez pour révéler)
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
        visible={showRecordModal}
        onClose={closeRecordModal}
        score={recordData?.score || 0}
        previousScore={recordData?.previousScore}
        discipline={recordData?.discipline || 'Spokens'}
      />
    </SafeAreaView>
  )
}