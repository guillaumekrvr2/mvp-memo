// screens/memo/Cards/CardsSettingsScreen/CardsSettingsScreen.jsx
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// 🎯 Import des styles depuis le fichier séparé
import { styles } from './styles';

// 🎯 Imports des composants - chemins corrects basés sur la structure du projet
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
import SpecificRevisionsSelector from '../../../../components/atoms/Commons/SpecificRevisionsSelector/SpecificRevisionsSelector';
import SpecificRevisionsModalCards from '../../../../components/molecules/Commons/SpecificRevisionsModalCards/SpecificRevisionsModalCards';

// 🎯 Imports des hooks - chemins corrects
import useMode from '../../../../hooks/useMode';
import { modeOptions } from '../../../../config/gameConfig';
import useObjective from '../../../../hooks/useObjective';
import useCountdown from '../../../../hooks/useCountdown';
import useAutoAdvancePreference from '../../../../hooks/useAutoAdvancePreference';
import useFetchBestScore from '../../../../hooks/useFetchBestScore';
import { useModeVariants } from '../../../../hooks/useModeVariants';

export default function CardsSettingsScreen() {
  const navigation = useNavigation();
  const [iamVariantModalVisible, setIamVariantModalVisible] = useState(false);
  const [specificRevisionsModalVisible, setSpecificRevisionsModalVisible] = useState(false);
  const [fromValue, setFromValue] = useState(2);
  const [toValue, setToValue] = useState(14);
  const [cardFilters, setCardFilters] = useState(null);

  // 🃏 Digit picker pour le nombre de cartes simultanées
  const {
    digitCount: cardsCount,
    previewDigits: previewCards,
    modalVisible,
    openModal,
    closeModal,
    setDigitCount: setCardsCount,
  } = useDigitPicker(1); // 🃏 CORRECTION : Par défaut 1 carte (pas 3)

  // Mode de jeu (memory-league, iam, custom…)
  const { mode, onModeChange, options } = useMode('memory-league', modeOptions);

  // 🃏 Objectif (nombre de cartes) persistant par mode
  const defaultObj = mode === 'memory-league' ? '52' : ''; // Jeu complet par défaut
  const { objectif, setObjectif } = useObjective(`cards:objectif:${mode}`, defaultObj);

  // Temps (pour custom) géré par le hook countdown
  const { temps, setTemps } = useCountdown(mode);

  // Auto-advance uniquement pour custom
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode);

  // 🃏 Variants (durées) pour le mode cards depuis la DB (discipline_id: 8)
  const {
    variants,
    loading: variantsLoading,
    selectedVariant,
    setSelectedVariant,
  } = useModeVariants('cards', mode);

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

  const handleSpecificRevisionsConfirm = (filterParams) => {
    setCardFilters(filterParams);
    console.log('🎴 Card filters set:', filterParams);
  };

  // 🃏 Fonction pour générer l'affichage des cartes dans le HighlightBoxSetter
  const getCardsPreview = () => {
    const cardSymbols = ['🃏', '🃏', '🃏', '🃏']; // Exemples de cartes Unicode
    return Array.from({ length: cardsCount }, (_, i) => 
      cardSymbols[i % cardSymbols.length]
    ).join(' ');
  };

  // 🃏 Handler pour le bouton Play avec debug
  const handlePlay = () => {
    const navigationParams = {
      objectif: parseInt(objectif, 10),
      temps: playTime,
      mode,
      variant: selectedVariant?.id,
      cardsCount, // 🃏 CLEF : Paramètre spécifique aux cartes
      autoAdvance,
      discipline: 'cards', // 🃏 CLEF : Indique la discipline
      cardFilters // 🎯 NOUVEAU : Filtres de cartes pour la mémorisation
    }
    
    
    navigation.navigate('Decompte', navigationParams)
  }

  return (
    <SafeAreaView style={styles.container}>
      <DisciplineHeader disciplineName="Cards 🃏" />
      <View style={[
        styles.content, 
        mode === 'custom' && { justifyContent: 'flex-start' }
      ]}>
        
        {/* 🎯 SECTION DU HAUT - Configuration */}
        <View style={styles.topSection}>
          <HighlightBoxSetter
            style={styles.highlightBoxSetter}
            label={getCardsPreview()}
            icon={<Ionicons name="settings-outline" size={24} color="#764ba2" />}
            onPress={openModal}
          />
          
          <ModePicker
            style={styles.modePicker}
            variant="cards"
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

        {/* 🎯 SECTION DU BAS - Actions principales */}
        <View style={styles.bottomSection}>
          <PlayButton
            style={styles.playButton}
            onPress={handlePlay} // 🃏 Utilise le handler avec debug
          />

          <SecondaryButton 
            style={styles.secondaryButton}
            variant="secondary"
            onPress={() => navigation.navigate('Article', { articleId: '4' })}
          >
            Learn more
          </SecondaryButton>
        </View>

        {/* Modales */}
        <DigitPickerModal
          visible={modalVisible}
          digitCount={cardsCount}
          onValueChange={setCardsCount}
          onClose={closeModal}
          title="Nombre de cartes simultanées" // 🃏 Titre personnalisé
          min={1}
          max={3} // 🃏 Maximum 3 cartes simultanées
        />

        <IAMVariantPickerModal
          visible={iamVariantModalVisible}
          variants={variants}
          selectedVariant={selectedVariant}
          onSelect={handleIamVariantSelect}
          onClose={closeIamVariantModal}
        />

        <SpecificRevisionsModalCards
          visible={specificRevisionsModalVisible}
          fromValue={fromValue}
          toValue={toValue}
          onFromValueChange={setFromValue}
          onToValueChange={setToValue}
          onClose={closeSpecificRevisionsModal}
          onConfirm={handleSpecificRevisionsConfirm}
        />
      </View>
    </SafeAreaView>
  );
}