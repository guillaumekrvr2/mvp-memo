// screens/ProfileScreen.jsx
import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountContext } from '../../contexts/AccountContext';
import { supabase } from '../../data/supabaseClient';   // ← import de votre client Supabase

const DISCIPLINES = ['numbers', 'cards', 'words', 'binary', 'names', 'images'];

export default function ProfileScreen({ navigation }) {
  const { current, logout } = useContext(AccountContext);
  const [lastScore, setLastScore] = useState(null);
  const [lastTime,  setLastTime]  = useState(null);
  const [scores,    setScores]    = useState({});

  // 1) Redirige si non connecté
  React.useEffect(() => {
    if (!current) navigation.replace('Login');
  }, [current]);

  // 2) Charge le dernier record “numbers”
  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem('lastRecord')
      .then(json => {
        if (!json) return;
        const { score, temps } = JSON.parse(json);
        setLastScore(score);
        setLastTime(temps);
      })
      .catch(e => console.error('Erreur lecture lastRecord', e));
  }, []));

  // 3) Charge les best_scores depuis Supabase
  useFocusEffect(useCallback(() => {
    if (!current) return;
    (async () => {
      const { data, error } = await supabase
        .from('best_scores')
        .select('mode_variants_id, score')
        .eq('user_id', current.id);

      if (error) {
        console.error('Erreur fetch best_scores', error);
        return;
      }
      // Transforme la liste en objet { discipline: score }
      const map = data.reduce((acc, { mode_variants_id, score }) => {
        // Ici, on part du principe que vos mode_variants_id sont identiques
        // aux strings de DISCIPLINES. Sinon, adaptez la logique de mapping.
        acc[mode_variants_id] = score;
        return acc;
      }, {});
      setScores(map);
    })();
  }, [current]));

  if (!current) return null;

  // 4) Affichage
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Prénom :</Text>
      <Text style={styles.value}>{current.first_name}</Text>

      <Text style={styles.label}>Nom :</Text>
      <Text style={styles.value}>{current.second_name}</Text>

      <Text style={styles.label}>Email :</Text>
      <Text style={styles.value}>{current.email}</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('UpdateEmail')}
      >
        <Text style={styles.buttonText}>Modifier Email</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('UpdatePassword')}
      >
        <Text style={styles.buttonText}>Modifier Mot de passe</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Mes Records</Text>
      {DISCIPLINES.map((d) => (
        <View key={d} style={styles.recordRow}>
          <Text style={styles.recordLabel}>{d}</Text>
          <Text style={styles.recordValue}>
            {d === 'numbers'
              ? (lastScore != null ? `${lastScore} pts (${lastTime}s)` : '0 pts')
              : (scores[d] != null        ? `${scores[d]} pts`      : '0 pts')
            }
          </Text>
        </View>
      ))}

      <TouchableOpacity 
        style={[styles.button, styles.logout]} 
        onPress={logout}
      >
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { padding: 20, backgroundColor: '#000' },
  label:        { color: '#aaa', fontSize: 14, marginTop: 15 },
  value:        { color: '#fff', fontSize: 18, fontWeight: '600' },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '600', marginTop: 30, marginBottom: 10 },
  recordRow:    { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#333' },
  recordLabel:  { color: '#fff', fontSize: 16 },
  recordValue:  { color: '#fff', fontSize: 16, fontWeight: '600' },
  button:       { marginTop: 15, paddingVertical: 12, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center' },
  buttonText:   { color: '#000', fontWeight: '600', fontSize: 16 },
  logout:       { backgroundColor: '#f66' },
});
