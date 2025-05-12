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

  //  Auto‐navigation vers RecallScreen quand le temps est écoulé
  useEffect(() => {
     if (timeLeft <= 0) {
       navigation.replace('Recall', { objectif, temps, numbers })
      }
    }, [timeLeft, navigation, objectif, temps, numbers])

  // 3) Highlight par rangée
  const [highlightRow, setHighlightRow] = useState(0)
  const total = numbers.length
  const cols = 6

  // 4) Construction des lignes de 6
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(numbers.slice(i, i + cols))
  }

  // 5) Texte de la carte highlight
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

  // 7) Scroll auto conditionnel
  const scrollViewRef = useRef(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  const ROW_HEIGHT = 48 + 12 // hauteur cellule + marginBottom

useEffect(() => {
    if (!scrollViewRef.current || scrollHeight === 0) return

    const visibleCount = Math.floor(scrollHeight / ROW_HEIGHT)
    // on déclenche quand highlightRow atteint la 2e avant-dernière ligne visible
    const threshold = Math.max(0, visibleCount - 3)
    if (highlightRow >= threshold) {
        // on fait défiler de (highlightRow - threshold) lignes
        const offset = (highlightRow - threshold) * ROW_HEIGHT
        scrollViewRef.current.scrollTo({ y: offset, animated: true })
    }
    }, [highlightRow, scrollHeight])

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
        <TouchableOpacity
          onPress={() => navigation.replace('Recall', { objectif, temps, numbers })}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* HIGHLIGHT CARD */}
      <View style={styles.highlightCard}>
        <Text style={styles.highlightCardText}>{highlightDigits}</Text>
      </View>

      {/* GRILLE */}
      <View style={styles.gridContainer} onLayout={e => setScrollHeight(e.nativeEvent.layout.height)}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
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
      </View>

      {/* CONTRÔLES DU HIGHLIGHT */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() =>
            setHighlightRow(prev => (prev > 0 ? prev - 1 : 0))
          }
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}  // ← ajoutez ceci
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back-circle" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const maxRow = Math.floor((total - 1) / cols)
            setHighlightRow(prev => (prev < maxRow ? prev + 1 : prev))
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}  // ← et ici
          activeOpacity={0.7}
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
  gridContainer: {
    // 75% de la largeur de l’écran, 60% de sa hauteur
    width: '75%',
    height: '60%',
    // centré horizontalement et verticalement
    alignSelf: 'center',
    marginVertical: 16,  
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    verflow: 'hidden',
    paddingVertical: 8
    },
  scroll: {
    paddingHorizontal: 12,
    paddingTop: 16,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8, 
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  separator: {
    borderRightWidth: 1,
    borderRightColor: '#444'
  },
  highlightRow: {
    borderBottomColor: '#fff'
  },
  cell: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cellText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },

  // --- CONTROLES ---
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16
  }
})
