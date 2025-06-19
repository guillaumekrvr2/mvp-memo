// screens/NumbersScreen.jsx
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountContext } from '../contexts/AccountContext';
import AutoAdvanceSwitch from '../components/atoms/AutoAdvanceSwitch/AutoAdvanceSwitch';
import HighlightBox from '../components/atoms/HighlightBox/HighlightBox';
import useDigitPicker from '../hooks/useDigitPicker';
import { ModePicker } from '../components/molecules/ModePicker/ModePicker';
import DigitPickerModal from '../components/molecules/DigitPickerModal/DigitPickerModal'
import PlayButton from '../components/atoms/PlayButton/PlayButton'
import { SecondaryButton } from '../components/atoms/SecondaryButton/SecondaryButton';


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

       
     {/* notre nouvelle modal */}
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
        <View style={styles.row}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Objectif"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              value={objectif}
              onChangeText={setObjectif}
            />
          </View>
          {mode === 'memory-league' ? (
            <View style={styles.staticTimeBox}>
              <Text style={styles.staticTime}>1 minute</Text>
            </View>
          ) : mode === 'iam' ? (
            <View style={styles.staticTimeBox}>
              <Text style={styles.staticTime}>5 minutes</Text>
            </View>
          ) : (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Temps (s)"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                value={temps > 0 ? String(temps) : ''}
                onChangeText={text => setTemps(parseInt(text, 10) || 0)}
              />
            </View>
          )}
        </View>

        {mode === 'custom' && (
          <AutoAdvanceSwitch enabled={autoAdvance} onToggle={onToggleAuto} />
        )}

        <View style={styles.recordBox}>
          <Ionicons
            name="trophy-outline"
            size={20} 
            color={mode === 'custom' ? 'transparent' : '#fff'}
          />
          <Text
            style={[
              styles.recordText,
              mode === 'custom' && { color: 'transparent' },
            ]}
          >
            Last best : {lastScore} en {lastTime}s
          </Text>
        </View>

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
  inputBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, marginRight: 10, justifyContent: 'center' },
  input: { paddingHorizontal: 16, color: '#fff', fontSize: 16, textAlignVertical: 'center' },
  staticTimeBox: { flex: 1, backgroundColor: '#111', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  staticTime: { color: '#fff', fontSize: 16 },
  recordBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 12, marginBottom: 30, alignSelf: 'center' },
  recordText: { color: '#fff', fontSize: 16, marginLeft: 8 },
  learnMore: { alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#fff', borderRadius: 20 },
  learnMoreText: { color: '#000', fontSize: 16, fontWeight: '600' },
});