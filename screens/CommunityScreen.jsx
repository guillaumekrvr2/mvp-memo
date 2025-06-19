import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { theme }  from '../theme'; 
import { Carousel } from '../components/molecules/Carousel/Carousel';
import { ModePicker } from '../components/molecules/ModePicker/ModePicker'
import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardList } from '../components/organisms/LeaderboardList/LeaderboardList';

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
  { label: 'Memory League', value: 'memory-league' },
  { label: 'IAM',           value: 'iam' },
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
      />

      <LeaderboardList
        data={sorted}
        discipline={selectedDiscipline}
        mode={selectedMode}
        disciplines={DISCIPLINES}
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
});
