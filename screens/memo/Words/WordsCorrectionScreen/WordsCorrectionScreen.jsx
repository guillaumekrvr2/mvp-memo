// screens/memo/Words/WordsCorrectionScreen.jsx
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton.jsx'
import WordsGrid from '../../../../components/atoms/Words/WordsGrid/WordsGrid.jsx'
import Header from '../../../../components/Header.jsx'
import useSaveScoreWithAuth from '../../../../hooks/useSaveScoreWithAuth'
import NewRecordModal from '../../../../components/molecules/Commons/NewRecordModal/NewRecordModal'

export default function WordsCorrectionScreen({ route, navigation }) {
  const { 
    originalWords,
    userInputs,
    objectif,
    temps,
    variant,
    wordsCount,
    mode,
    discipline,
    modeVariantId
  } = route.params

  // State pour révéler les mots corrects
  const [revealedWords, setRevealedWords] = useState({});

  // État pour la modal du nouveau record
  const [showNewRecordModal, setShowNewRecordModal] = useState(false)
  const [previousScore, setPreviousScore] = useState(null)

  // Calcul du score
  const total = originalWords.length;
  const score = originalWords.reduce((acc, word, i) => {
    const userWord = userInputs[i] || '';
    return acc + (userWord.toLowerCase().trim() === word.toLowerCase().trim() ? 1 : 0);
  }, 0);

  // Hook pour la sauvegarde du meilleur score avec gestion d'auth
  const { saveScoreWithAuth, loading, error } = useSaveScoreWithAuth()

  // Calcul de la précision
  const accuracy = Math.round((score / total) * 100);

  // Flag pour éviter les sauvegardes multiples
  const hasSavedRef = useRef(false)

  // Sauvegarde automatique du score à l'affichage - une seule fois
  useEffect(() => {
    const saveScore = async () => {
      if (hasSavedRef.current) return

      if (!modeVariantId || typeof modeVariantId !== 'number') return

      hasSavedRef.current = true

      await saveScoreWithAuth(modeVariantId, score, navigation, (result) => {
        // Si un nouveau record a été établi, afficher la modal
        if (result.updated) {
          setShowNewRecordModal(true)
        }
      })
    }

    const timeoutId = setTimeout(saveScore, 100)
    return () => clearTimeout(timeoutId)
  }, [modeVariantId, score, saveScoreWithAuth, navigation])

  // Fonction pour révéler un mot
  const handleWordReveal = (wordIndex) => {
    setRevealedWords(prev => ({
      ...prev,
      [wordIndex]: true
    }));
  };

  // Fonction pour déterminer l'état d'un mot
  const getWordState = (wordIndex) => {
    const originalWord = originalWords[wordIndex];
    const userWord = userInputs[wordIndex] || '';
    const isCorrect = userWord.toLowerCase().trim() === originalWord.toLowerCase().trim();
    const isRevealed = revealedWords[wordIndex];
    
    return {
      isCorrect,
      isRevealed,
      displayWord: isRevealed ? originalWord : userWord
    };
  };

  // Fonction retry
  const handleRetry = () => {
    navigation.navigate('Words');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Header navigation={navigation} />

      {/* CONTENU PRINCIPAL */}
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
        <WordsGrid
          words={originalWords}
          currentGroupIndex={-1}
          groupSize={1}
          rowHeight={60}
          scrollHeight={390} // Réduit de 520 à 390 (25% de réduction)
          isInputMode={false}
          isCorrectionMode={true}
          onWordReveal={handleWordReveal}
          getWordState={getWordState}
        />

      </View>

      {/* BOUTON RETRY - positionné en bas avec padding */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          style={styles.retryButton}
          onPress={handleRetry}
        >
          Retry
        </PrimaryButton>
      </View>

      {/* Modal de nouveau record */}
      <NewRecordModal
        visible={showNewRecordModal}
        onClose={() => setShowNewRecordModal(false)}
        score={score}
        previousScore={previousScore}
        discipline="Words"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24, // Padding pour éviter le chevauchement avec le header
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  
  resultsContainer: {
    alignItems: 'center',
    marginBottom: 20, // Réduit de 30 à 20
  },
  
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  
  accuracyText: {
    fontSize: 18,
    color: '#888',
  },
  
  buttonContainer: {
    paddingHorizontal: 20, // 20px de padding horizontal
    paddingBottom: 10, // 10px d'écart avec le bas
    alignItems: 'center',
  },

  retryButton: {
    width: '100%', // Utilise toute la largeur du container (moins le padding)
  },
});