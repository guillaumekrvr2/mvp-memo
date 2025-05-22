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

  // 1) Mode and parameters
  const [mode, setMode] = useState('memory-league')
  const [objectif, setObjectif] = useState('')
  const [temps, setTemps] = useState(60)

  // 2) Retrieve record per mode
  const allNumRecs = current?.records?.numbers || {}
  const discRec    = allNumRecs[mode] || { score: 0, time: 0 }

  // 3) Local state for display
  const [lastScore, setLastScore] = useState(discRec.score)
  const [lastTime, setLastTime]   = useState(discRec.time)

  // 4) Handle mode change
  const onModeChange = (value) => {
    setMode(value)
    if (value === 'iam') setTemps(300)
    else if (value === 'memory-league') setTemps(60)
    else setTemps(0)
  }

  // 5) Sync record on focus and when discRec changes
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

        {/* Mode Picker */}
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

        {/* Objective & Time Row */}
        <View style={styles.row}>
          {/* Objective Input */}
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

          {/* Time Selector / Static for Memory League and IAM, Input for Custom */}
          {mode === 'memory-league' ? (
            <View style={styles.staticTimeBox}>
              <Text style={styles.staticTime}>1 minute</Text>
            </View>
          ) : mode === 'iam' ? (
            <View style={styles.staticTimeBox}>
              <Text style={styles.staticTime}>5 minutes</Text>
            </View>
          ) : (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Temps (s)"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                value={temps > 0 ? String(temps) : ''}
                onChangeText={text => setTemps(parseInt(text, 10) || 0)}
              />
            </View>
          )}
        </View>

        {/* Record Box - hidden in custom mode */}
        <View style={styles.recordBox}>
  <Ionicons
    name="trophy-outline"
    size={20}
    color={mode === 'custom' ? 'transparent' : '#fff'}
  />
  <Text
    style={[
      styles.recordText,
      mode === 'custom' && { color: 'transparent' }
    ]}
  >
    Last best : {lastScore} en {lastTime}s
  </Text>
</View>

        {/* Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            Vibration.vibrate(100)
            navigation.navigate('Decompte', { objectif: parseInt(objectif, 10), temps, mode })
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
  paramBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 20, padding: 20, justifyContent: 'space-between', marginBottom: 20 },
  paramText: { color: '#fff', fontSize: 28, fontWeight: '600' },
  dropdown: { borderWidth: 1, borderColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  picker: { height: 50, color: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  inputBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  input: { paddingHorizontal: 16, color: '#fff', fontSize: 16, textAlignVertical: 'center', alignItems: 'center'},
  staticTimeBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  staticTime: { color: '#fff', fontSize: 16 },
  recordBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 12, marginBottom: 30, alignSelf: 'center'},
  recordText: {alignItems: 'center', color: '#fff', fontSize: 16, marginLeft: 8 },
  playButton: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 30 },
  playText: { fontSize: 24, fontWeight: '700', color: '#000' },
  learnMore: { alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#fff', borderRadius: 20 },
  learnMoreText: { color: '#000', fontSize: 16, fontWeight: '600' }
})
