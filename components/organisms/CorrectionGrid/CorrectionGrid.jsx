// components/organisms/CorrectionGrid/CorrectionGrid.jsx
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import useCorrectionGrid from '../../../hooks/useCorrectionGrid';
import { CorrectionCell } from '../../atoms/CorrectionCell/CorrectionCell';
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
              return (
                <CorrectionCell
                  key={idx}
                  value={val}
                  correctValue={String(numbers[idx])}
                  isRevealed={revealed.has(idx)}
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
