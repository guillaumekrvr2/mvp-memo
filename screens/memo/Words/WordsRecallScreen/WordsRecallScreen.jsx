// screens/memo/Words/WordsRecallScreen.jsx
import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader.jsx'
import WordsGrid from '../../../../components/atoms/Words/WordsGrid/WordsGrid.jsx'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton.jsx'

export default function WordsRecallScreen({ route, navigation }) {
  const { 
    objectif, 
    temps, 
    variant, 
    wordsCount, 
    autoAdvance, 
    mode, 
    discipline,
    modeVariantId,
    words // Les mots à retenir passés depuis le memo screen
  } = route.params

  // 📝 State pour stocker les inputs de l'utilisateur
  const [userInputs, setUserInputs] = useState({});
  const [scrollH, setScrollH] = useState(0);
  
  const recallTime = 240; // 4 minutes en secondes
  const rowHeight = 60;

  // 📝 Fonction pour gérer les changements de texte dans les cellules
  const handleCellTextChange = (wordIndex, text) => {
    setUserInputs(prev => ({
      ...prev,
      [wordIndex]: text
    }));
  };

  // 📝 Navigation vers le Correction Screen
  const handleDone = () => {
    // Préparer les données pour la correction
    const results = {
      originalWords: words,
      userInputs: userInputs,
      objectif,
      temps,
      variant,
      wordsCount,
      mode,
      discipline,
      modeVariantId
    };

    // Naviguer vers WordsCorrectionScreen
    navigation.replace('WordsCorrection', results);
  };

  // 📝 Gestion du retour
  const handleBack = () => {
    navigation.navigate('Words');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <MemorizationHeader
        onBack={() => navigation.popToTop()}
        onDone={handleDone}
        duration={recallTime}
      />

      {/* CONTENU PRINCIPAL */}
      <View style={styles.mainContent}>
        {/* INSTRUCTIONS */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Saisissez votre séquence</Text>
          <Text style={styles.instructionsText}>
            Entrez les {objectif} mots mémorisés
          </Text>
        </View>

        {/* GRILLE DE MOTS EN MODE INPUT */}
        <WordsGrid
          words={words}
          currentGroupIndex={-1} // Pas de highlight en mode recall
          groupSize={1}
          rowHeight={rowHeight}
          scrollHeight={520}
          onLayoutHeight={e => setScrollH(e.nativeEvent.layout.height)}
          isInputMode={true}
          onCellTextChange={handleCellTextChange}
          cellValues={userInputs}
        />

        {/* BOUTON VALIDER */}
        <PrimaryButton onPress={handleDone}>
          Valider
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
    justifyContent: 'space-between', // Espacement équitable comme NumbersRecallScreen
    alignItems: 'center',
    paddingVertical: 20,
  },

  instructionsContainer: {
    alignItems: 'center',
  },

  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },

  instructionsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
});