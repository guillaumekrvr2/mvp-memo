// screens/MemoScreen.jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'
import useAutoAdvance from '../../hooks/useAutoAdvance'
import MemorizationHeader from '../../components/molecules/MemorizationHeader/MemorizationHeader.jsx'
import HighlightBox from '../../components/atoms/HighlightBox/HighlightBox.jsx'
import ChevronButton from '../../components/atoms/ChevronButton/ChevronButton'
import BorderedContainer from '../../components/atoms/BorderedContainer/BorderedContainer'
import Grid  from '../../components/atoms/Grid/Grid'
import useNumbers from '../../hooks/useNumbers'
import useTimer         from '../../hooks/useTimer'
import useGrid          from '../../hooks/useGrid'
import useAutoScroll    from '../../hooks/useAutoScroll'

export default function MemoScreen({ route, navigation }) {
  const { objectif, temps, mode, digitCount, autoAdvance } = route.params // routes
  const numbers = useNumbers(objectif) // Génération des chiffres
  const totalTime     = parseInt(temps, 10) || 0 // Chrono
  const [timeLeft]    = useTimer(totalTime)

  const cols = 6
  const grouping = digitCount
  const { rows, highlightIndex, setHighlightIndex, maxIndex, highlightDigits, totalGroups } =
  useGrid(numbers, 6, digitCount)

  const scrollRef     = useRef(null) //autodéfilement de la grille 
  const [scrollH, setH] = useState(0)
  useAutoScroll(scrollRef, scrollH, highlightIndex, 48 + 12)
  
  useAutoAdvance(autoAdvance, totalTime, totalGroups, setHighlightIndex) //  Hook d'auto-advance

  const scrollViewRef = useRef(null) // Scroll auto conditionnel
  const [scrollHeight, setScrollHeight] = useState(0)
  const ROW_HEIGHT = 48 + 12

  useEffect(() => {
    if (!scrollViewRef.current || scrollHeight === 0) return
    const visibleCount = Math.floor(scrollHeight / ROW_HEIGHT)
    const threshold = Math.max(0, visibleCount - 3)
    if (highlightIndex >= threshold) {
      const offset = (highlightIndex - threshold) * ROW_HEIGHT
      scrollViewRef.current.scrollTo({ y: offset, animated: true })
    }
  }, [highlightIndex, scrollHeight])

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={() => navigation.replace('Recall', { objectif, temps, numbers, mode })}
        duration={totalTime}
      />

    {/* HIGHLIGHT BOX */}
      <HighlightBox text={highlightDigits} />

      {/* GRILLE */}
      <BorderedContainer onLayout={e => setH(e.nativeEvent.layout.height)}>
        <Grid
          data={rows}
          cols={cols}
          scrollRef={scrollRef}
          renderCell={(n, rowIdx, colIdx) => {
            const globalIdx = rowIdx * cols + colIdx
            const isHighlighted =
              globalIdx >= highlightIndex * grouping &&
              globalIdx < highlightIndex * grouping + grouping

            return (
              <View
                key={`r${rowIdx}-c${colIdx}`}
                style={[
                  styles.cell,
                  colIdx < cols - 1 && styles.separator,
                  isHighlighted && styles.highlightCell,
                ]}
              >
                <Text style={styles.cellText}>{n}</Text>
              </View>
            )
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
  controls: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }
})
