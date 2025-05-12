// screens/RecallScreen.jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function RecallScreen({ route, navigation }) {
  const { objectif, numbers, temps } = route.params
  const total = objectif
  const cols = 6

  // 1) Crée un ref pour chaque input
  const inputRefs = useRef([])
  if (inputRefs.current.length !== total) {
    inputRefs.current = Array(total)
      .fill()
      .map(() => React.createRef())
  }

  // 2) États des inputs
  const [inputs, setInputs] = useState(Array(total).fill(''))

  // 3) Chrono de 4 minutes
  const totalTime = 4 * 60
  const [timeLeft, setTimeLeft] = useState(totalTime)
  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  // 4) Barre animée
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

  // 5) Construction des rangées
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(inputs.slice(i, i + cols))
  }

  // 6) Gestion de la saisie et focus auto
  const handleChange = (text, idx) => {
    const clean = text.replace(/[^0-9]/g, '')
    const newInputs = [...inputs]
    newInputs[idx] = clean
    setInputs(newInputs)

    // focus vers l’input suivant
    if (clean.length > 0 && idx + 1 < total) {
      const nextRef = inputRefs.current[idx + 1]
      nextRef.current && nextRef.current.focus()
    }
  }

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
        <View style={{ width: 28 }} />
      </View>

      {/* GRILLE D’INPUTS */}
      <View style={styles.gridContainer}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {rows.map((row, rIdx) => (
            <View key={rIdx} style={styles.row}>
              {row.map((val, cIdx) => {
                const idx = rIdx * cols + cIdx
                return (
                  <TextInput
                    ref={inputRefs.current[idx]}
                    key={idx}
                    style={[
                      styles.cellInput,
                      cIdx < cols - 1 && styles.separator
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={val}
                    onChangeText={text => handleChange(text, idx)}
                    onKeyPress={({ nativeEvent }) => {
                      if (
                        nativeEvent.key === 'Backspace' &&
                        inputs[idx] === '' &&
                        idx > 0
                      ) {
                        const prevRef = inputRefs.current[idx - 1]
                        prevRef.current && prevRef.current.focus()
                      }
                    }}
                  />
                )
              })}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* BOUTON VALIDER */}
      <TouchableOpacity
        style={styles.validateButton}
        onPress={() =>
          navigation.navigate('Correction', { inputs, numbers, temps })
        }
      >
        <Text style={styles.validateText}>Valider</Text>
      </TouchableOpacity>
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

  // --- GRILLE CADRÉE ---
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
  cellInput: {
    width: 42,
    height: 42,
    backgroundColor: '#111',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },

  // --- BOUTON VALIDER ---
  validateButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  validateText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16
  }
})
