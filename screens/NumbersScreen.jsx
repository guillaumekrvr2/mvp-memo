// screens/NumbersScreen.jsx
import React, { useState, useContext, useCallback, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { Vibration } from 'react-native'
import { AccountContext } from '../contexts/AccountContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function NumbersScreen() {
  const navigation = useNavigation()
  const { current } = useContext(AccountContext)

  // 0) Nombre de chiffres et preview
  const [digitCount, setDigitCount] = useState(6)
  const [previewDigits, setPreviewDigits] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  // Générer un aperçu aléatoire de `digitCount` chiffres
  useEffect(() => {
    const arr = Array.from({ length: digitCount }, () =>
      Math.floor(Math.random() * 10)
    )
    setPreviewDigits(arr)
  }, [digitCount])

  // 1) Mode and parameters
  const [mode, setMode] = useState('memory-league')
  const [objectif, setObjectif] = useState('')
  const [temps, setTemps] = useState(60)

  // 1b) Auto-advance flag (persisted)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const STORAGE_KEY = '@numbers_auto_advance'

  // Load persisted switch
  useEffect(() => {
    if (mode === 'custom') {
      AsyncStorage.getItem(STORAGE_KEY).then(value => {
        if (value !== null) setAutoAdvance(value === 'true')
      })
    }
  }, [mode])

  // Persist on toggle
  const onToggleAuto = newValue => {
    setAutoAdvance(newValue)
    AsyncStorage.setItem(STORAGE_KEY, newValue.toString())
  }

  // 2) Retrieve record per mode
  const allNumRecs = current?.records?.numbers || {}
  const discRec = allNumRecs[mode] || { score: 0, time: 0 }

  // 3) Local state for display
  const [lastScore, setLastScore] = useState(discRec.score)
  const [lastTime, setLastTime] = useState(discRec.time)

  // 4) Handle mode change
  const onModeChange = value => {
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

        {/* Param Box – cliquable pour ouvrir la modal */}
        <TouchableOpacity
          style={styles.paramBox}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.paramText}>{previewDigits.join('')}</Text>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Modal de sélection du nombre de chiffres */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <Text style={{ color: '#fff', marginBottom: 8 }}>
                Choisir le nombre de chiffres
              </Text>
              <Picker
                selectedValue={digitCount}
                onValueChange={setDigitCount}
                style={[styles.picker, { width: '100%' }]}
                dropdownIconColor="#fff"
                itemStyle={{ color: '#fff' }}
              >
                {[1,2,3,4,5,6].map(n => (
                  <Picker.Item key={n} label={`${n}`} value={n} />
                ))}
              </Picker>
              <TouchableOpacity
                style={styles.learnMore}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.learnMoreText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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

        {/* Auto-advance Option */}
        {mode === 'custom' && (
          <View style={styles.autoAdvanceRow}>
            <Text style={styles.autoAdvanceLabel}>Auto-advance mode</Text>
            <Switch
              value={autoAdvance}
              onValueChange={onToggleAuto}
              trackColor={{ true: '#fff', false: '#fff' }}
              thumbColor="#fff"
              ios_backgroundColor="#fff"
            />
          </View>
        )}

        {/* Record Box - hidden in custom mode */}
        <View style={styles.recordBox}>
          <Ionicons
            name="trophy-outline"
            size={20}
            color={mode === 'custom' ? 'transparent' : '#fff'}
          />
          <Text
            style={[styles.recordText, mode === 'custom' && { color: 'transparent' }]}
          >
            Last best : {lastScore} en {lastTime}s
          </Text>
        </View>

        {/* Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            Vibration.vibrate(100)
            navigation.navigate('Decompte', { objectif: parseInt(objectif, 10), temps, mode, digitCount, autoAdvance })
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
  paramBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 20, padding: 20, justifyContent: 'center', marginBottom: 20 },
  paramText: { color: '#fff', fontSize: 28, fontWeight: '600', marginRight: 12},
  dropdown: { borderWidth: 1, borderColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  picker: { height: 50, color: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  inputBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, marginRight: 10, justifyContent: 'center' },
  input: { paddingHorizontal: 16, color: '#fff', fontSize: 16, textAlignVertical: 'center' },
  staticTimeBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  staticTime: { color: '#fff', fontSize: 16 },
  autoAdvanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  autoAdvanceLabel: { alignItems: 'center', color: '#fff', fontSize: 16, marginLeft: 8 },
  recordBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 12, marginBottom: 30, alignSelf: 'center' },
  recordText: { alignItems: 'center', color: '#fff', fontSize: 16, marginLeft: 8 },
  playButton: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 30 },
  playText: { fontSize: 24, fontWeight: '700', color: '#000' },
  learnMore: { alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#fff', borderRadius: 20 },
  learnMoreText: { color: '#000', fontSize: 16, fontWeight: '600' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 260, backgroundColor: '#111', borderRadius: 16, padding: 16, alignItems: 'center' }
})
