// screens/MemoScreen.jsx
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function MemoScreen({ route, navigation }) {
  const { objectif, temps } = route.params

  // Génération des chiffres à mémoriser
  const [numbers, setNumbers] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: objectif }, () =>
      Math.floor(Math.random() * 10)
    )
    setNumbers(arr)
  }, [])

  // Chrono
  const [timeLeft, setTimeLeft] = useState(parseInt(temps, 10) || 0)
  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  // Highlight index
  const [highlightIndex, setHighlightIndex] = useState(0)
  const total = numbers.length

  // Groupement en lignes de 6
  const cols = 6
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(numbers.slice(i, i + cols))
  }

  // Barre de progression (pourcentage)
  const progress = total > 0 ? (objectif - timeLeft) / objectif : 0

  return (

  <SafeAreaView style={styles.container}>
    {/* 1) HeaderControls : uniquement Back + Done */}
    <View style={styles.headerControls}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
       <Ionicons name="chevron-back-outline" size={28} color="#fff" />
     </TouchableOpacity>
     <TouchableOpacity onPress={() => navigation.replace('Recall', { objectif, temps })}>
      <Text style={styles.done}>Done</Text>
     </TouchableOpacity>
    </View>

    {/* 2) ProgressBar à part, 4px de haut */}
    <View style={styles.progressContainer}>
      <View
        style={[
          styles.progressBar,
          { width: `${((objectif - timeLeft) / objectif) * 100}%` }
        ]}
      />
    </View>

      {/* Grille */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {rows.map((row, rowIdx) => (
          <View style={styles.row} key={rowIdx}>
            {row.map((n, colIdx) => {
              const idx = rowIdx * cols + colIdx
              const isHighlighted = idx === highlightIndex
              return (
                <View
                  key={colIdx}
                  style={[
                    styles.cell,
                    colIdx < cols - 1 && styles.separator,
                    isHighlighted && styles.highlight
                  ]}
                >
                  <Text style={styles.cellText}>{n}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </ScrollView>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() =>
            setHighlightIndex(prev => (prev > 0 ? prev - 1 : 0))
          }
        >
          <Ionicons name="chevron-back-circle" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setHighlightIndex(prev => (prev < total - 1 ? prev + 1 : prev))
          }
        >
          <Ionicons name="chevron-forward-circle" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  // Ligne de contrôles (Back / Done)
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 12
  },
    // plein de la barre
  progressBar: {
    height: '100%',
    backgroundColor: '#fff'
  }, 
  done: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12
  },
  cell: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    borderRightWidth: 1,
    borderRightColor: '#444'
  },
  highlight: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff'
  },
  cellText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16
  }
})
