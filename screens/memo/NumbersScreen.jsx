// screens/NumbersScreen.jsx
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountContext } from '../../contexts/AccountContext';
import AutoAdvanceSwitch from '../../components/atoms/AutoAdvanceSwitch/AutoAdvanceSwitch';
import HighlightBox from '../../components/atoms/HighlightBox/HighlightBox';
import useDigitPicker from '../../hooks/useDigitPicker';
import { ModePicker } from '../../components/molecules/ModePicker/ModePicker';
import DigitPickerModal from '../../components/molecules/DigitPickerModal/DigitPickerModal'
import PlayButton from '../../components/atoms/PlayButton/PlayButton'
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton';
import RecordDisplay from '../../components/molecules/RecordDisplay/RecordDisplay'; 
import ObjectiveTimePicker from '../../components/molecules/ObjectiveTimePicker/ObjectiveTimePicker';


export default function NumbersScreen() {
  const navigation = useNavigation();
  const { current } = useContext(AccountContext);

  // 0) Digit picker
  const {
    digitCount,
    previewDigits,
    modalVisible,
    openModal,
    closeModal,
    setDigitCount,
  } = useDigitPicker(6);

  // 1) Mode, objectif & time
  const [mode, setMode] = useState('memory-league');
  const [objectif, setObjectif] = useState('');
  const [temps, setTemps] = useState(60);

 const modeOptions = [
   { label: 'Memory League', value: 'memory-league' },
   { label: 'IAM',           value: 'iam' },
   { label: 'Personnalisé',  value: 'custom' },
];

  // 1b) Auto-advance
  const [autoAdvance, setAutoAdvance] = useState(false);
  const STORAGE_KEY = '@numbers_auto_advance';
  useEffect(() => {
    if (mode === 'custom') {
      AsyncStorage.getItem(STORAGE_KEY).then(value => {
        if (value !== null) setAutoAdvance(value === 'true');
      });
    }
  }, [mode]);
  const onToggleAuto = newValue => {
    setAutoAdvance(newValue);
    AsyncStorage.setItem(STORAGE_KEY, newValue.toString());
  };

  // 2) Records
  const allNumRecs = current?.records?.numbers || {};
  const discRec = allNumRecs[mode] || { score: 0, time: 0 };

  // 3) Local display state
  const [lastScore, setLastScore] = useState(discRec.score);
  const [lastTime, setLastTime] = useState(discRec.time);

  // Mode change handler
  const onModeChange = value => {
    setMode(value);
    if (value === 'iam') setTemps(300);
    else if (value === 'memory-league') setTemps(60);
    else setTemps(0);
  };

  // Sync on focus
  useFocusEffect(
    useCallback(() => {
      setLastScore(discRec.score);
      setLastTime(discRec.time);
    }, [discRec.score, discRec.time]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.content,
          mode === 'custom' && { justifyContent: 'flex-start' },
        ]}
      >
        {/* HighlightBox */}
        <HighlightBox
          label={previewDigits.join('')}
          icon={<Ionicons name="settings-outline" size={24} color="#fff" />}
          onPress={openModal}
        />
       
     {/* notre modal */}
     <DigitPickerModal
       visible={modalVisible}
       digitCount={digitCount}
       onValueChange={setDigitCount}
       onClose={closeModal}
     />

        {/* ModePicker */}
        <ModePicker
          variant="numbers"
          selectedValue={mode}
          onValueChange={onModeChange}
          options={modeOptions} // [{ label,value }]
        />

        {/* Objective & Time */}
        <ObjectiveTimePicker
          mode={mode}
          objectif={objectif}
          onObjectifChange={setObjectif}
          temps={temps}
          onTempsChange={text => setTemps(parseInt(text, 10) || 0)}
        />

        {mode === 'custom' && (
          <AutoAdvanceSwitch enabled={autoAdvance} onToggle={onToggleAuto} />
        )}

        <RecordDisplay
          score={lastScore}
          time={lastTime}
          hidden={mode === 'custom'}
        />

         <PlayButton
           onPress={() =>
             navigation.navigate('Decompte', {
               objectif: parseInt(objectif, 10),
               temps,
               mode,
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
  content: { flex: 1, paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
});