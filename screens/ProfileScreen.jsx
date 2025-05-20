// screens/ProfileScreen.jsx
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountContext } from '../contexts/AccountContext';

const DISCIPLINES = ['numbers', 'cards', 'words', 'binary', 'names', 'images'];

export default function ProfileScreen({ navigation }) {
  const { current, logout } = useContext(AccountContext);
  const [lastScore, setLastScore] = useState(null);
  const [lastTime, setLastTime] = useState(null);

  // Redirect to login after logout via context
  useEffect(() => {
    if (!current) {
      navigation.replace('Login');
    }
  }, [current, navigation]);

  // Load lastRecord for 'numbers' each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadLastRecord = async () => {
        try {
          const json = await AsyncStorage.getItem('lastRecord');
          if (json) {
            const { score, temps } = JSON.parse(json);
            setLastScore(score);
            setLastTime(temps);
          }
        } catch (e) {
          console.error('Erreur lecture lastRecord', e);
        }
      };
      loadLastRecord();
    }, [])
  );

  if (!current) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    // navigation handled in useEffect
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Prénom :</Text>
      <Text style={styles.value}>{current.firstName}</Text>

      <Text style={styles.label}>Nom :</Text>
      <Text style={styles.value}>{current.lastName}</Text>

      <Text style={styles.label}>Email :</Text>
      <Text style={styles.value}>{current.email}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modifier Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modifier Mot de passe</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Mes Records</Text>
      {DISCIPLINES.map((d) => (
        <View key={d} style={styles.recordRow}>
          <Text style={styles.recordLabel}>{d}</Text>
          {d === 'numbers' ? (
            <Text style={styles.recordValue}>
              {lastScore != null ? `${lastScore} pts (${lastTime}s)` : '0 pts'}
            </Text>
          ) : (
            <Text style={styles.recordValue}>
              {current.records[d] != null ? `${current.records[d]} pts` : '0 pts'}
            </Text>
          )}
        </View>
      ))}

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 15,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  recordLabel: {
    color: '#fff',
    fontSize: 16,
  },
  recordValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  logout: {
    backgroundColor: '#f66',
  },
});
