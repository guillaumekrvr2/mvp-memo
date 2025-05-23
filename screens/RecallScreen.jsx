// screens/RecallScreen.jsx
import React, { useEffect, useRef } from 'react'
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
  const { objectif, numbers, temps, mode } = route.params
  const total = objectif
  const cols = 6

  // 1) Refs pour chaque input
  const inputRefs = useRef(
    Array(total).fill().map(() => React.createRef())
  )

  // 2) Stockage des valeurs sans state (uncontrolled)
  const valuesRef = useRef(Array(total).fill(''))

  // 3) Chrono 4 minutes
  const totalTime = 4 * 60
  const [timeLeft, setTimeLeft] = React.useState(totalTime)
  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
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

  // 5) Construction des index en lignes
  const rows = []
  for (let i = 0; i < total; i += cols) {
    rows.push(
      Array(cols).fill().map((_, j) => i + j).filter(idx => idx < total)
    )
  }

  // 6) Saisie & déplacement instantané
  const handleChange = (text, idx) => {
    const clean = text.replace(/[^0-9]/g, '')
    valuesRef.current[idx] = clean
    inputRefs.current[idx].current.setNativeProps({ text: clean })

    if (clean && idx + 1 < total) {
      inputRefs.current[idx + 1].current.focus()
    }
  }

  const handleKeyPress = ({ nativeEvent }, idx) => {
    if (nativeEvent.key === 'Backspace') {
      const prevValue = valuesRef.current[idx]
      // 1) Si case vide ⇒ on remonte
      if (prevValue === '' && idx > 0) {
        // on efface la case précédente avant de focus
        valuesRef.current[idx - 1] = ''
        inputRefs.current[idx - 1].current.setNativeProps({ text: '' })
        inputRefs.current[idx - 1].current.focus()
      }
      // 2) Si elle contenait un chiffre ⇒ on le supprime in-place
      else {
        valuesRef.current[idx] = ''
        inputRefs.current[idx].current.setNativeProps({ text: '' })
      }
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

      {/* GRILLE SANS SÉPARATEURS */}
      <View style={styles.gridContainer}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {rows.map((row, rIdx) => (
            <View key={rIdx} style={styles.row}>
              {row.map(idx => (
                <TextInput
                  key={idx}
                  ref={inputRefs.current[idx]}
                  style={styles.cellInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  defaultValue=""
                  onChangeText={text => handleChange(text, idx)}
                  onKeyPress={e => handleKeyPress(e, idx)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* BOUTON VALIDER */}
      <TouchableOpacity
        style={styles.validateButton}
        onPress={() =>
          navigation.navigate('Correction', {
            inputs: [...valuesRef.current],
            numbers,
            temps,
            mode
          })
        }
      >
        <Text style={styles.validateText}>Valider</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

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
    marginBottom: 8
  },
  cellInput: {
    width: 42,
    height: 42,
    backgroundColor: '#111',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },

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
