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

export default function MemoScreen({ route, navigation }) {
  const { objectif, temps } = route.params

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
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  // 3) Highlight par rangée
  const [highlightRow, setHighlightRow] = useState(0)
  const total = numbers.length
  const cols = 6

  // 4) Construction des lignes de 6
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(numbers.slice(i, i + cols))
  }

  // 5) Chaine pour la highlight card
  const highlightDigits = rows[highlightRow]?.join('') || ''

  // 6) Animation continue de la barre
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

  // 7) Scroll automatique pour garder la rangée visible
  const scrollViewRef = useRef(null)
  const ROW_HEIGHT = 48 + 12  // cell height + marginBottom
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: highlightRow * ROW_HEIGHT,
        animated: true
      })
    }
  }, [highlightRow])

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER : Back + Barre + Done */}
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

        <TouchableOpacity
          onPress={() => navigation.replace('Recall', { objectif, temps })}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* HIGHLIGHT CARD */}
      <View style={styles.highlightCard}>
        <Text style={styles.highlightCardText}>
          {highlightDigits}
        </Text>
      </View>

      {/* GRILLE */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scroll}
      >
        {rows.map((row, rowIdx) => (
          <View
            key={rowIdx}
            style={[
              styles.row,
              rowIdx === highlightRow && styles.highlightRow
            ]}
          >
            {row.map((n, colIdx) => (
              <View
                key={colIdx}
                style={[
                  styles.cell,
                  colIdx < cols - 1 && styles.separator
                ]}
              >
                <Text style={styles.cellText}>{n}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* CONTRÔLES DU HIGHLIGHT */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() =>
            setHighlightRow(prev => (prev > 0 ? prev - 1 : 0))
          }
        >
          <Ionicons name="chevron-back-circle" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const maxRow = Math.floor((total - 1) / cols)
            setHighlightRow(prev => (prev < maxRow ? prev + 1 : prev))
          }}
        >
          <Ionicons name="chevron-forward-circle" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  // --- HEADER ---
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'space-between'
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 12
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff'
  },
  done: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },

  // --- HIGHLIGHT CARD ---
  highlightCard: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 16
  },
  highlightCardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  },

  // --- GRILLE ---
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12
  },
  separator: {
    borderRightWidth: 1,
    borderRightColor: '#444'
  },
  highlightRow: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff'
  },
  cell: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cellText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },

  // --- CONTROLES DE NAVIGATION DE HIGHLIGHT ---
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16
  }
})
