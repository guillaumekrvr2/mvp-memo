// screens/ProfileScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AccountContext } from '../../contexts/AccountContext';
import { ModeVariantContext } from '../../contexts/ModeVariantContext';
import { Picker } from '@react-native-picker/picker';

const DISCIPLINES = ['numbers', 'cards', 'words', 'binary', 'names', 'images'];

export default function ProfileScreen({ navigation }) {
  const { current, logout } = useContext(AccountContext);
  const { map: modeVariantsMap } = useContext(ModeVariantContext);
  const [selectedNumberVariant, setSelectedNumberVariant] = useState(null);
  const [showNumberVariants, setShowNumberVariants] = useState(false);

  // Redirige si non connecté
  useEffect(() => {
    if (!current) navigation.replace('Login');
  }, [current]);

  if (!current) return null;

  const { firstName, lastName, email, records = {} } = current;

  // Prépare les variants numbers avec label
  const numberVariants = Object.entries(records).map(([variantId, score]) => ({
    id: variantId,
    label: modeVariantsMap[variantId] || variantId,
    score,
  }));

  // Sélection initiale
  useEffect(() => {
    if (numberVariants.length && selectedNumberVariant == null) {
      setSelectedNumberVariant(numberVariants[0].id);
    }
  }, [numberVariants]);

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
      {DISCIPLINES.map((discipline) => (
        <View key={discipline} style={styles.recordRow}>
          {discipline === 'numbers' ? (
            <TouchableOpacity style={styles.toggleRow} onPress={() => setShowNumberVariants(!showNumberVariants)}>
              <Text style={styles.recordLabel}>Numbers</Text>
              <Text style={styles.chevron}>{showNumberVariants ? '▴' : '▾'}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.staticRow}>
              <Text style={styles.recordLabel}>{discipline}</Text>
              <Text style={styles.recordValue}>{records[discipline] != null ? `${records[discipline]} pts` : '0 pts'}</Text>
            </View>
          )}

          {discipline === 'numbers' && showNumberVariants && (
            <View style={styles.pickerContainer}>
              {numberVariants.length ? (
                <Picker
                  selectedValue={selectedNumberVariant}
                  onValueChange={(value) => setSelectedNumberVariant(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  {numberVariants.map(({ id, label, score }) => (
                    <Picker.Item key={id} label={`${label} — ${score} pts`} value={id} />
                  ))}
                </Picker>
              ) : (
                <Text style={styles.recordValue}>0 pts</Text>
              )}
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={logout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#000' },
  label: { color: '#aaa', fontSize: 14, marginTop: 15 },
  value: { color: '#fff', fontSize: 18, fontWeight: '600' },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '600', marginTop: 30, marginBottom: 10 },
  recordRow: { marginBottom: 12 },
  staticRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recordLabel: { color: '#fff', fontSize: 16, textTransform: 'capitalize' },
  recordValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  chevron: { color: '#fff', fontSize: 16 },
  pickerContainer: { borderWidth: 1, borderColor: '#fff', borderRadius: 8, overflow: 'hidden', marginTop: 8, minHeight: 140 },
  picker: { height: 140, color: '#fff' },
  pickerItem: { height: 40 },
  button: { marginTop: 15, paddingVertical: 12, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: '600', fontSize: 16 },
  logout: { backgroundColor: '#f66' },
});
