// screens/memo/Names/NamesScreen/NamesScreen.jsx
import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Import des styles depuis le fichier séparé
import { styles } from './styles';

import AutoAdvanceSwitch from '../../../../components/atoms/Commons/AutoAdvanceSwitch/AutoAdvanceSwitch';
import { ModePicker } from '../../../../components/molecules/Commons/ModePicker/ModePicker';
import PlayButton from '../../../../components/atoms/Commons/PlayButton/PlayButton';
import { SecondaryButton } from '../../../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import RecordDisplay from '../../../../components/molecules/Commons/RecordDisplay/RecordDisplay';
import ObjectiveTimePicker from '../../../../components/molecules/Commons/ObjectiveTimePicker/ObjectiveTimePicker';
import IAMVariantPickerModal from '../../../../components/molecules/Commons/IAMVariantPickerModal/IAMVariantPickerModal';
import SpecificRevisionsSelector from '../../../../components/atoms/Commons/SpecificRevisionsSelector/SpecificRevisionsSelector';
import SpecificRevisionsModalNumbers from '../../../../components/molecules/Commons/SpecificRevisionsModalNumbers/SpecificRevisionsModalNumbers';
import DisciplineHeader from '../../../../components/molecules/Commons/DisciplineHeader/DisciplineHeader';

import useMode from '../../../../hooks/useMode';
import { modeOptions } from '../../../../config/gameConfig';
import useObjective from '../../../../hooks/useObjective';
import useCountdown from '../../../../hooks/useCountdown';
import useAutoAdvancePreference from '../../../../hooks/useAutoAdvancePreference';
import useFetchBestScore from '../../../../hooks/useFetchBestScore';
import { useModeVariants } from '../../../../hooks/useModeVariants';

export default function NamesScreen() {
  const navigation = useNavigation();
  const [iamVariantModalVisible, setIamVariantModalVisible] = useState(false);
  const [specificRevisionsModalVisible, setSpecificRevisionsModalVisible] = useState(false);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  // Mode de jeu (memory-league, iam, custom…)
  const { mode, onModeChange, options } = useMode('memory-league', modeOptions);

  // Objectif (nombre d'items) persistant par mode
  const defaultObj = mode === 'memory-league' ? '60' : '';
  const { objectif, setObjectif } = useObjective(`names:objectif:${mode}`, defaultObj);

  // Temps (pour custom) géré par le hook countdown
  const { temps, setTemps } = useCountdown(mode);

  // Auto-advance uniquement pour custom
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode);

  // Variants (durées) pour le mode/disciplines standards - variants 23-26 pour Names
  const {
    variants,
    loading: variantsLoading,
    selectedVariant,
    setSelectedVariant,
  } = useModeVariants('names', mode);

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

  // Gestion du modal SpecificRevisions
  const openSpecificRevisionsModal = () => {
    setSpecificRevisionsModalVisible(true);
  };

  const closeSpecificRevisionsModal = () => {
    setSpecificRevisionsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DisciplineHeader disciplineName="Names 👤" />
      <View style={[
        styles.content, 
        mode === 'custom' && { justifyContent: 'flex-start' }
      ]}>
        
        {/* SECTION DU HAUT - Configuration */}
        <View style={styles.topSection}>
          <ModePicker
            style={styles.modePicker}
            variant="names"
            selectedValue={mode}
            onValueChange={onModeChange}
            options={options}
          />
        </View>

        {/* SECTION DU MILIEU - Paramètres du jeu */}
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
              <SpecificRevisionsSelector
                style={styles.specificRevisionsSelector}
                onPress={openSpecificRevisionsModal}
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

        {/* SECTION DU BAS - Actions principales */}
        <View style={styles.bottomSection}>
          <PlayButton
            style={styles.playButton}
            onPress={() =>
              navigation.navigate('Decompte', {
                objectif: parseInt(objectif, 10),
                temps: playTime,
                mode,
                variant: selectedVariant?.id,
                autoAdvance,
                discipline: 'names',
                // Paramètres pour révisions spécifiques
                fromValue: mode === 'custom' ? fromValue : undefined,
                toValue: mode === 'custom' ? toValue : undefined,
                useSpecificRange: mode === 'custom' && fromValue > 0 && toValue > 0 && fromValue <= toValue
              })
            }
          />

          <SecondaryButton 
            style={styles.secondaryButton}
            variant="secondary"
            onPress={() => navigation.navigate('Article', { articleId: 'la-memoire-en-action' })}
          >
            Learn more
          </SecondaryButton>
        </View>

        {/* Modales */}
        <IAMVariantPickerModal
          visible={iamVariantModalVisible}
          variants={variants}
          selectedVariant={selectedVariant}
          onSelect={handleIamVariantSelect}
          onClose={closeIamVariantModal}
        />

        <SpecificRevisionsModalNumbers
          visible={specificRevisionsModalVisible}
          fromValue={fromValue}
          toValue={toValue}
          onFromValueChange={setFromValue}
          onToValueChange={setToValue}
          onClose={closeSpecificRevisionsModal}
        />
      </View>
    </SafeAreaView>
  );
}