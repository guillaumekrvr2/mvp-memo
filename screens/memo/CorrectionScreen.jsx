// Exemple de logique pour CorrectionScreen.jsx
import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

export default function CorrectionScreen({ route, navigation }) {
  const { inputs, numbers, temps, variant } = route.params
  
  // Comparaison simple entre input utilisateur et séquence originale
  const compareResults = () => {
    const results = []
    const userArray = Array.isArray(inputs) ? inputs : inputs.split('')
    const correctArray = numbers.map(n => n.toString())
    
    for (let i = 0; i < numbers.length; i++) {
      results.push({
        position: i + 1,
        userValue: userArray[i] || '',
        correctValue: correctArray[i],
        isCorrect: userArray[i] === correctArray[i]
      })
    }
    
    return results
  }

  const results = compareResults()
  const correctCount = results.filter(r => r.isCorrect).length
  const accuracy = Math.round((correctCount / numbers.length) * 100)

  // Rendu visuel de la grille de correction
  const renderCorrectionGrid = () => {
    const rows = []
    const cols = 6
    
    for (let r = 0; r < Math.ceil(numbers.length / cols); r++) {
      const cells = []
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c
        if (index >= numbers.length) break
        
        const result = results[index]
        cells.push(
          <View
            key={index}
            style={[
              styles.cell,
              result.isCorrect ? styles.cellCorrect : styles.cellError
            ]}
          >
            <Text style={styles.cellUser}>{result.userValue || '?'}</Text>
            <Text style={styles.cellCorrect}>{result.correctValue}</Text>
          </View>
        )
      }
      
      rows.push(
        <View key={`row-${r}`} style={styles.row}>
          {cells}
        </View>
      )
    }
    
    return rows
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* RÉSULTATS */}
      <View style={styles.header}>
        <Text style={styles.title}>Résultats</Text>
        <Text style={styles.score}>
          {correctCount} / {numbers.length} correct
        </Text>
        <Text style={styles.accuracy}>
          Précision : {accuracy}%
        </Text>
      </View>

      {/* GRILLE DE CORRECTION */}
      <View style={styles.gridContainer}>
        {renderCorrectionGrid()}
      </View>

      {/* LÉGENDE */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.cellCorrect]} />
          <Text style={styles.legendText}>Correct</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.cellError]} />
          <Text style={styles.legendText}>Erreur</Text>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  
  score: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 4,
  },
  
  accuracy: {
    fontSize: 16,
    color: '#666',
  },
  
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  
  cell: {
    width: 50,
    height: 50,
    marginHorizontal: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
  cellCorrect: {
    backgroundColor: '#28a745',
    borderColor: '#20c997',
    borderWidth: 1,
  },
  
  cellError: {
    backgroundColor: '#dc3545',
    borderColor: '#fd7e14',
    borderWidth: 1,
  },
  
  cellUser: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  
  legendText: {
    color: '#fff',
    fontSize: 14,
  },
})