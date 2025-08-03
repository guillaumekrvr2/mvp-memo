import { View, StyleSheet, Text } from 'react-native';
import { useState} from 'react'
import { theme }  from '../../theme'; 
import { Carousel } from '../../components/molecules/Carousel/Carousel';
import { ModePicker } from '../../components/molecules/ModePicker/ModePicker'
import useLeaderboard from '../../hooks/useLeaderboard';
import { LeaderboardList } from '../../components/organisms/LeaderboardList/LeaderboardList';
import useFetchBestScore from '../../hooks/useFetchBestScore';

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

  const variantId = selectedMode === 'iam' ? 7 : undefined;
  const myScore   = useFetchBestScore(variantId);

  // Utilise le hook pour obtenir la liste triée
   const { sorted, loading, error } = useLeaderboard(
     selectedDiscipline,
     selectedMode,
     DISCIPLINES
   );
  console.log(sorted)
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
     {loading && <Text>Chargement…</Text>}
     {error   && <Text>Erreur : {error.message}</Text>}
      {!loading && !error && (
      <LeaderboardList
        data={sorted}
        variantId={variantId}
        discipline={selectedDiscipline}
        mode={selectedMode}
        disciplines={DISCIPLINES}
      />
     )}
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
