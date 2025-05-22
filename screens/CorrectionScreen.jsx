// screens/CorrectionScreen.jsx
import React, { useState, useContext } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native'
import { AccountContext } from '../contexts/AccountContext'

export default function CorrectionScreen({ route, navigation }) {
  // 1) Récupération des params, incluant maintenant `mode`
  const { inputs, numbers, temps, mode } = route.params
  const total = inputs.length
  const cols = 6

  // 2) Contexte et état local pour révéler les bonnes réponses
  const { updateRecord, current } = useContext(AccountContext)
  const [revealed, setRevealed] = useState(new Set())

  // 3) Préparation de la grille
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(inputs.slice(i, i + cols))
  }

  // 4) Calcul du score
  const score = inputs.reduce(
    (acc, val, idx) => acc + (val === String(numbers[idx]) ? 1 : 0),
    0
  )

  // 5) Fonction de sauvegarde avec logs de debug
  const saveRecord = async () => {
    console.log('[CorrectionScreen] saveRecord called with:', { mode, score, time: temps })
    try {
      await updateRecord('numbers', { mode, score, time: temps })
      // Affiche l'état actuel des records pour vérification
      console.log('[CorrectionScreen] current.records.numbers:', current.records?.numbers)
      const saved = current.records?.numbers?.[mode]
      Alert.alert(
        'Record sauvegardé',
        `Mode: ${mode}\nScore: ${saved?.score || score}\nTemps: ${saved?.time || temps}s`
      )
    } catch (e) {
      console.error('Erreur sauvegarde record', e)
      Alert.alert('Erreur', "Impossible de sauvegarder le record.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridContainer}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {rows.map((row, rIdx) => (
            <View key={rIdx} style={styles.row}>
              {row.map((val, cIdx) => {
                const idx = rIdx * cols + cIdx
                const correct = String(numbers[idx])
                const isCorrect = val === correct
                const isRevealed = revealed.has(idx)
                const display = isCorrect ? correct : isRevealed ? correct : val
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.cell,
                      cIdx < cols - 1 && styles.separator,
                      !isCorrect && styles.wrongCell
                    ]}
                    disabled={isCorrect}
                    onPress={() => !isCorrect && setRevealed(prev => new Set(prev).add(idx))}
                  >
                    <Text style={[styles.cellText, !isCorrect && styles.wrongText]}> {display} </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.scoreText}>Score : {score} / {total}</Text>

      {/* Bouton d'enregistrement */}
      <TouchableOpacity style={styles.recordButton} onPress={saveRecord}>
        <Text style={styles.recordButtonText}>Enregistrer comme record</Text>
      </TouchableOpacity>

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
  recordButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center'
  },
  recordButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  retryButton: {
    marginTop: 12,
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
