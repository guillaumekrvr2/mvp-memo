import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton';
import BorderedContainer from '../../components/atoms/BorderedContainer/BorderedContainer';
import CorrectionGrid from '../../components/organisms/CorrectionGrid/CorrectionGrid';
import useSaveRecord from '../../hooks/useSaveRecord';
import useAutoSaveRecord  from '../../hooks/useAutoSaveRecord';

export default function CorrectionScreen({ route, navigation }) {
  const { inputs = [], numbers = [], temps = 0, variant, } = route.params || {};
  const total = inputs.length;
  const score = inputs.reduce((acc, v, i) =>
    acc + (v === String(numbers[i]) ? 1 : 0), 0);

  // Hook manuel
  const saveRecord = useSaveRecord();

  // Hook auto-save
  useAutoSaveRecord('numbers', variant, score, temps);

  return (
    <SafeAreaView style={styles.container}>
      <BorderedContainer style={styles.gridContainer}>
        <CorrectionGrid inputs={inputs} numbers={numbers} cols={6} />
      </BorderedContainer>

      <Text style={styles.scoreText}>Score : {score} / {total}</Text>

      <SecondaryButton
              style={styles.retryButton}
              onPress={async () => {
               console.log('🔄 Retry pressed', { variant, score, temps });
               try {
                 await saveRecord('numbers', { variant, score, time: temps });
                 console.log('✅ saveRecord succeeded');
                 navigation.navigate('Numbers');
               } catch (e) {
                 console.error('❌ saveRecord threw', e);
               }
             }}
            >
              Retry
      </SecondaryButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 30,
  },
  gridContainer: {
    width: '75%',
    height: '60%',
    alignSelf: 'center',
    marginVertical: 16,
  },
  scoreText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
});
