// screens/community/CommunityScreen.jsx
import { View, StyleSheet, Text } from 'react-native';
import { useState, useContext, useMemo, useEffect } from 'react';
import { theme } from '../../theme'; 
import { Carousel } from '../../components/molecules/Carousel/Carousel';
import { ModePicker } from '../../components/molecules/ModePicker/ModePicker'
import useLeaderboard from '../../hooks/useLeaderboard';
import { LeaderboardList } from '../../components/organisms/LeaderboardList/LeaderboardList';
import { AccountContext } from '../../contexts/AccountContext';
import { ModeVariantContext } from '../../contexts/ModeVariantContext';

const DISCIPLINES = [
  { key: 'global',  label: 'Global' },
  { key: 'numbers', label: 'Numbers' },
  { key: 'cards',   label: 'Cards' },
  { key: 'words',   label: 'Words' },
  { key: 'binary',  label: 'Binary' },
  { key: 'names',   label: 'Names' },
  { key: 'images',  label: 'Images' },
];

// Modes de base - seront étendus dynamiquement pour la discipline numbers
const BASE_GAME_MODES = [
  { label: 'Memory League', value: 'memory-league' },
  { label: 'IAM',           value: 'iam' },
];

export default function CommunityScreen() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('numbers');
  const [selectedMode, setSelectedMode] = useState('7'); // Initialiser avec le premier variant numbers
  
  // Récupération de l'utilisateur connecté pour le highlight
  const { current } = useContext(AccountContext);
  
  // Récupération des variants depuis le contexte
  const { byDiscipline, loading: variantsLoading, error: variantsError } = useContext(ModeVariantContext);

  // Auto-sélection du premier variant quand les variants numbers se chargent
  useEffect(() => {
    if (selectedDiscipline === 'numbers' && !variantsLoading) {
      const numbersVariants = byDiscipline['numbers'] || byDiscipline[7] || [];
      if (numbersVariants.length > 0 && (selectedMode === 'memory-league' || selectedMode === 'iam')) {
        // Si on a encore l'ancienne valeur, prendre le premier variant
        setSelectedMode(numbersVariants[0].id.toString());
        
      }
    }
  }, [byDiscipline, variantsLoading, selectedDiscipline, selectedMode]);

  // Construction dynamique des options du ModePicker selon la discipline
  const gameModesOptions = useMemo(() => {
    // Pour la discipline numbers, on utilise les variants du contexte
    if (selectedDiscipline === 'numbers') {
      // Recherche de l'ID de la discipline numbers (peut être 'numbers' ou un ID numérique)
      const numbersVariants = byDiscipline['numbers'] || byDiscipline[7] || [];
      
      
      if (numbersVariants.length > 0) {
        // Transformer les variants en options pour le picker
        const options = numbersVariants.map(variant => ({
          label: variant.label,
          value: variant.id.toString(), // Utiliser l'ID comme value
        }));
        return options;
      }
    }
    
    // Pour les autres disciplines, utiliser les modes de base
    return BASE_GAME_MODES;
  }, [selectedDiscipline, byDiscipline]);

  // Détermination du variantId selon le mode sélectionné
  const variantId = useMemo(() => {
    if (selectedDiscipline === 'numbers') {
      // Pour numbers, selectedMode contient directement l'ID du variant
      const parsed = parseInt(selectedMode, 10);
      return isNaN(parsed) ? null : parsed;
    }
    
    // Pour les autres disciplines, utiliser la logique existante
    const result = selectedMode === 'iam' ? 7 : 10;
    return result;
  }, [selectedDiscipline, selectedMode]);

  // Gestion du changement de discipline - réinitialiser le mode
  const handleDisciplineChange = (newDiscipline) => {
    setSelectedDiscipline(newDiscipline);
    
    // Réinitialiser le mode selon la nouvelle discipline
    if (newDiscipline === 'numbers') {
      const numbersVariants = byDiscipline['numbers'] || byDiscipline[7] || [];
      if (numbersVariants.length > 0) {
        setSelectedMode(numbersVariants[0].id.toString());
      }
    } else {
      setSelectedMode('memory-league');
    }
  };

  // Pour le hook useLeaderboard, il faut passer le mode original pour les autres disciplines
  const leaderboardMode = selectedDiscipline === 'numbers' 
    ? (variantId === 10 ? 'memory-league' : 'iam')  // 10 = memory-league; 7,8,9 = iam
    : selectedMode;

  // Utilise le hook pour obtenir la liste triée
  const { sorted, loading, error } = useLeaderboard(
    selectedDiscipline,
    leaderboardMode,
    DISCIPLINES,
    variantId // Passer le variantId au hook
  );

  return (
    <View style={styles.container}>
      {/* Sélecteur de discipline */}
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
  },
});