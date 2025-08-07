// screens/memo//NumbersScreen/NumbersScreen.jsx - Version avec import des styles
import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// 🎯 Import des styles depuis le fichier séparé
import { styles } from './styles';

import AutoAdvanceSwitch from '../../../components/atoms/AutoAdvanceSwitch/AutoAdvanceSwitch';
import useDigitPicker from '../../../hooks/useDigitPicker';
import { ModePicker } from '../../../components/molecules/ModePicker/ModePicker';
import DigitPickerModal from '../../../components/molecules/DigitPickerModal/DigitPickerModal';
import PlayButton from '../../../components/atoms/PlayButton/PlayButton';
import { SecondaryButton } from '../../../components/atoms/SecondaryButton/SecondaryButton';
import RecordDisplay from '../../../components/molecules/RecordDisplay/RecordDisplay';
import ObjectiveTimePicker from '../../../components/molecules/ObjectiveTimePicker/ObjectiveTimePicker';
import HighlightBoxSetter from '../../../components/atoms/HighlightBoxSetter/HighlightBoxSetter';
import IAMVariantPickerModal from '../../../components/molecules/IAMVariantPickerModal/IAMVariantPickerModal';

import useMode from '../../../hooks/useMode';
import { modeOptions } from '../../../config/gameConfig';
import useObjective from '../../../hooks/useObjective';
import useCountdown from '../../../hooks/useCountdown';
import useAutoAdvancePreference from '../../../hooks/useAutoAdvancePreference';
import useFetchBestScore from '../../../hooks/useFetchBestScore';
import { useModeVariants } from '../../../hooks/useModeVariants';

export default function NumbersScreen() {
  const navigation = useNavigation();
  const [iamVariantModalVisible, setIamVariantModalVisible] = useState(false);

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

  // Objectif (nombre d'items) persistant par mode
  const defaultObj = mode === 'memory-league' ? '60' : '';
  const { objectif, setObjectif } = useObjective(`numbers:objectif:${mode}`, defaultObj);

  // Temps (pour custom) géré par le hook countdown
  const { temps, setTemps } = useCountdown(mode);

  // Auto-advance uniquement pour custom
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode);

  // Variants (durées) pour le mode/disciplines standards
  const {
    variants,
    loading: variantsLoading,
    selectedVariant,
    setSelectedVariant,
  } = useModeVariants('numbers', mode);

  // Dernier meilleur score pour le variant sélectionné
  const variantId = selectedVariant?.id;
  const lastScore = useFetchBestScore(variantId);

  // Calcul du temps de jeu : soit saisi en custom, soit variant choisi
  const playTime = mode === 'custom'
    ? temps
    : selectedVariant?.duration_seconds ?? 0;

  // Gestion du modal IAM variants
  const openIamVariantModal = () => {
    if (mode === 'iam') {
      setIamVariantModalVisible(true);
    }
  };

  const closeIamVariantModal = () => {
    setIamVariantModalVisible(false);
  };

  const handleIamVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[
        styles.content, 
        mode === 'custom' && { justifyContent: 'flex-start' }
      ]}>
        
        {/* 🎯 SECTION DU HAUT - Configuration */}
        <View style={styles.topSection}>
          <HighlightBoxSetter
            style={styles.highlightBoxSetter}
            label={previewDigits.join('')}
            icon={<Ionicons name="settings-outline" size={24} color="#667eea" />}
            onPress={openModal}
          />
          
          <ModePicker
            style={styles.modePicker}
            variant="numbers"
            selectedValue={mode}
            onValueChange={onModeChange}
            options={options}
          />
        </View>

        {/* 🎯 SECTION DU MILIEU - Paramètres du jeu */}
        <View style={styles.middleSection}>
          {mode === 'custom' ? (
            <>
              <ObjectiveTimePicker
                style={styles.objectiveTimePicker}
                mode={mode}
                objectif={objectif}
                onObjectifChange={setObjectif}
                temps={temps}
                onTempsChange={text => setTemps(parseInt(text, 10) || 0)}
              />
              <AutoAdvanceSwitch 
                style={styles.autoAdvanceSwitch}
                enabled={autoAdvance} 
                onToggle={toggleAutoAdvance} 
              />
            </>
          ) : (
            <ObjectiveTimePicker
              style={styles.objectiveTimePicker}
              mode={mode}
              objectif={objectif}
              onObjectifChange={text => setObjectif(text)}
              temps={playTime}
              onTempsChange={text => setTemps(parseInt(text, 10) || 0)}
              variants={variants}
              selectedVariant={selectedVariant}
              onVariantSelect={handleIamVariantSelect}
              onVariantPickerOpen={openIamVariantModal}
            />
          )}

          <RecordDisplay
            style={styles.recordDisplay}
            score={lastScore}
            time={playTime}
            hidden={mode === 'custom' || variantId == null}
          />
        </View>

        {/* 🎯 SECTION DU BAS - Actions principales */}
        <View style={styles.bottomSection}>
          <PlayButton
            style={styles.playButton}
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

          <SecondaryButton 
            style={styles.secondaryButton}
            variant="secondary"
            onPress={() => {/* action */}}
          >
            Learn more
          </SecondaryButton>
        </View>

        {/* Modales */}
        <DigitPickerModal
          visible={modalVisible}
          digitCount={digitCount}
          onValueChange={setDigitCount}
          onClose={closeModal}
        />

        <IAMVariantPickerModal
          visible={iamVariantModalVisible}
          variants={variants}
          selectedVariant={selectedVariant}
          onSelect={handleIamVariantSelect}
          onClose={closeIamVariantModal}
        />
      </View>
    </SafeAreaView>
  );
}