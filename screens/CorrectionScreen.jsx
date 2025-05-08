// screens/CorrectionScreen.jsx
import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'

export default function CorrectionScreen({ route, navigation }) {
  const { inputs, numbers } = route.params
  const total = inputs.length
  const cols = 6

  // 1) State pour savoir quelles cases ont déjà révélé la bonne valeur
  const [revealed, setRevealed] = useState(new Set())

  // 2) Construction des rangées
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(inputs.slice(i, i + cols))
  }

  // 3) Calcul du score
  const score = inputs.reduce(
    (acc, val, idx) => acc + (val === String(numbers[idx]) ? 1 : 0),
    0
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* GRILLE DE CORRECTION */}
      <View style={styles.gridContainer}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {rows.map((row, rIdx) => (
            <View key={rIdx} style={styles.row}>
              {row.map((val, cIdx) => {
                const idx = rIdx * cols + cIdx
                const correct = String(numbers[idx])
                const isCorrect = val === correct
                const isRevealed = revealed.has(idx)
                const display = isCorrect
                  ? correct
                  : isRevealed
                  ? correct
                  : val

                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.cell,
                      cIdx < cols - 1 && styles.separator,
                      !isCorrect && styles.wrongCell
                    ]}
                    disabled={isCorrect}
                    onPress={() => {
                      if (!isCorrect) {
                        setRevealed(prev => new Set(prev).add(idx))
                      }
                    }}
                  >
                    <Text style={[
                      styles.cellText,
                      !isCorrect && styles.wrongText
                    ]}>
                      {display}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* SCORE */}
      <Text style={styles.scoreText}>
        Score : {score} / {total}
      </Text>

      {/* RETRY */}
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => navigation.navigate('Numbers')}
      >
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 30
  },
  gridContainer: {
    width: '75%',
    height: '60%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 16
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
  cell: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrongCell: {
    backgroundColor: '#333'
  },
  cellText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  wrongText: {
    color: '#888'
  },
  scoreText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  retryText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16
  }
})
