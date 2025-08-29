// screens/memo/Words/WordsMemoScreen.jsx
import React, { useState, useMemo, useRef } from 'react'
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import useAutoAdvance from '../../../hooks/useAutoAdvance.js'
import MemorizationHeader from '../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader.jsx'
import WordsHighlightBox from '../../../components/atoms/Commons/WordsHighlightBox/WordsHighlightBox.jsx'
import ChevronButton from '../../../components/atoms/Commons/ChevronButton/ChevronButton.jsx'
import { previewWords } from '../../../config/wordsConfig'

export default function WordsMemoScreen({ route, navigation }) {
  const { objectif, temps, variant, wordsCount, autoAdvance, mode, discipline } = route.params // routes
  
  // 📝 Génération des mots depuis la config (pour test)
  const words = useMemo(() => {
    const totalWords = parseInt(objectif, 10) || 10;
    const generatedWords = [];
    
    for (let i = 0; i < totalWords; i++) {
      // Prendre un mot aléatoire de la config
      const randomWord = previewWords[Math.floor(Math.random() * previewWords.length)];
      generatedWords.push(randomWord);
    }
    
    return generatedWords;
  }, [objectif]);
  
  // 📝 Gestion de l'affichage des mots avec groupes
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTime = parseInt(temps, 10) || 0;
  const groupSize = wordsCount || 1;
  const totalGroups = Math.ceil(words.length / groupSize);
  const maxIndex = totalGroups - 1;
  
  // 📝 Organisation des mots en lignes de 2
  const wordsRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < words.length; i += 2) {
      rows.push(words.slice(i, i + 2));
    }
    return rows;
  }, [words]);
  
  // 📝 Mots actuellement affichés
  const currentWords = useMemo(() => {
    const startIdx = currentIndex * groupSize;
    const endIdx = startIdx + groupSize;
    return words.slice(startIdx, endIdx);
  }, [words, currentIndex, groupSize]);
  
  // 📝 Texte à afficher dans la HighlightBox (séparé par |)
  const highlightText = currentWords.join(' | ');
  
  // 📝 Scroll automatique avec focus sur les mots highlight
  const scrollRef = useRef(null);
  const [scrollH, setScrollH] = useState(0);
  const rowHeight = 60; // Hauteur approximative d'une ligne de mots
  
  // Fonction pour calculer et scroller vers le groupe actuel
  const scrollToCurrentGroup = () => {
    if (!scrollRef.current || words.length === 0) return;
    
    // Calculer l'index du premier mot du groupe actuel
    const firstWordIndex = currentIndex * groupSize;
    
    // Calculer la ligne où se trouve ce mot (2 mots par ligne)
    const targetRow = Math.floor(firstWordIndex / 2);
    
    // Calculer la position Y du centre de cette ligne
    const targetY = targetRow * rowHeight;
    
    // Scroller vers cette position avec animation
    scrollRef.current.scrollTo({
      y: Math.max(0, targetY - scrollH / 2 + rowHeight / 2),
      animated: true
    });
  };
  
  // Déclencher le scroll quand currentIndex change
  React.useEffect(() => {
    const timer = setTimeout(scrollToCurrentGroup, 100); // Petit délai pour laisser le render se faire
    return () => clearTimeout(timer);
  }, [currentIndex, scrollH]);
  
  // useAutoScroll(scrollRef, scrollH, currentIndex, rowHeight); // Remplacé par notre logique custom
  
  // Auto-advance hook
  useAutoAdvance(autoAdvance, totalTime, totalGroups, setCurrentIndex);

  // 📝 Navigation vers le Recall (à implémenter plus tard)
  const handleDone = () => {
    // Pour l'instant, retour au début
    navigation.replace('Words', { 
      objectif, 
      temps, 
      words, 
      variant,
      wordsCount,
      mode,
      discipline
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={handleDone}
        duration={totalTime}
      />

      {/* CONTENU PRINCIPAL avec espacement équitable */}
      <View style={styles.mainContent}>
        {/* HIGHLIGHT BOX avec les mots */}
        <WordsHighlightBox text={highlightText} />

        {/* GRILLE DE MOTS AVEC SCROLL */}
        <View 
          style={styles.wordsContainer}
          onLayout={e => setScrollH(e.nativeEvent.layout.height)}
        >
          <ScrollView 
            ref={scrollRef}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {wordsRows.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.wordsRow}>
                {row.map((word, colIndex) => {
                  const wordIndex = rowIndex * 2 + colIndex;
                  const groupIndex = Math.floor(wordIndex / groupSize);
                  const isInCurrentGroup = groupIndex === currentIndex;
                  
                  return (
                    <View
                      key={`word-${wordIndex}`}
                      style={[
                        styles.wordCell,
                        isInCurrentGroup && styles.highlightWordCell
                      ]}
                    >
                      <Text style={[
                        styles.wordText,
                        isInCurrentGroup && styles.highlightWordText
                      ]}>
                        {word}
                      </Text>
                    </View>
                  );
                })}
                {/* Remplir les cellules vides si nécessaire */}
                {Array.from({ length: 2 - row.length }, (_, i) => (
                  <View key={`empty-${i}`} style={styles.emptyCell} />
                ))}
              </View>
            ))}
          </ScrollView>
          
          {/* Gradient du haut pour l'effet de shadow */}
          <LinearGradient
            colors={['#000', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.4)', 'transparent']}
            style={styles.topShadow}
            pointerEvents="none"
          />
          
          {/* Gradient du bas pour l'effet de shadow */}
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)', '#000']}
            style={styles.bottomShadow}
            pointerEvents="none"
          />
        </View>

        {/* CONTRÔLES */}
        <View style={styles.controls}>
          <ChevronButton
            direction="left"
            onPress={() => setCurrentIndex(i => Math.max(0, i - 1))}
          />
          <ChevronButton
            direction="right"
            onPress={() => setCurrentIndex(i => Math.min(maxIndex, i + 1))}
          />
        </View>
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
    justifyContent: 'space-between', // Espacement équitable entre les 3 éléments
    alignItems: 'center', // Centrage horizontal
    paddingVertical: 10, // Un peu de padding en haut et bas
  },
  
  wordsContainer: {
    height: 500, // Hauteur fixe au lieu de flex: 1 pour réduire la grille
    width: '100%',
    paddingHorizontal: 8, // Padding réduit pour plus de largeur
    position: 'relative', // Pour positionner le gradient
  },
  
  scrollContainer: {
    flex: 1,
    paddingTop: 14,
  },
  
  scrollContent: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    // Suppression d'alignItems: 'center' qui peut contraindre la largeur
  },
  
  wordsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Centrage de la ligne
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  
  wordCell: {
    width: '40%', // Largeur fixe
    marginHorizontal: 8, // Marge horizontale des deux côtés pour centrage
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 45,
  },
  
  highlightWordCell: {
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
    borderColor: '#667eea',
    borderWidth: 1.5,
  },
  
  wordText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  highlightWordText: {
    color: '#ffffff',
    fontWeight: '700',
    zIndex: 10, // S'assurer que le texte est au-dessus des couches de glow
  },
  
  emptyCell: {
    width: '40%', // Même largeur que les vraies cellules
    marginHorizontal: 8, // Même marge horizontale
    height: 45,
  },
  
  topShadow: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 25,
    zIndex: 1,
  },
  
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 25,
    zIndex: 1,
  },
  
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', // Même distribution que NumbersScreen
    alignItems: 'center',
    width: '100%',
    marginBottom: 12, 
  },
});