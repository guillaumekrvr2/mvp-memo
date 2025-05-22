// screens/CommunityScreen.jsx

import React, { useContext, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { AccountContext } from '../contexts/AccountContext';
import { Ionicons } from '@expo/vector-icons';

const DISCIPLINES = [
  { key: 'global',  label: 'Global' },
  { key: 'numbers', label: 'Numbers' },
  { key: 'cards',   label: 'Cards' },
  { key: 'words',   label: 'Words' },
  { key: 'binary',  label: 'Binary' },
  { key: 'names',   label: 'Names' },
  { key: 'images',  label: 'Images' },
];

export default function CommunityScreen() {
  const { accounts } = useContext(AccountContext);
  const [selected, setSelected] = useState('numbers');

  // Tri selon la discipline sélectionnée
  const sorted = useMemo(() =>
    [...accounts].sort((a, b) => {
      const getVal = acct => {
        if (selected === 'global') {
          return DISCIPLINES.reduce((sum, d) => {
            if (d.key === 'global') return sum;
            const rec = acct.records?.[d.key];
            return sum + (typeof rec === 'object' ? rec.score : rec || 0);
          }, 0);
        }
        const rec = acct.records?.[selected];
        return typeof rec === 'object' ? rec.score : rec || 0;
      };
      return getVal(b) - getVal(a);
    }), [accounts, selected]
  );

  const renderRow = ({ item }) => {
    // vue classique pour toutes les autres disciplines
    let text;
    if (selected === 'global') {
      const total = DISCIPLINES.reduce((sum, d) => {
        if (d.key === 'global') return sum;
        const rec = item.records?.[d.key];
        return sum + (typeof rec === 'object' ? rec.score : rec || 0);
      }, 0);
      text = `${total} pts`;
    } else {
      const rec = item.records?.[selected];
      text = typeof rec === 'object'
        ? `${rec.score} en ${rec.time}s`
        : `${rec || 0} pts`;
    }
    return (
      <View style={styles.row}>
        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.score}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {DISCIPLINES.map(d => (
          <TouchableOpacity
            key={d.key}
            style={[styles.tab, selected === d.key && styles.tabActive]}
            onPress={() => setSelected(d.key)}
          >
            <Text style={[styles.tabText, selected === d.key && styles.tabTextActive]}>
              {d.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.headerRow}>
        <Text style={styles.header}>Leaderboard</Text>
        <Ionicons name="trophy-outline" size={20} color="#fff" />
      </View>

      <FlatList
        key={selected}
        data={sorted}
        keyExtractor={i => i.id}
        // si Cards, on passe en grille 2 colonnes
        numColumns={1}
        renderItem={renderRow}
        ListEmptyComponent={<Text style={styles.empty}>Aucun participant</Text>}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    height: 80
  },
  tabs: {
    paddingBottom: 10,
  },
  tab: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },  
  tabActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  // === pour la grille Cards ===
  columnWrapper: {
    justifyContent: 'center',  // centre chaque ligne de 2 cartes
  },
  listPadding: {
    paddingBottom: 20,
  },
  card: {
    width: 120,
    height: 120,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  cardName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardScore: {
    color: '#fff',
    fontSize: 16,
    marginTop: 6,
  },

  // === pour la liste classique ===
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  name: {
    color: '#fff',
    fontSize: 16,
  },
  score: {
    color: '#fff',
    fontSize: 16,
  },

  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
