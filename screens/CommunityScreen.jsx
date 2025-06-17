import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { theme }  from '../theme'; 
import { Carousel } from '../components/molecules/Carousel/Carousel';
import { ModePicker } from '../components/molecules/ModePicker/ModePicker'
import { LeaderboardItem } from '../components/molecules/LeaderboardItem/LeaderboarItem';
import { useLeaderboard } from '../hooks/useLeaderboard';

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
  const [selectedDiscipline, setSelectedDiscipline] = useState('numbers');
  const [selectedMode, setSelectedMode] = useState('memory-league');

  // Utilise le hook pour obtenir la liste triée
  const sorted = useLeaderboard(
    selectedDiscipline,
    selectedMode,
    DISCIPLINES
  );

  return (
    <View style={styles.container}>
      {/* Sélecteur de discipline */}
      <Carousel
        data={DISCIPLINES}
        selectedKey={selectedDiscipline}
        onSelect={setSelectedDiscipline}
        style={styles.tabs}
      />

      {/* Sélecteur de mode de jeu */}
      <ModePicker
        label="Leaderboard"
        selectedValue={selectedMode}
        onValueChange={setSelectedMode}
        options={GAME_MODES}
        containerStyle={styles.headerRow}
      />

      <FlatList
        key={`${selectedMode}-${selectedDiscipline}`}
        data={sorted}
        keyExtractor={i => i.id}
        numColumns={1}
        renderItem={({ item }) => (
         <LeaderboardItem
           player={item}
           discipline={selectedDiscipline}
           mode={selectedMode}
           disciplines={DISCIPLINES}
         />
       )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun participant</Text>}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
