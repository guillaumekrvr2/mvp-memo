// screens/NumbersScreen.jsx
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

export default function NumbersScreen() {
  const navigation = useNavigation()

  // états locaux
  const [record, setRecord] = useState(0)
  const [objectif, setObjectif] = useState('')  // chaîne pour TextInput
  const [temps, setTemps]       = useState('')  // idem

  // Effet : mettre à jour le record chaque fois que "temps" change
  useEffect(() => {
    // TODO → récupérer le dernier record lié à `temps`
    // pour l’instant, placeholder :
    const lastRecord = temps === '10' ? 5 : 0
    setRecord(lastRecord)
  }, [temps])

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <Ionicons name="person-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Corps de l’écran */}
      <View style={styles.content}>
        {/* 1) Boîte Record + settings */}
        <View style={styles.paramBox}>
          <Text style={styles.paramText}>123456</Text>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </View>

        {/* 2) Record en fonction du temps */}
        <View style={styles.recordRow}>
          <Text style={styles.recordLabel}>Record</Text>
          <Ionicons name="trophy-outline" size={20} color="#fff" />
          <Text style={styles.recordValue}>{record}</Text>
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
          onPress={() => navigation.navigate('Decompte', {
            objectif: parseInt(objectif, 10),
            temps: parseInt(temps, 10)
          })}
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 40
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
  recordLabel: { color: '#fff', fontSize: 16, marginRight: 8 },
  recordValue: { color: '#fff', fontSize: 16, marginLeft: 8 },

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
