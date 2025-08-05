// screens/ProfileScreen.jsx
import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { AccountContext } from '../../contexts/AccountContext'
import { ModeVariantContext } from '../../contexts/ModeVariantContext'

const DISCIPLINES = ['numbers', 'cards', 'words', 'binary', 'names', 'images']

export default function ProfileScreen({ navigation }) {
  const { current, logout } = useContext(AccountContext)
  const { byDiscipline } = useContext(ModeVariantContext)

  // Redirige si non connecté
  useEffect(() => {
    if (!current) navigation.replace('Login')
  }, [current])

  if (!current) return null

  // === DEBUG : afficher les IDs et scores des variants "numbers" ===
  useEffect(() => {
    const nums = byDiscipline['numbers'] || byDiscipline[7] || []
    const ids = nums.map(v => v.id)
    const recs = ids.map(id => ({ id, score: current.records?.[id] ?? 0 }))
  }, [byDiscipline, current])

  const { firstName, lastName, email, records = {} } = current

  // Prépare la liste simple des variants "numbers"
  const rawNums = byDiscipline['numbers'] || byDiscipline[7] || []
  const numberVariants = rawNums.map(({ id, label }) => ({
    id,
    label,
    score: records[id] != null ? records[id] : 0,
  }))

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Infos compte */}
      <Text style={styles.label}>Prénom :</Text>
      <Text style={styles.value}>{firstName}</Text>

      <Text style={styles.label}>Nom :</Text>
      <Text style={styles.value}>{lastName}</Text>

      <Text style={styles.label}>Email :</Text>
      <Text style={styles.value}>{email}</Text>

      {/* Boutons maj */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateEmail')}>
        <Text style={styles.buttonText}>Modifier Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdatePassword')}>
        <Text style={styles.buttonText}>Modifier Mot de passe</Text>
      </TouchableOpacity>


      {/* Records */}
      <Text style={styles.sectionTitle}>Mes Records</Text>
      
      {/* Numbers: liste statique */}
      <View style={styles.recordRow}>
        <Text style={styles.recordLabel}>Numbers:</Text>
        {numberVariants.map(({ id, label, score }) => (
          <View key={id} style={styles.staticRow}>
            <Text style={styles.variantLabel}>{label}</Text>
            <Text style={styles.recordValue}>{score} pts</Text>
          </View>
        ))}
        {numberVariants.length === 0 && (
          <Text style={styles.recordValue}>Aucun variant trouvé.</Text>
        )}
      </View>

      {/* Les autres disciplines restent statiques */}
      {DISCIPLINES.filter(d => d !== 'numbers').map(discipline => (
        <View key={discipline} style={styles.recordRow}>
          <Text style={styles.recordLabel}>{discipline}</Text>
          <Text style={styles.recordValue}>
            {records[discipline] != null
              ? `${records[discipline]} pts`
              : '0 pts'}
          </Text>
        </View>
      ))}

      {/* Bouton déconnexion */}
      <TouchableOpacity style={[styles.button, styles.logout]} onPress={logout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#000' },
  label: { color: '#aaa', fontSize: 14, marginTop: 15 },
  value: { color: '#fff', fontSize: 18, fontWeight: '600' },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
  },
  recordRow: { marginBottom: 12 },
  staticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
  variantLabel: { color: '#fff', fontSize: 16, flex: 1 },
  recordValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  button: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#000', fontWeight: '600', fontSize: 16 },
  logout: { backgroundColor: '#f66' },
})
