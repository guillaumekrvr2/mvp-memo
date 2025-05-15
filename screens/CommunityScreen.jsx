// screens/CommunityScreen.jsx
import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { AccountContext } from '../contexts/AccountContext';

const DISCIPLINES = [
  { key: 'numbers', label: 'Numbers' },
  { key: 'cards',   label: 'Cards' },
  { key: 'words',   label: 'Words' },
  { key: 'binary',  label: 'Binary' },
  { key: 'names',   label: 'Names' },
  { key: 'images',  label: 'Images' },
];

const CARD_WIDTH = 120;
const CARD_HEIGHT = 120;
const TAB_SIZE = 100;

export default function CommunityScreen() {
  const { accounts } = useContext(AccountContext);
  const [selected, setSelected] = useState('numbers');

  const sortedAccounts = useMemo(() =>
    [...accounts].sort((a, b) => {
      const getValue = acct => {
        if (selected === 'global') {
          return DISCIPLINES.reduce((sum, d) => {
            const rec = acct.records?.[d.key];
            const val = typeof rec === 'object' ? rec.score : rec || 0;
            return sum + val;
          }, 0);
        }
        const rec = acct.records?.[selected];
        return typeof rec === 'object' ? rec.score : rec || 0;
      };
      return getValue(b) - getValue(a);
    }), [accounts, selected]
  );

  const renderItem = ({ item }) => {
    let recordText;
    if (selected === 'global') {
      const total = DISCIPLINES.reduce((sum, d) => {
        const rec = item.records?.[d.key];
        return sum + (typeof rec === 'object' ? rec.score : rec || 0);
      }, 0);
      recordText = `${total} pts`;
    } else {
      const rec = item.records?.[selected];
      if (typeof rec === 'object') {
        recordText = `${rec.score} éléments en ${rec.time}s`;
      } else {
        recordText = `${rec || 0} pts`;
      }
    }
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.record}>{recordText}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        <TouchableOpacity
          style={[styles.squareTab, selected === 'global' && styles.tabActive]}
          onPress={() => setSelected('global')}
        >
          <Text style={[styles.tabText, selected === 'global' && styles.tabTextActive]}>Global</Text>
        </TouchableOpacity>
        {DISCIPLINES.map(d => (
          <TouchableOpacity
            key={d.key}
            style={[styles.squareTab, selected === d.key && styles.tabActive]}
            onPress={() => setSelected(d.key)}
          >
            <Text style={[styles.tabText, selected === d.key && styles.tabTextActive]}>
              {d.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.title}>Leaderboard</Text>

      <FlatList
        data={sortedAccounts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListEmptyComponent={<Text style={styles.empty}>Aucun participant pour le moment.</Text>}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  squareTab: {
    width: TAB_SIZE,
    height: TAB_SIZE,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  tabActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  grid: {
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  record: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
