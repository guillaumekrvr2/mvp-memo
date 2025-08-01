// screens/NumbersScreen.jsx
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import AutoAdvanceSwitch from '../../components/atoms/AutoAdvanceSwitch/AutoAdvanceSwitch';
import useDigitPicker from '../../hooks/useDigitPicker';
import { ModePicker } from '../../components/molecules/ModePicker/ModePicker';
import DigitPickerModal from '../../components/molecules/DigitPickerModal/DigitPickerModal';
import PlayButton from '../../components/atoms/PlayButton/PlayButton';
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton';
import RecordDisplay from '../../components/molecules/RecordDisplay/RecordDisplay';
import ObjectiveTimePicker from '../../components/molecules/ObjectiveTimePicker/ObjectiveTimePicker';
import HighlightBoxSetter from '../../components/atoms/HighlightBoxSetter/HighlightBoxSetter';

import useMode from '../../hooks/useMode';
import { modeOptions } from '../../config/gameConfig';
import useObjective from '../../hooks/useObjective';
import useCountdown from '../../hooks/useCountdown';
import useAutoAdvancePreference from '../../hooks/useAutoAdvancePreference';
import useFetchBestScore from '../../hooks/useFetchBestScore';
import { useModeVariants } from '../../hooks/useModeVariants';

export default function NumbersScreen() {
  const navigation = useNavigation();

  // Digit picker pour le nombre de chiffres
  const {
    digitCount,
    previewDigits,
    modalVisible,
    openModal,
    closeModal,
    setDigitCount,
  } = useDigitPicker(6);

  // Mode de jeu (memory-league, iam, custom…)
  const { mode, onModeChange, options } = useMode('memory-league', modeOptions);

  // Objectif (nombre d’items) persistant par mode
  const defaultObj = mode === 'memory-league' ? '60' : '';
  const { objectif, setObjectif } = useObjective(`numbers:objectif:${mode}`, defaultObj);

  // Temps (pour custom) géré par le hook countdown
  const { temps, setTemps } = useCountdown(mode);

  // Auto-advance uniquement pour custom
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode);

  // Dernier score lu depuis best_scores
  const { lastScore, lastTime } = useFetchBestScore('numbers', mode);

  // Variants (durées) pour le mode/disciplines standards
  const {
    variants,
    loading: variantsLoading,
    selectedVariant,
    setSelectedVariant,
  } = useModeVariants('numbers', mode);   // ← on passe mode ici

  // Calcul du temps de jeu : soit saisi en custom, soit variant choisi
  const playTime = mode === 'custom'
    ? temps
    : selectedVariant?.duration_seconds ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, mode === 'custom' && { justifyContent: 'flex-start' }]}>
        {/* Sélecteur de groupement */}
        <HighlightBoxSetter
          label={previewDigits.join('')}
          icon={<Ionicons name="settings-outline" size={24} color="#fff" />}
          onPress={openModal}
        />
        <DigitPickerModal
          visible={modalVisible}
          digitCount={digitCount}
          onValueChange={setDigitCount}
          onClose={closeModal}
        />

        {/* Sélecteur de mode global */}
        <ModePicker
          variant="numbers"
          selectedValue={mode}
          onValueChange={onModeChange}
          options={options}
        />

        {mode === 'custom' ? (
          <>
            {/* Custom : saisie libre objectif + temps */}
            <ObjectiveTimePicker
              mode={mode}
              objectif={objectif}
              onObjectifChange={setObjectif}
              temps={temps}
              onTempsChange={text => setTemps(parseInt(text, 10) || 0)}
            />
            <AutoAdvanceSwitch enabled={autoAdvance} onToggle={toggleAutoAdvance} />
          </>
        ) : (
          <>
            {/* Affichage du temps imposé (désactivé) */}
              <ObjectiveTimePicker
                mode={mode}
                objectif={objectif}
                onObjectifChange={text => setObjectif(text)}                 // ← il manquait !
                temps={playTime}
                onTempsChange={text => setTemps(parseInt(text, 10) || 0)}    // ← idem
                disabled
              />
          </>
        )}

        {/* Affichage du meilleur score */}
        <RecordDisplay
          score={lastScore}
          time={lastTime}
          hidden={mode === 'custom'}
        />

        {/* Bouton Démarrer */}
        <PlayButton
          onPress={() =>
            navigation.navigate('Decompte', {
              objectif: parseInt(objectif, 10),
              temps: playTime,
              mode,
              variant: selectedVariant?.id,
              digitCount,
              autoAdvance,
            })
          }
        />

        <SecondaryButton onPress={() => {/* action */}}>
          Learn more
        </SecondaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content:   { flex: 1, paddingHorizontal: 20 },
});
