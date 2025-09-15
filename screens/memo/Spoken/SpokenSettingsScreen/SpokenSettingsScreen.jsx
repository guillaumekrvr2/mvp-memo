// screens/memo/Spoken/SpokenScreen/SpokenScreen.jsx
import { SafeAreaView, View, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import des styles depuis le fichier séparé
import { styles } from './styles';

import DisciplineHeader from '../../../../components/molecules/Commons/DisciplineHeader/DisciplineHeader';
import PlayButton from '../../../../components/atoms/Commons/PlayButton/PlayButton';
import { SecondaryButton } from '../../../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import ObjectiveTimePicker from '../../../../components/molecules/Commons/ObjectiveTimePicker/ObjectiveTimePicker';
import RecordDisplay from '../../../../components/molecules/Commons/RecordDisplay/RecordDisplay';
import SpeedSlider from '../../../../components/molecules/Commons/SpeedSlider/SpeedSliderCommunity';

import useObjective from '../../../../hooks/useObjective';
import useFetchBestScore from '../../../../hooks/useFetchBestScore';
import { useModeVariants } from '../../../../hooks/useModeVariants';

export default function SpokenScreen() {
  const navigation = useNavigation();

  // Mode fixe pour spokens - mode IAM (mode_id = 2 dans Supabase)
  const mode = 'iam';

  // Objectif (nombre d'items) persistant
  const { objectif, setObjectif } = useObjective('spoken:objectif', '10');
  
  // Vitesse de lecture (en secondes par item)
  const [speechSpeed, setSpeechSpeed] = useState(1.0);

  // Récupération des variants spokens depuis Supabase
  const {
    variants,
    loading: variantsLoading,
    selectedVariant,
    setSelectedVariant,
  } = useModeVariants('spokens', mode);

  // Dernier meilleur score pour le variant sélectionné
  const variantId = selectedVariant?.id;
  const lastScore = useFetchBestScore(variantId);

  // Temps de jeu : soit saisi en custom, soit variant choisi
  const playTime = mode === 'custom'
    ? 0 // Pas de temps pour spokens en custom
    : selectedVariant?.duration_seconds ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <DisciplineHeader disciplineName="Spokens 🎤" />
      
      <View style={[
        styles.content, 
        mode === 'custom' && { justifyContent: 'flex-start' }
      ]}>
        
        {/* SECTION DU HAUT - Paramètres du jeu */}
        <View style={styles.middleSection}>
          
          {/* Curseur de vitesse */}
          <SpeedSlider
            value={speechSpeed}
            onValueChange={setSpeechSpeed}
            min={0.5}
            max={2.0}
            step={0.1}
          />
        </View>

          <ObjectiveTimePicker
            style={styles.objectiveTimePicker}
            mode={mode}
            objectif={objectif}
            onObjectifChange={setObjectif}
            hideTime={true}
          />

        {/* SECTION DU MILIEU - Record Display */}
        <RecordDisplay 
          score={lastScore} 
          time={playTime} 
          hidden={mode === 'custom' || variantId == null}
          hideTime={true}
        />

        {/* SECTION DU BAS - Actions principales */}
        <View style={styles.bottomSection}>
          <PlayButton
            style={styles.playButton}
            onPress={() => {
              // Validation de l'objectif
              if (!objectif || objectif.trim() === '') {
                Alert.alert(
                  'Objectif manquant',
                  'Veuillez remplir le champ Objectif avant de commencer.',
                  [{ text: 'OK' }]
                )
                return
              }

              const objValue = parseInt(objectif, 10)
              if (isNaN(objValue) || objValue <= 0) {
                Alert.alert(
                  'Objectif invalide',
                  'Veuillez saisir un nombre valide pour l\'objectif.',
                  [{ text: 'OK' }]
                )
                return
              }

              navigation.navigate('SpokenDecompte', {
                objectif: objValue,
                temps: playTime,
                mode,
                speechSpeed, // Ajout de la vitesse de lecture
                discipline: 'spokens' // Discipline spokens
              })
            }}
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