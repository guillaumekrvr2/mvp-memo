// screens/memo/Words/WordsCorrectionScreen.jsx
import React, { useState } from 'react'
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton.jsx'
import WordsGrid from '../../../../components/atoms/Words/WordsGrid/WordsGrid.jsx'
import Header from '../../../../components/Header.jsx'

export default function WordsCorrectionScreen({ route, navigation }) {
  const { 
    originalWords,
    userInputs,
    objectif,
    temps,
    variant,
    wordsCount,
    mode,
    discipline
  } = route.params

  // State pour révéler les mots corrects
  const [revealedWords, setRevealedWords] = useState({});

  // Calcul du score
  const total = originalWords.length;
  const score = originalWords.reduce((acc, word, i) => {
    const userWord = userInputs[i] || '';
    return acc + (userWord.toLowerCase().trim() === word.toLowerCase().trim() ? 1 : 0);
  }, 0);

  // Calcul de la précision
  const accuracy = Math.round((score / total) * 100);

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
      <Header/>

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
        <PrimaryButton
          style={styles.retryButton}
          onPress={handleRetry}
        >
          Retry
        </PrimaryButton>
      </View>
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
  
  instructionsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  instructionsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  
  retryButton: {
    marginTop: 20,
  },
});