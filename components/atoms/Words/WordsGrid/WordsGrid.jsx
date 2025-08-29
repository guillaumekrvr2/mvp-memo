import React, { useRef, createRef } from 'react';
import { View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import WordsCell from '../WordsCell/WordsCell';

// 📝 TODO: Évaluer si ce composant peut être fusionné/modifié avec l'atom 'Grid' existant dans Numbers
// Pour le moment, on garde séparé car les besoins peuvent être différents

export default function WordsGrid({ 
  words = [],
  currentGroupIndex = 0,
  groupSize = 1,
  rowHeight = 60,
  scrollHeight = 500,
  onLayoutHeight,
  isInputMode = false,
  onCellTextChange,
  cellValues = {},
  isCorrectionMode = false,
  onWordReveal,
  getWordState
}) {
  const scrollRef = useRef(null);
  
  // Créer des refs pour chaque input
  const inputRefs = React.useRef(words.map(() => createRef()));
  
  // Mettre à jour les refs si le nombre de mots change
  React.useEffect(() => {
    inputRefs.current = words.map(() => createRef());
  }, [words.length]);
  
  // Organisation des mots en lignes de 2
  const wordsRows = React.useMemo(() => {
    const rows = [];
    for (let i = 0; i < words.length; i += 2) {
      rows.push(words.slice(i, i + 2));
    }
    return rows;
  }, [words]);

  // Scroll automatique vers le groupe actuel (seulement si currentGroupIndex >= 0)
  const scrollToCurrentGroup = React.useCallback(() => {
    if (!scrollRef.current || words.length === 0 || currentGroupIndex < 0) return;
    
    const firstWordIndex = currentGroupIndex * groupSize;
    const targetRow = Math.floor(firstWordIndex / 2);
    const targetY = targetRow * rowHeight;
    
    scrollRef.current.scrollTo({
      y: Math.max(0, targetY - scrollHeight / 2 + rowHeight / 2),
      animated: true
    });
  }, [currentGroupIndex, groupSize, words.length, rowHeight, scrollHeight]);

  React.useEffect(() => {
    if (currentGroupIndex >= 0) {
      const timer = setTimeout(scrollToCurrentGroup, 100);
      return () => clearTimeout(timer);
    }
  }, [scrollToCurrentGroup, currentGroupIndex]);

  // Fonction pour passer au champ suivant
  const focusNextInput = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < words.length && inputRefs.current[nextIndex]?.current) {
      inputRefs.current[nextIndex].current.focus();
    }
  };

  return (
    <View 
      style={[styles.wordsContainer, { height: scrollHeight }]}
      onLayout={onLayoutHeight}
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
              const isHighlighted = groupIndex === currentGroupIndex;
              
              // Mode correction
              if (isCorrectionMode) {
                const wordState = getWordState?.(wordIndex) || {};
                
                return (
                  <WordsCell
                    key={`word-${wordIndex}`}
                    word={wordState.displayWord || word}
                    isCorrectionMode={true}
                    isCorrect={wordState.isCorrect}
                    isRevealed={wordState.isRevealed}
                    onPress={() => onWordReveal?.(wordIndex)}
                  />
                );
              }
              
              return (
                <WordsCell
                  key={`word-${wordIndex}`}
                  ref={isInputMode ? inputRefs.current[wordIndex] : null}
                  word={word}
                  isHighlighted={isHighlighted}
                  isInput={isInputMode}
                  value={cellValues[wordIndex]}
                  onTextChange={(text) => onCellTextChange?.(wordIndex, text)}
                  autoFocus={isInputMode && wordIndex === 0}
                  onSubmitEditing={() => focusNextInput(wordIndex)}
                />
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
  );
}