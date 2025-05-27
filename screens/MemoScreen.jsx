// screens/MemoScreen.jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import useAutoAdvance from '../hooks/useAutoAdvance'

export default function MemoScreen({ route, navigation }) {
  const { objectif, temps, number, mode, digitCount, autoAdvance } = route.params

  // 1) Génération des chiffres
  const [numbers, setNumbers] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: objectif }, () =>
      Math.floor(Math.random() * 10)
    )
    setNumbers(arr)
  }, [objectif])

  // 2) Chrono
  const totalTime = parseInt(temps, 10) || 0
  const [timeLeft, setTimeLeft] = useState(totalTime)
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  // Auto-navigation vers RecallScreen quand le temps est écoulé
  useEffect(() => {
    const navTimer = setTimeout(() => {
      navigation.replace('Recall', { objectif, temps, numbers, mode })
    }, totalTime * 1000)
    return () => clearTimeout(navTimer)
  }, [totalTime])

  // 3) Highlight par groupe
  const grouping = digitCount
  const cols = 6
  const total = numbers.length
  const maxGroupIndex = Math.ceil(total / grouping) - 1
  const [highlightIndex, setHighlightIndex] = useState(0)

  // 4) Construction des lignes
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(numbers.slice(i, i + cols))
  }
  const stepsCount = Math.ceil(total / grouping)

  // 5) Hook d'auto-advance
  useAutoAdvance(autoAdvance, totalTime, stepsCount, setHighlightIndex)

  // 6) Texte de la carte highlight
  const highlightDigits = numbers
    .slice(highlightIndex * grouping, highlightIndex * grouping + grouping)
    .join('')

  // 7) Animation continue de la barre
  const animProgress = useRef(new Animated.Value(0)).current
  useEffect(() => {
    animProgress.setValue(0)
    Animated.timing(animProgress, {
      toValue: 1,
      duration: totalTime * 1000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }, [totalTime])

  // 8) Scroll auto conditionnel
  const scrollViewRef = useRef(null)
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: animProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }
            ]}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.replace('Recall', { objectif, temps, numbers, mode })}>
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* HIGHLIGHT CARD */}
      <View style={styles.highlightCard}>
        <Text style={styles.highlightCardText}>{highlightDigits}</Text>
      </View>

      {/* GRILLE */}
      <View style={styles.gridContainer} onLayout={e => setScrollHeight(e.nativeEvent.layout.height)}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {rows.map((row, idx) => (
            <View key={idx} style={styles.row}>
              {row.map((n, colIdx) => {
                const globalIdx = idx * cols + colIdx
                const start = highlightIndex * grouping
                const end = start + grouping
                const isHighlighted = globalIdx >= start && globalIdx < end
                return (
                  <View key={colIdx} style={[styles.cell, colIdx < cols - 1 && styles.separator, isHighlighted && styles.highlightCell]}>  
                    <Text style={styles.cellText}>{n}</Text>
                  </View>
                )
              })}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* CONTRÔLES */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setHighlightIndex(i => Math.max(0, i - 1))} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back-circle" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHighlightIndex(i => Math.min(maxGroupIndex, i + 1))} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-forward-circle" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { marginTop: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, justifyContent: 'space-between' },
  progressContainer: { flex: 1, height: 4, backgroundColor: '#333', borderRadius: 2, overflow: 'hidden', marginHorizontal: 12 },
  progressBar: { height: '100%', backgroundColor: '#fff' },
  done: { color: '#fff', fontSize: 16, fontWeight: '600' },
  highlightCard: { alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20, borderWidth: 1, borderColor: '#fff', marginVertical: 16 },
  highlightCardText: { color: '#fff', fontSize: 24, fontWeight: '600' },
  gridContainer: { width: '75%', height: '60%', alignSelf: 'center', marginVertical: 16, borderWidth: 1, borderColor: '#fff', borderRadius: 25, overflow: 'hidden', paddingVertical: 8 },
  scroll: { paddingHorizontal: 12, paddingTop: 16, alignItems: 'center' },
  row: { flexDirection: 'row', marginBottom: 8, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  cell: { width: 42, height: 42, justifyContent: 'center', alignItems: 'center' },
  cellText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  highlightCell: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4 },
  controls: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }
})
