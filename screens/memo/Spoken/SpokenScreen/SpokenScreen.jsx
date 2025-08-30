// screens/memo/Spoken/SpokenScreen/SpokenScreen.jsx
import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import des styles depuis le fichier séparé
import { styles } from './styles';

import DisciplineHeader from '../../../../components/molecules/Commons/DisciplineHeader/DisciplineHeader';
import PlayButton from '../../../../components/atoms/Commons/PlayButton/PlayButton';
import { SecondaryButton } from '../../../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import ObjectiveTimePicker from '../../../../components/molecules/Commons/ObjectiveTimePicker/ObjectiveTimePicker';

import useObjective from '../../../../hooks/useObjective';

export default function SpokenScreen() {
  const navigation = useNavigation();

  // Mode fixe pour spokens - toujours custom 
  const mode = 'custom';

  // Objectif (nombre d'items) persistant
  const { objectif, setObjectif } = useObjective('spoken:objectif', '10');

  // Pas de variants ni de scores pour spokens en mode custom
  const playTime = 0;

  return (
    <SafeAreaView style={styles.container}>
      <DisciplineHeader disciplineName="Spokens 🎤" />
      
      <View style={[
        styles.content, 
        mode === 'custom' && { justifyContent: 'flex-start' }
      ]}>
        
        {/* SECTION DU HAUT - Plus de configuration nécessaire */}

        {/* SECTION DU MILIEU - Paramètres du jeu */}
        <View style={styles.middleSection}>
          <ObjectiveTimePicker
            style={styles.objectiveTimePicker}
            mode={mode}
            objectif={objectif}
            onObjectifChange={setObjectif}
            hideTime={true}
          />
        </View>

        {/* SECTION DU BAS - Actions principales */}
        <View style={styles.bottomSection}>
          <PlayButton
            style={styles.playButton}
            onPress={() =>
              navigation.navigate('SpokenDecompte', {
                objectif: parseInt(objectif, 10),
                temps: playTime,
                mode,
                discipline: 'spokens' // Discipline spokens
              })
            }
          />

          <SecondaryButton 
            style={styles.secondaryButton}
            variant="secondary"
            onPress={() => {/* action */}}
          >
            Learn more
          </SecondaryButton>
        </View>

        {/* Plus de modales nécessaires */}
      </View>
    </SafeAreaView>
  );
}