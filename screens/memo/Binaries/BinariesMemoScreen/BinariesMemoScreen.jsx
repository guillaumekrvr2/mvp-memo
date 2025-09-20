// screens/memo/Binaries/NumbersMemoScreen.jsx
import React, { useState, useRef } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Platform } from 'react-native'
import useAutoAdvance from '../../../../hooks/useAutoAdvance.js'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader.jsx'
import BinariesHighlightBox from '../../../../components/atoms/Commons/BinariesHighlightBox/BinariesHighlightBox.jsx'
import ChevronButton from '../../../../components/atoms/Commons/ChevronButton/ChevronButton.jsx'
import BorderedContainer from '../../../../components/atoms/Commons/BorderedContainer/BorderedContainer.jsx'
import Grid  from '../../../../components/atoms/Numbers/Grid/Grid.jsx'
import useBinaries from '../../../../hooks/Binaries/useBinaries.js'
import useTimer         from '../../../../hooks/useTimer.js'
import useGrid          from '../../../../hooks/useGrid.js'
import useAutoScroll    from '../../../../hooks/useAutoScroll.js'
import { cellStyles } from '../../../../components/atoms/Numbers/Grid/styles.js';

export default function BinaryMemoScreen({ route, navigation }) {
  const { objectif, temps, variant, digitCount, autoAdvance, discipline, mode, modeVariantId, columns, rows: matrixRows } = route.params // routes
  const binaries = useBinaries(objectif) // Génération des chiffres binaires (0 et 1)
  const totalTime     = parseInt(temps, 10) || 0 // Chrono
  const [timeLeft]    = useTimer(totalTime) 
  const cols = 6 //génération de la grille
  // Pour les binaires, le grouping est défini par la matrice columns x rows
  const binaryGrouping = (columns && matrixRows) ? columns * matrixRows : digitCount || 6 // fallback
  const grouping = binaryGrouping
  const { rows, highlightIndex, setHighlightIndex, maxIndex, highlightDigits, totalGroups } =
  useGrid(binaries, 6, binaryGrouping)
  const scrollRef     = useRef(null) //autodéfilement de la grille 
  const [scrollH, setH] = useState(0)
  // Calcul de la ligne où commence le groupe pour l'auto-scroll
  const groupStartLine = Math.floor((highlightIndex * binaryGrouping) / cols)
  useAutoScroll(scrollRef, scrollH, groupStartLine, 48 + 12)
  useAutoAdvance(autoAdvance, totalTime, totalGroups, setHighlightIndex) //  Hook d'auto-advance

  // Container conditionnel comme NumbersMemoScreen
  const Container = Platform.OS === 'ios' ? View : SafeAreaView;

  return (
  <Container style={styles.container}>
    {/* HEADER */}
    <MemorizationHeader
      onBack={() => navigation.popToTop()}
      onDone={() => navigation.replace('BinaryRecall', { objectif, temps, binaries, variant, discipline, mode, modeVariantId })}
      duration={totalTime}
    />

    {/* CONTENU PRINCIPAL avec espacement équitable */}
    <View style={styles.mainContent}>
      {/* HIGHLIGHT BOX */}
      <BinariesHighlightBox text={highlightDigits} columns={columns} rows={matrixRows} />

      {/* GRILLE */}
      <BorderedContainer onLayout={e => setH(e.nativeEvent.layout.height)}>
        <Grid
          data={rows}
          cols={cols}
          scrollRef={scrollRef}
          renderCell={(n, rowIdx, colIdx) => {
          const globalIdx = rowIdx * cols + colIdx;
          const groupStart = highlightIndex * binaryGrouping;
          const groupEnd = groupStart + binaryGrouping;
          
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
          onLongPress={() => setHighlightIndex(0)} // Long press → retour au début
        />
        <ChevronButton
          direction="right"
          onPress={() => setHighlightIndex(i => Math.min(maxIndex, i + 1))}
        />
      </View>
    </View>
  </Container>
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