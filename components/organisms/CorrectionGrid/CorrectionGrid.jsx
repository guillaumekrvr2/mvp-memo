// components/organisms/CorrectionGrid/CorrectionGrid.jsx
import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import useCorrectionGrid from '../../../hooks/useCorrectionGrid';
import { CorrectionCell } from '../../atoms/Numbers/CorrectionCell/CorrectionCell';
import styles from './styles';

export default function CorrectionGrid({ inputs, numbers, cols }) {
  const rows = useCorrectionGrid(inputs, cols);
  const [revealed, setRevealed] = useState(new Set());

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {rows.map((row, rIdx) => (
          <View key={rIdx} style={styles.row}>
            {row.map((val, cIdx) => {
              const idx = rIdx * cols + cIdx;
              const userValue = val || ''; // Valeur saisie par l'utilisateur
              const correctValue = String(numbers[idx]);
              const isEmpty = !userValue; // Cellule vide si pas de saisie
              
              return (
                <CorrectionCell
                  key={idx}
                  value={userValue}
                  correctValue={correctValue}
                  isRevealed={revealed.has(idx) || isEmpty} // Révéler si cliqué OU si vide
                  onReveal={() => setRevealed(prev => new Set(prev).add(idx))}
                />
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}