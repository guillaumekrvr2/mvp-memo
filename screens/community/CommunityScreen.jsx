// screens/community/CommunityScreen.jsx
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme'; 
import { Carousel } from '../../components/molecules/Carousel/Carousel';
import { ModePicker } from '../../components/molecules/Commons/ModePicker/ModePicker';
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
  { key: 'spokens', label: 'Spokens', emoji: '🎤', color: '#ff7b7b' },
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
  

  // Auto-sélection du premier variant selon la discipline
  useEffect(() => {
    if (!variantsLoading) {
      if (selectedDiscipline === 'numbers') {
        const numbersVariants = byDiscipline['numbers'] || byDiscipline[7] || [];
        if (numbersVariants.length > 0 && (selectedMode === 'memory-league' || selectedMode === 'iam')) {
          setSelectedMode(numbersVariants[0].id.toString());
        }
      } else if (selectedDiscipline === 'cards') {
        // Chercher les variants cards (disciplineId potentiellement différent)
        const cardsVariants = byDiscipline['cards'] || byDiscipline[8] || [];
        if (cardsVariants.length > 0 && (selectedMode === 'memory-league' || selectedMode === 'iam')) {
          setSelectedMode(cardsVariants[0].id.toString());
        }
      } else if (selectedDiscipline === 'binary') {
        // Chercher les variants binary (disciplineId 10, variants 15,16,17)
        const binaryVariants = byDiscipline['binary'] || byDiscipline[10] || [];
        if (binaryVariants.length > 0 && selectedMode === 'memory-league') {
          setSelectedMode(binaryVariants[0].id.toString());
        }
      } else if (selectedDiscipline === 'words') {
        // Chercher les variants words (disciplineId 9, variants 19,20,21,22)
        const wordsVariants = byDiscipline['words'] || byDiscipline[9] || [];
        if (wordsVariants.length > 0 && (selectedMode === 'memory-league' || selectedMode === 'iam')) {
          setSelectedMode(wordsVariants[0].id.toString());
        }
      } else if (selectedDiscipline === 'spokens') {
        // Spokens a un seul variant fixe (disciplineId 13, variant 18)
        setSelectedMode('18');
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
    } else if (selectedDiscipline === 'cards') {
      const cardsVariants = byDiscipline['cards'] || byDiscipline[8] || [];
      
      if (cardsVariants.length > 0) {
        const options = cardsVariants.map(variant => ({
          label: variant.label,
          value: variant.id.toString(),
        }));
        return options;
      }
    } else if (selectedDiscipline === 'binary') {
      const binaryVariants = byDiscipline['binary'] || byDiscipline[10] || [];
      
      if (binaryVariants.length > 0) {
        const options = binaryVariants.map(variant => ({
          label: variant.label,
          value: variant.id.toString(),
        }));
        return options;
      }
    } else if (selectedDiscipline === 'words') {
      const wordsVariants = byDiscipline['words'] || byDiscipline[9] || [];
      
      if (wordsVariants.length > 0) {
        const options = wordsVariants.map(variant => ({
          label: variant.label,
          value: variant.id.toString(),
        }));
        return options;
      }
    } else if (selectedDiscipline === 'spokens') {
      // Spokens a un seul mode fixe
      return [
        { label: 'IAM Spokens', value: '18' }
      ];
    }
    
    return BASE_GAME_MODES;
  }, [selectedDiscipline, byDiscipline]);

  // Détermination du variantId selon le mode sélectionné
  const variantId = useMemo(() => {
    if (selectedDiscipline === 'numbers') {
      const parsed = parseInt(selectedMode, 10);
      return isNaN(parsed) ? null : parsed;
    } else if (selectedDiscipline === 'cards') {
      const parsed = parseInt(selectedMode, 10);
      return isNaN(parsed) ? null : parsed;
    } else if (selectedDiscipline === 'binary') {
      const parsed = parseInt(selectedMode, 10);
      return isNaN(parsed) ? null : parsed;
    } else if (selectedDiscipline === 'words') {
      const parsed = parseInt(selectedMode, 10);
      return isNaN(parsed) ? null : parsed;
    } else if (selectedDiscipline === 'spokens') {
      // Spokens utilise toujours le variant 18
      return 18;
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
    } else if (newDiscipline === 'cards') {
      const cardsVariants = byDiscipline['cards'] || byDiscipline[8] || [];
      if (cardsVariants.length > 0) {
        setSelectedMode(cardsVariants[0].id.toString());
      }
    } else if (newDiscipline === 'binary') {
      const binaryVariants = byDiscipline['binary'] || byDiscipline[10] || [];
      if (binaryVariants.length > 0) {
        setSelectedMode(binaryVariants[0].id.toString());
      }
    } else if (newDiscipline === 'words') {
      const wordsVariants = byDiscipline['words'] || byDiscipline[9] || [];
      if (wordsVariants.length > 0) {
        setSelectedMode(wordsVariants[0].id.toString());
      }
    } else if (newDiscipline === 'spokens') {
      // Spokens a un seul variant fixe
      setSelectedMode('18');
    } else {
      setSelectedMode('memory-league');
    }
  };

  // Pour le hook useLeaderboard
  const leaderboardMode = useMemo(() => {
    if (selectedDiscipline === 'numbers') {
      return variantId === 10 ? 'memory-league' : 'iam';
    } else if (selectedDiscipline === 'cards') {
      // Cards variants: 14=memory-league, 11/12/13=iam
      return variantId === 14 ? 'memory-league' : 'iam';
    } else if (selectedDiscipline === 'binary') {
      // Binary variants: 15/16/17=iam (pas de memory-league pour binaires)
      return 'iam';
    } else if (selectedDiscipline === 'words') {
      // Words variants: 19/20/21/22=iam (mode_id 9)
      return 'iam';
    } else if (selectedDiscipline === 'spokens') {
      // Spokens variant: 18=iam (mode_id 2, discipline_id 13)
      return 'iam';
    }
    return selectedMode;
  }, [selectedDiscipline, variantId, selectedMode]);

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

      {/* Gestion des erreurs */}
      {(error || variantsError) && (
        <Text>Erreur : {error?.message || variantsError?.message}</Text>
      )}

      {/* Liste du leaderboard */}
      <LeaderboardList
        data={sorted}
        variantId={variantId}
        discipline={selectedDiscipline}
        mode={leaderboardMode}
        disciplines={DISCIPLINES}
        currentUserId={current?.id || null}
        loading={loading || variantsLoading}
      />
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
  },
});