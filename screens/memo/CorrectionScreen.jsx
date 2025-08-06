// src/screens/CorrectionScreen.jsx
import { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Alert } from 'react-native';
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton';
import BorderedContainer from '../../components/atoms/BorderedContainer/BorderedContainer';
import CorrectionGrid from '../../components/organisms/CorrectionGrid/CorrectionGrid';
import useSaveBestScore from '../../hooks/useSaveBestScore';

export default function CorrectionScreen({ route, navigation }) {
  const { inputs = [], numbers = [], temps = 0, variant } = route.params || {};
  const total = inputs.length;
  const score = inputs.reduce(
    (acc, v, i) => acc + (v === String(numbers[i]) ? 1 : 0),
    0
  );

  const { saveBestScore, loading, error } = useSaveBestScore();

  // Auto-save du best score à l'affichage de l'écran
  useEffect(() => {
    saveBestScore(variant, score)
      .then(({ updated }) => {
        if (updated) {
          Alert.alert('🎉 Nouveau record !', `Score : ${score} / ${total}`);
        }
      })
      .catch((e) => {
        console.error('Erreur sauvegarde best score:', e);
        Alert.alert('Erreur', "Impossible de sauvegarder le record");
      });
  }, [variant, score]);

  return (
    <SafeAreaView style={styles.container}>
      <BorderedContainer style={styles.gridContainer}>
        <CorrectionGrid inputs={inputs} numbers={numbers} cols={6} />
      </BorderedContainer>

      <Text style={styles.scoreText}>Score : {score} / {total}</Text>

      <SecondaryButton
        style={styles.retryButton}
        onPress={() => navigation.navigate('Numbers')}
        disabled={loading}
      >
        {loading ? 'Chargement…' : 'Retry'}
      </SecondaryButton>

      {error && <Text style={styles.errorText}>Erreur sauvegarde du record</Text>}
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
  retryButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  errorText: {
    color: '#f00',
    textAlign: 'center',
    marginTop: 8,
  },
});
