import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

export default function NumbersScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Chevron back */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        {/* Profile icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <Ionicons name="person-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        {/* Boîte de paramètres */}
        <View style={styles.paramBox}>
          <Text style={styles.paramText}>123456</Text>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </View>

        {/* Ligne Record */}
        <View style={styles.recordRow}>
          <Text style={styles.recordLabel}>Record</Text>
          <Ionicons name="trophy-outline" size={20} color="#fff" />
          <Text style={styles.recordValue}>0</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    marginTop: 20
  },
  paramBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between'
  },
  paramText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },
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
  }
})
