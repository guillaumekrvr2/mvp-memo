// screens/NumbersScreen.jsx
import React, { useState, useCallback } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

export default function NumbersScreen() {
  const navigation = useNavigation()

  const [lastScore, setLastScore] = useState(0)
  const [lastTime, setLastTime] = useState(null)
  const [objectif, setObjectif] = useState('')
  const [temps, setTemps] = useState('')

  useFocusEffect(
    useCallback(() => {
      const loadLastRecord = async () => {
        try {
          const json = await AsyncStorage.getItem('lastRecord')
          if (json) {
            const { score, temps } = JSON.parse(json)
            setLastScore(score)
            setLastTime(temps)
          }
        } catch (e) {
          console.error('Erreur lecture lastRecord', e)
        }
      }
      loadLastRecord()
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <View style={styles.paramBox}>
          <Text style={styles.paramText}>123456</Text>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </View>

        <View style={styles.recordRow}>
          <Text style={styles.recordLabel}>Record :</Text>
          <Ionicons name="trophy-outline" size={20} color="#fff" />
          <Text style={styles.recordValue}>
            {lastScore} nombres en {lastTime || '0'} secondes
          </Text>
        </View>

        {/* 3) Objectif */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Objectif</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de chiffres"
            placeholderTextColor="#666"
            keyboardType="number-pad"
            value={objectif}
            onChangeText={setObjectif}
          />
        </View>

        {/* 4) Temps */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Temps (s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Secondes"
            placeholderTextColor="#666"
            keyboardType="number-pad"
            value={temps}
            onChangeText={setTemps}
          />
        </View>

        {/* 5) Bouton Play */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={() =>
            navigation.navigate('Decompte', {
              objectif: parseInt(objectif, 10),
              temps: parseInt(temps, 10)
            })
          }
        >
          <Ionicons name="play-circle-outline" size={48} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15
  },
  paramBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between'
  },
  paramText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24
  },
  recordLabel: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8
  },
  recordValue: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8
  },
  inputRow: {
    marginTop: 30
  },
  inputLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#fff',
    fontSize: 16
  },
  playButton: {
    marginTop: 40,
    alignItems: 'center'
  }
})
