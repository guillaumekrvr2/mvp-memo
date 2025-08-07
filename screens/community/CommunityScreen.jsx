// screens/community/CommunityScreen.jsx
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme'; 
import { Carousel } from '../../components/molecules/Carousel/Carousel';
import { ModePicker } from '../../components/molecules/ModePicker/ModePicker';
import useLeaderboard from '../../hooks/useLeaderboard';
import { LeaderboardList } from '../../components/organisms/LeaderboardList/LeaderboardList';
import { AccountContext } from '../../contexts/AccountContext';
import { ModeVariantContext } from '../../contexts/ModeVariantContext';

// 🎯 DISCIPLINES avec les mêmes emojis et couleurs que HomeScreen
const DISCIPLINES = [
  { key: 'global', label: 'Global', emoji: '🌍', color: '#667eea' },
  { key: 'numbers', label: 'Numbers', emoji: '🔢', color: '#667eea' },
  { key: 'cards', label: 'Cards', emoji: '🃏', color: '#764ba2' },
  { key: 'words', label: 'Words', emoji: '📝', color: '#f093fb' },
  { key: 'binary', label: 'Binary', emoji: '💻', color: '#4facfe' },
  { key: 'names', label: 'Names', emoji: '👥', color: '#43e97b' },
  { key: 'images', label: 'Images', emoji: '🖼️', color: '#fa709a' },
];

// Modes de base - seront étendus dynamiquement pour la discipline numbers
const BASE_GAME_MODES = [
  { label: 'Memory League', value: 'memory-league' },
  { label: 'IAM', value: 'iam' },
];

export default function CommunityScreen() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('numbers');
  const [selectedMode, setSelectedMode] = useState('7');
  
  // Récupération de l'utilisateur connecté pour le highlight
  const { current } = useContext(AccountContext);
  
  // Récupération des variants depuis le contexte
  const { byDiscipline, loading: variantsLoading, error: variantsError } = useContext(ModeVariantContext);

  // Auto-sélection du premier variant quand les variants numbers se chargent
  useEffect(() => {
    if (selectedDiscipline === 'numbers' && !variantsLoading) {
      const numbersVariants = byDiscipline['numbers'] || byDiscipline[7] || [];
      if (numbersVariants.length > 0 && (selectedMode === 'memory-league' || selectedMode === 'iam')) {
        setSelectedMode(numbersVariants[0].id.toString());
      }
    }
  }, [byDiscipline, variantsLoading, selectedDiscipline, selectedMode]);

  // Construction dynamique des options du ModePicker selon la discipline
  const gameModesOptions = useMemo(() => {
    if (selectedDiscipline === 'numbers') {
      const numbersVariants = byDiscipline['numbers'] || byDiscipline[7] || [];
      
      if (numbersVariants.length > 0) {
        const options = numbersVariants.map(variant => ({
          label: variant.label,
          value: variant.id.toString(),
        }));
        return options;
      }
    }
    
    return BASE_GAME_MODES;
  }, [selectedDiscipline, byDiscipline]);

  // Détermination du variantId selon le mode sélectionné
  const variantId = useMemo(() => {
    if (selectedDiscipline === 'numbers') {
      const parsed = parseInt(selectedMode, 10);
      return isNaN(parsed) ? null : parsed;
    }
    
    const result = selectedMode === 'iam' ? 7 : 10;
    return result;
  }, [selectedDiscipline, selectedMode]);

  // Gestion du changement de discipline - réinitialiser le mode
  const handleDisciplineChange = (newDiscipline) => {
    setSelectedDiscipline(newDiscipline);
    
    if (newDiscipline === 'numbers') {
      const numbersVariants = byDiscipline['numbers'] || byDiscipline[7] || [];
      if (numbersVariants.length > 0) {
        setSelectedMode(numbersVariants[0].id.toString());
      }
    } else {
      setSelectedMode('memory-league');
    }
  };

  // Pour le hook useLeaderboard
  const leaderboardMode = selectedDiscipline === 'numbers' 
    ? (variantId === 10 ? 'memory-league' : 'iam')
    : selectedMode;

  // Utilise le hook pour obtenir la liste triée
  const { sorted, loading, error } = useLeaderboard(
    selectedDiscipline,
    leaderboardMode,
    DISCIPLINES,
    variantId
  );

  return (
    <View style={styles.container}>
      {/* Sélecteur de discipline avec emojis et couleurs */}
      <Carousel
        data={DISCIPLINES}
        selectedKey={selectedDiscipline}
        onSelect={handleDisciplineChange}
        style={styles.tabs}
      />

      {/* Sélecteur de mode de jeu */}
      <ModePicker
        label="Leaderboard"
        selectedValue={selectedMode}
        onValueChange={setSelectedMode}
        options={gameModesOptions}
      />

      {/* Gestion des états de chargement et d'erreur */}
      {(loading || variantsLoading) && <Text>Chargement…</Text>}
      {(error || variantsError) && (
        <Text>Erreur : {error?.message || variantsError?.message}</Text>
      )}

      {/* Liste du leaderboard */}
      {!loading && !error && !variantsLoading && !variantsError && (
        <LeaderboardList
          data={sorted}
          variantId={variantId}
          discipline={selectedDiscipline}
          mode={leaderboardMode}
          disciplines={DISCIPLINES}
          currentUserId={current?.id}
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
    marginTop: 100,
  },
  tabs: {
    marginBottom: 20,
  },
});