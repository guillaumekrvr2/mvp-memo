import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { AccountContext } from '../contexts/AccountContext';
import { Picker } from '@react-native-picker/picker';

const DISCIPLINES = [
  { key: 'global',  label: 'Global' },
  { key: 'numbers', label: 'Numbers' },
  { key: 'cards',   label: 'Cards' },
  { key: 'words',   label: 'Words' },
  { key: 'binary',  label: 'Binary' },
  { key: 'names',   label: 'Names' },
  { key: 'images',  label: 'Images' },
];

const GAME_MODES = [
  { key: 'memory-league', label: 'Memory League' },
  { key: 'iam',         label: 'IAM' },
];

export default function CommunityScreen() {
  const { accounts } = useContext(AccountContext);
  const [selectedDiscipline, setSelectedDiscipline] = useState('numbers');
  const [selectedMode, setSelectedMode] = useState('memoryLeague');

  // Tri selon la discipline et le mode sélectionnés
  const sorted = useMemo(() => {
  return [...accounts].sort((a, b) => {
    const getScore = acct => {
      if (selectedDiscipline === 'global') {
        return DISCIPLINES
          .filter(d => d.key !== 'global')
          .reduce((sum, d) => {
            const rec = acct.records?.[d.key]?.[selectedMode];
            return sum + (rec?.score || 0);
          }, 0);
      }
      const recContainer = acct.records?.[selectedDiscipline];
      if (recContainer && typeof recContainer === 'object') {
        const rec = recContainer[selectedMode];
        return rec?.score || 0;
      }
      return typeof recContainer === 'number'
        ? recContainer
        : 0;
    };
    return getScore(b) - getScore(a);
  });
}, [accounts, selectedDiscipline, selectedMode]);

const renderRow = ({ item }) => {
  let text;
  if (selectedDiscipline === 'global') {
    const total = DISCIPLINES
      .filter(d => d.key !== 'global')
      .reduce((sum, d) => {
        const rec = item.records?.[d.key]?.[selectedMode];
        return sum + (rec?.score || 0);
      }, 0);
    text = `${total} pts`;
  } else {
    const recContainer = item.records?.[selectedDiscipline];
    let rec;
    if (recContainer && typeof recContainer === 'object') {
      rec = recContainer[selectedMode];
    }
    if (rec) {
      text = `${rec.score} en ${rec.time}s`;
    } else {
      const fallback = typeof recContainer === 'number'
        ? recContainer
        : 0;
      text = `${fallback} pts`;
    }
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
      {/* Sélecteur de discipline */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {DISCIPLINES.map(d => (
          <TouchableOpacity
            key={d.key}
            style={[styles.tab, selectedDiscipline === d.key && styles.tabActive]}
            onPress={() => setSelectedDiscipline(d.key)}
          >
            <Text style={[styles.tabText, selectedDiscipline === d.key && styles.tabTextActive]}>
              {d.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sélecteur de mode de jeu */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Leaderboard</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMode}
            style={styles.picker}
            dropdownIconColor="#fff"
            onValueChange={value => setSelectedMode(value)}
          >
            {GAME_MODES.map(m => (
              <Picker.Item key={m.key} label={m.label} value={m.key} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        key={`${selectedMode}-${selectedDiscipline}`}
        data={sorted}
        keyExtractor={i => i.id}
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
  },
  tabs: {
    paddingBottom: 10,
    marginBottom: 8
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
    marginVertical: 12,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#111',
    borderRadius: 8,
    height: 40,
    position: 'relative',  // pour que l'enfant en absolute soit relatif à ce view
    overflow: 'visible',   // autorise le débordement
  },
  picker: {
    width: 160,
    color: '#fff',
    position: 'absolute',  // on sort du flux normal
    top: -20,              // on remonte de moitié de la hauteur en trop               // plein‐largeur à l'intérieur du container
    right: 0,
    height: 80,
  },

  listPadding: {
    paddingBottom: 20,
    marginTop: 8
  },
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
