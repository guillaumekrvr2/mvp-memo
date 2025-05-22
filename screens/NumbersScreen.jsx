// screens/NumbersScreen.jsx
import React, { useState, useContext, useCallback } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { Vibration } from 'react-native'
import { AccountContext } from '../contexts/AccountContext'

export default function NumbersScreen() {
  const navigation = useNavigation()
  const { current } = useContext(AccountContext)
  const discRec = current?.records?.numbers || { score: 0, time: 0 }

  const [mode, setMode] = useState('memory-league')
  const [objectif, setObjectif] = useState('')
  const [temps, setTemps] = useState(60)
  const [lastScore, setLastScore] = useState(discRec.score)
  const [lastTime, setLastTime] = useState(discRec.time)

  // Handler de changement de mode + temps par défaut
  const onModeChange = (value) => {
    setMode(value)
    // default temps: 300 for IAM, 60 for Memory League, empty for custom
    if (value === 'iam') setTemps(300)
    else if (value === 'memory-league') setTemps(60)
    else setTemps(0)
  }

  // Met à jour l'affichage du record à chaque focus
  useFocusEffect(
    useCallback(() => {
      setLastScore(discRec.score)
      setLastTime(discRec.time)
    }, [discRec.score, discRec.time])
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Param Box */}
        <View style={styles.paramBox}>
          <Text style={styles.paramText}>123456</Text>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </View>

        {/* Mode Dropdown */}
        <View style={styles.dropdown}>
          <Picker
            selectedValue={mode}
            onValueChange={onModeChange}
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Memory League" value="memory-league" />
            <Picker.Item label="IAM" value="iam" />
            <Picker.Item label="Personnalisé" value="custom" />
          </Picker>
        </View>

        {/* Objectif & Temps */}
        <View style={styles.row}>
          {/* Objectif */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Objectif"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              value={objectif}
              onChangeText={setObjectif}
            />
          </View>

          {/* Temps selon mode */}
          {mode === 'memory-league' ? (
            <View style={styles.staticTimeBox}>
              <Text style={styles.staticTime}>1 minute</Text>
            </View>
          ) : mode === 'custom' ? (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Temps (s)"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                value={temps > 0 ? temps.toString() : ''}
                onChangeText={text => {
                  const num = parseInt(text, 10)
                  setTemps(isNaN(num) ? 0 : num)
                }}
              />
            </View>
          ) : (
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={temps}
                onValueChange={value => setTemps(value)}
                style={styles.pickerSmall}
                dropdownIconColor="#fff"
              >
                <Picker.Item key="iam-5" label="5 minutes" value={300} />
                <Picker.Item key="iam-15" label="15 minutes" value={900} />
              </Picker>
            </View>
          )}
        </View>

        {/* Record Box */}
        <View style={styles.recordBox}>
          <Ionicons name="trophy-outline" size={20} color="#fff" />
          <Text style={styles.recordText}>
            Last best : {lastScore} en {lastTime}s
          </Text>
        </View>

        {/* Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            Vibration.vibrate(100)
            navigation.navigate('Decompte', {
              objectif: parseInt(objectif, 10),
              temps: temps
            })
          }}
        >
          <Text style={styles.playText}>PLAY</Text>
        </TouchableOpacity>

        {/* Learn More */}
        <TouchableOpacity style={styles.learnMore}>
          <Text style={styles.learnMoreText}>Learn more</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  paramBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 20, paddingVertical: 20, paddingHorizontal: 24, justifyContent: 'space-between', marginBottom: 20 },
  paramText: { color: '#fff', fontSize: 28, fontWeight: '600' },
  dropdown: { borderWidth: 1, borderColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  picker: { height: 50, color: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  inputBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, marginRight: 10 },
  input: { paddingVertical: 12, paddingHorizontal: 16, color: '#fff', fontSize: 16 },
  staticTimeBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  staticTime: { color: '#fff', fontSize: 16 },
  pickerBox: { flex: 1, borderWidth: 1, borderColor: '#fff', borderRadius: 16, overflow: 'hidden' },
  pickerSmall: { height: 50, color: '#fff', textAlign: 'center' },
  recordBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 20, marginBottom: 30 },
  recordText: { color: '#fff', fontSize: 16, marginLeft: 8 },
  playButton: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 30 },
  playText: { fontSize: 24, fontWeight: '700', color: '#000' },
  learnMore: { alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#fff', borderRadius: 20 },
  learnMoreText: { color: '#000', fontSize: 16, fontWeight: '600' }
})
