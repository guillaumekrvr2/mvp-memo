// screens/memo/Words/WordsMemoScreen.jsx
import React, { useState, useMemo } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Platform } from 'react-native'
import useAutoAdvance from '../../../../hooks/useAutoAdvance.js'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader.jsx'
import WordsHighlightBox from '../../../../components/atoms/Commons/WordsHighlightBox/WordsHighlightBox.jsx'
import ChevronButton from '../../../../components/atoms/Commons/ChevronButton/ChevronButton.jsx'
import WordsGrid from '../../../../components/atoms/Words/WordsGrid/WordsGrid.jsx'
import wordsRandomizer from '../../../../usecases/WordsRandomizer.js'

export default function WordsMemoScreen({ route, navigation }) {
  const { objectif, temps, variant, wordsCount, autoAdvance, mode, discipline, modeVariantId } = route.params // routes
  
  // 📝 Génération des mots aléatoires depuis la base de données complète
  const words = useMemo(() => {
    const totalWords = parseInt(objectif, 10) || 10;
    try {
      return wordsRandomizer.getRandomWords(totalWords);
    } catch (error) {
      console.error('Erreur lors de la sélection des mots:', error);
      // Fallback en cas d'erreur
      return [];
    }
  }, [objectif]);
  
  // 📝 Gestion de l'affichage des mots avec groupes
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTime = parseInt(temps, 10) || 0;
  const groupSize = wordsCount || 1;
  const totalGroups = Math.ceil(words.length / groupSize);
  const maxIndex = totalGroups - 1;
  
  
  // 📝 Mots actuellement affichés
  const currentWords = useMemo(() => {
    const startIdx = currentIndex * groupSize;
    const endIdx = startIdx + groupSize;
    return words.slice(startIdx, endIdx);
  }, [words, currentIndex, groupSize]);
  
  // 📝 Texte à afficher dans la HighlightBox (séparé par |)
  const highlightText = currentWords.join(' | ');
  
  // 📝 State pour la hauteur du scroll
  const [scrollH, setScrollH] = useState(0);
  const rowHeight = 60;
  
  // Auto-advance hook
  useAutoAdvance(autoAdvance, totalTime, totalGroups, setCurrentIndex);

  // 📝 Navigation vers le Recall Screen
  const handleDone = () => {
    navigation.replace('WordsRecall', {
      objectif,
      temps,
      words,
      variant,
      wordsCount,
      autoAdvance,
      mode,
      discipline,
      modeVariantId
    });
  };

  // 📝 Long press sur chevron gauche → retour au début
  const handleResetToBeginning = () => {
    setCurrentIndex(0);
  };

  const Container = Platform.OS === 'ios' ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      {/* HEADER */}
      <MemorizationHeader
        onBack={() => navigation.popToTop()}
        onDone={handleDone}
        duration={totalTime}
      />

      {/* CONTENU PRINCIPAL avec espacement équitable */}
      <View style={styles.mainContent}>
        {/* HIGHLIGHT BOX avec les mots */}
        <WordsHighlightBox text={highlightText} />

        {/* GRILLE DE MOTS AVEC SCROLL */}
        <WordsGrid
          words={words}
          currentGroupIndex={currentIndex}
          groupSize={groupSize}
          rowHeight={rowHeight}
          scrollHeight={500}
          onLayoutHeight={e => setScrollH(e.nativeEvent.layout.height)}
        />

        {/* CONTRÔLES */}
        <View style={styles.controls}>
          <ChevronButton
            direction="left"
            onPress={() => setCurrentIndex(i => Math.max(0, i - 1))}
            onLongPress={handleResetToBeginning} // Long press → retour au début
          />
          <ChevronButton
            direction="right"
            onPress={() => setCurrentIndex(i => Math.min(maxIndex, i + 1))}
          />
        </View>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  
  mainContent: {
    flex: 1,
    justifyContent: 'space-between', // Espacement équitable entre les 3 éléments
    alignItems: 'center', // Centrage horizontal
    paddingVertical: 10, // Un peu de padding en haut et bas
  },
  
  
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', // Même distribution que NumbersScreen
    alignItems: 'center',
    width: '100%',
    marginBottom: 12, 
  },
});