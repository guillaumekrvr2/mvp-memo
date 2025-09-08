// screens/memo/Binaries/BinariesScreen/BinariesScreen.jsx - Version avec import des styles
import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// 🎯 Import des styles depuis le fichier séparé
import { styles } from './styles';

import AutoAdvanceSwitch from '../../../../components/atoms/Commons/AutoAdvanceSwitch/AutoAdvanceSwitch';
import useDigitPicker from '../../../../hooks/useDigitPicker';
import { ModePicker } from '../../../../components/molecules/Commons/ModePicker/ModePicker';
import DigitPickerModal from '../../../../components/molecules/Commons/DigitPickerModal/DigitPickerModal';
import PlayButton from '../../../../components/atoms/Commons/PlayButton/PlayButton';
import { SecondaryButton } from '../../../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import RecordDisplay from '../../../../components/molecules/Commons/RecordDisplay/RecordDisplay';
import ObjectiveTimePicker from '../../../../components/molecules/Commons/ObjectiveTimePicker/ObjectiveTimePicker';
import HighlightBoxSetter from '../../../../components/atoms/Commons/HighlightBoxSetter/HighlightBoxSetter';
import IAMVariantPickerModal from '../../../../components/molecules/Commons/IAMVariantPickerModal/IAMVariantPickerModal';
import DisciplineHeader from '../../../../components/molecules/Commons/DisciplineHeader/DisciplineHeader';

import useMode from '../../../../hooks/useMode';
import { modeOptions } from '../../../../config/gameConfig';
import useObjective from '../../../../hooks/useObjective';
import useCountdown from '../../../../hooks/useCountdown';
import useAutoAdvancePreference from '../../../../hooks/useAutoAdvancePreference';
import useFetchBestScore from '../../../../hooks/useFetchBestScore';
import { useModeVariants } from '../../../../hooks/useModeVariants';

export default function BinariesScreen() {
  const navigation = useNavigation();
  const [iamVariantModalVisible, setIamVariantModalVisible] = useState(false);

  // Digit picker pour le nombre de chiffres binaires - 6 par défaut
  const {
    digitCount,
    previewDigits,
    modalVisible,
    openModal,
    closeModal,
    setDigitCount,
  } = useDigitPicker(6);

  // Mode de jeu (iam, custom) - Memory League ne fait pas de binaires
  const binaryModeOptions = modeOptions.filter(option => option.value !== 'memory-league');
  const { mode, onModeChange, options } = useMode('iam', binaryModeOptions);

  // Objectif (nombre d'items) persistant par mode
  const defaultObj = '';
  const { objectif, setObjectif } = useObjective(`binaries:objectif:${mode}`, defaultObj);

  // Temps (pour custom) géré par le hook countdown
  const { temps, setTemps } = useCountdown(mode);

  // Auto-advance uniquement pour custom
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode);

  // Variants (durées) pour le mode/disciplines standards - discipline ID 10
  const {
    variants,
    loading: variantsLoading,
    selectedVariant,
    setSelectedVariant,
  } = useModeVariants('binaries', mode);

  // Dernier meilleur score pour le variant sélectionné
  const variantId = selectedVariant?.id;
  const lastScore = useFetchBestScore(variantId);

  // Calcul du temps de jeu : soit saisi en custom, soit variant choisi
  const playTime = mode === 'custom'
    ? temps
    : selectedVariant?.duration_seconds ?? 0;

  // On transforme previewDigits en binaires (0 et 1) basé sur la parité
  const previewBinaries = previewDigits.map(digit => digit % 2);

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
      <DisciplineHeader disciplineName="Binaries 💻" />
      <View style={[
        styles.content, 
        mode === 'custom' && { justifyContent: 'flex-start' }
      ]}>
        
        {/* 🎯 SECTION DU HAUT - Configuration */}
        <View style={styles.topSection}>
          <HighlightBoxSetter
            style={styles.highlightBoxSetter}
            label={previewBinaries.join('')}
            icon={<Ionicons name="settings-outline" size={24} color="#667eea" />}
            onPress={openModal}
          />
          
          <ModePicker
            style={styles.modePicker}
            variant="binaries"
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
                discipline: 'binaries' // 🎯 AJOUTÉ : Indique la discipline binaries
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
          title="Choisir le nombre de bits à afficher"
          min={1}
          max={9}
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