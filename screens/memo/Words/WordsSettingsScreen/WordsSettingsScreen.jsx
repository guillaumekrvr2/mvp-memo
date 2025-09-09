// screens/memo/Words/WordsScreen/WordsScreen.jsx
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
import HighlightBoxSetterWords from '../../../../components/atoms/Commons/HighlightBoxSetterWords/HighlightBoxSetterWords';
import IAMVariantPickerModal from '../../../../components/molecules/Commons/IAMVariantPickerModal/IAMVariantPickerModal';
import DisciplineHeader from '../../../../components/molecules/Commons/DisciplineHeader/DisciplineHeader';

// 🎯 Imports des hooks - chemins corrects
import useMode from '../../../../hooks/useMode';
import { modeOptions } from '../../../../config/gameConfig';
import useObjective from '../../../../hooks/useObjective';
import useCountdown from '../../../../hooks/useCountdown';
import useAutoAdvancePreference from '../../../../hooks/useAutoAdvancePreference';
import useFetchBestScore from '../../../../hooks/useFetchBestScore';
import { useModeVariants } from '../../../../hooks/useModeVariants';

export default function WordsScreen() {
  const navigation = useNavigation();
  const [iamVariantModalVisible, setIamVariantModalVisible] = useState(false);

  // 📝 Digit picker pour le nombre de mots simultanés
  const {
    digitCount: wordsCount,
    previewDigits: previewWords,
    modalVisible,
    openModal,
    closeModal,
    setDigitCount: setWordsCount,
  } = useDigitPicker(1); // 📝 Par défaut 1 mot

  // Mode de jeu (memory-league, iam, custom…)
  const { mode, onModeChange, options } = useMode('memory-league', modeOptions);

  // 📝 Objectif (nombre de mots) persistant par mode
  const defaultObj = mode === 'memory-league' ? '20' : ''; // 20 mots par défaut
  const { objectif, setObjectif } = useObjective(`words:objectif:${mode}`, defaultObj);

  // Temps (pour custom) géré par le hook countdown
  const { temps, setTemps } = useCountdown(mode);

  // Auto-advance uniquement pour custom
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode);

  // 📝 Variants (durées) pour le mode words depuis la DB (slug: 'words')
  const {
    variants,
    loading: variantsLoading,
    selectedVariant,
    setSelectedVariant,
  } = useModeVariants('words', mode);

  // Dernier meilleur score pour le variant sélectionné
  const variantId = selectedVariant?.id;
  const lastScore = useFetchBestScore(variantId);

  // Calcul du temps de jeu : soit saisi en custom, soit variant choisi
  const playTime = mode === 'custom'
    ? temps
    : selectedVariant?.duration_seconds ?? 300; // 5 minutes par défaut

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


  // 📝 Handler pour le bouton Play avec debug
  const handlePlay = () => {
    const navigationParams = {
      objectif: parseInt(objectif, 10),
      temps: playTime,
      mode,
      variant: selectedVariant?.id,
      wordsCount, // 📝 CLEF : Paramètre spécifique aux mots
      autoAdvance,
      discipline: 'words', // 📝 CLEF : Indique la discipline
      modeVariantId: selectedVariant?.id
    }
    
    console.log('📝 WordsScreen - Navigation params:', navigationParams)
    
    navigation.navigate('Decompte', navigationParams)
  }

  return (
    <SafeAreaView style={styles.container}>
      <DisciplineHeader disciplineName="Words 📝" />
      <View style={[
        styles.content, 
        mode === 'custom' && { justifyContent: 'flex-start' }
      ]}>
        
        {/* 🎯 SECTION DU HAUT - Configuration */}
        <View style={styles.topSection}>
          <HighlightBoxSetterWords
            style={styles.highlightBoxSetter}
            wordsCount={wordsCount}
            icon={<Ionicons name="library-outline" size={24} color="#667eea" />}
            onPress={openModal}
          />
          
          <ModePicker
            style={styles.modePicker}
            variant="words"
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
            onPress={handlePlay} // 📝 Utilise le handler avec debug
          />

          <SecondaryButton 
            style={styles.secondaryButton}
            variant="secondary"
            onPress={() => navigation.navigate('Article', { articleId: '5' })} // ID à définir pour Words
          >
            Learn more
          </SecondaryButton>
        </View>

        {/* Modales */}
        <DigitPickerModal
          visible={modalVisible}
          digitCount={wordsCount}
          onValueChange={setWordsCount}
          onClose={closeModal}
          title="Nombre de mots simultanés" // 📝 Titre personnalisé
          min={1}
          max={3} // 📝 Maximum 3 mots simultanés
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