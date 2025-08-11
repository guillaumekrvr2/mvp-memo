// screens/MemoScreen.jsx
import React, { useState, useRef } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import useAutoAdvance from '../../../hooks/useAutoAdvance.js'
import MemorizationHeader from '../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader.jsx'
import HighlightBox from '../../../components/atoms/Commons/HighlightBox/HighlightBox.jsx'
import ChevronButton from '../../../components/atoms/Commons/ChevronButton/ChevronButton.jsx'
import BorderedContainer from '../../../components/atoms/Commons/BorderedContainer/BorderedContainer.jsx'
import Grid  from '../../../components/atoms/Numbers/Grid/Grid.jsx'
import useNumbers from '../../../hooks/useNumbers.js'
import useTimer         from '../../../hooks/useTimer.js'
import useGrid          from '../../../hooks/useGrid.js'
import useAutoScroll    from '../../../hooks/useAutoScroll.js'
import { cellStyles } from '../../../components/atoms/Numbers/Grid/styles.js';

export default function MemoScreen({ route, navigation }) {
  const { objectif, temps, variant, digitCount, autoAdvance } = route.params // routes
  const numbers = useNumbers(objectif) // Génération des chiffres
  const totalTime     = parseInt(temps, 10) || 0 // Chrono
  const [timeLeft]    = useTimer(totalTime) 
  const cols = 6 //génération de la grille 
  const grouping = digitCount
  const { rows, highlightIndex, setHighlightIndex, maxIndex, highlightDigits, totalGroups } =
  useGrid(numbers, 6, digitCount)
  const scrollRef     = useRef(null) //autodéfilement de la grille 
  const [scrollH, setH] = useState(0)
  useAutoScroll(scrollRef, scrollH, highlightIndex, 48 + 12)
  useAutoAdvance(autoAdvance, totalTime, totalGroups, setHighlightIndex) //  Hook d'auto-advance

  return (
  <SafeAreaView style={styles.container}>
    {/* HEADER */}
    <MemorizationHeader
      onBack={() => navigation.goBack()}
      onDone={() => navigation.replace('Recall', { objectif, temps, numbers, variant })}
      duration={totalTime}
    />

    {/* CONTENU PRINCIPAL avec espacement équitable */}
    <View style={styles.mainContent}>
      {/* HIGHLIGHT BOX */}
      <HighlightBox text={highlightDigits} />

      {/* GRILLE */}
      <BorderedContainer onLayout={e => setH(e.nativeEvent.layout.height)}>
        <Grid
          data={rows}
          cols={cols}
          scrollRef={scrollRef}
          renderCell={(n, rowIdx, colIdx) => {
          const globalIdx = rowIdx * cols + colIdx;
          const groupStart = highlightIndex * grouping;
          const groupEnd = groupStart + grouping;
          
          const isInGroup = globalIdx >= groupStart && globalIdx < groupEnd;
          // Suppression de isMainHighlight - maintenant tout le groupe a le même style

          return (
            <View
              key={`r${rowIdx}-c${colIdx}`}
              style={[
                cellStyles.cell,
                isInGroup && cellStyles.highlightCell // Tout le groupe a le style highlight
              ]}
            >
              <Text style={isInGroup ? cellStyles.highlightCellText : cellStyles.cellText}>
                {n}
              </Text>
            </View>
          );
        }}
        />
      </BorderedContainer>

      {/* CONTRÔLES */}
      <View style={styles.controls}>
        <ChevronButton
          direction="left"
          onPress={() => setHighlightIndex(i => Math.max(0, i - 1))}
        />
        <ChevronButton
          direction="right"
          onPress={() => setHighlightIndex(i => Math.min(maxIndex, i + 1))}
        />
      </View>
    </View>
  </SafeAreaView>
)
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { paddingHorizontal: 12, paddingTop: 16, alignItems: 'center' },
  row: { flexDirection: 'row', marginBottom: 8, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  cell: { width: 42, height: 42, justifyContent: 'center', alignItems: 'center' },
  cellText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  highlightCell: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4 },
    mainContent: {
    flex: 1,
    justifyContent: 'space-between', // Espacement équitable entre les 3 éléments
    alignItems: 'center', // Centrage horizontal
    paddingVertical: 20, // Un peu de padding en haut et bas
  },
    controls: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', // Pour que les chevrons utilisent toute la largeur
  }
})
