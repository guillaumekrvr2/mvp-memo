// screens/DecompteScreen.jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { theme } from '../../theme'

export default function DecompteScreen({ route, navigation }) {
  const { objectif, temps, mode , digitCount, autoAdvance} = route.params
  const [counter, setCounter] = useState(3)

  useEffect(() => {
    if (counter <= 0) {
      // Une fois à zéro, on navigue vers l’écran de mémorisation
      navigation.replace('Memorisation', { objectif, temps, mode, digitCount, autoAdvance})
      return
    }
    const id = setTimeout(() => setCounter(counter - 1), 1000)
    return () => clearTimeout(id)
  }, [counter])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.counterText}>{counter}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  counterText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold'
  }
})
