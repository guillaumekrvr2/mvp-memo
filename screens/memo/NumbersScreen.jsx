// screens/NumbersScreen.jsx
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AutoAdvanceSwitch from '../../components/atoms/AutoAdvanceSwitch/AutoAdvanceSwitch';
import useDigitPicker from '../../hooks/useDigitPicker';
import { ModePicker } from '../../components/molecules/ModePicker/ModePicker';
import DigitPickerModal from '../../components/molecules/DigitPickerModal/DigitPickerModal'
import PlayButton from '../../components/atoms/PlayButton/PlayButton'
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton';
import RecordDisplay from '../../components/molecules/RecordDisplay/RecordDisplay'; 
import ObjectiveTimePicker from '../../components/molecules/ObjectiveTimePicker/ObjectiveTimePicker';
import useMode from '../../hooks/useMode';
import { modeOptions } from '../../config/gameConfig';
import useObjective from '../../hooks/useObjective';
import useCountdown from '../../hooks/useCountdown';
import useAutoAdvancePreference from '../../hooks/useAutoAdvancePreference';
import useRecord from '../../hooks/useRecord';
import HighlightBoxSetter from '../../components/atoms/HighlightBoxSetter/HighlightBoxSetter';


export default function NumbersScreen() {
  const navigation = useNavigation();
  const { digitCount, previewDigits, modalVisible, openModal, closeModal, setDigitCount } = useDigitPicker(6);
  const { mode, onModeChange, options } = useMode('memory-league', modeOptions);
  const defaultObj = mode === 'memory-league' ? '60' : '';
  const { objectif, setObjectif } = useObjective(
  `numbers:objectif:${mode}`,
  defaultObj
  );
  const { temps, setTemps } = useCountdown(mode);
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode);
  const { lastScore, lastTime } = useRecord('numbers', mode);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.content,
          mode === 'custom' && { justifyContent: 'flex-start' },
        ]}
      >
        {/* HighlightBox */}
        <HighlightBoxSetter
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
          options={options} // [{ label,value }]
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
          <AutoAdvanceSwitch enabled={autoAdvance} onToggle={toggleAutoAdvance} />
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
});