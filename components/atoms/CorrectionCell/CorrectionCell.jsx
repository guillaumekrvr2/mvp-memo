// components/atoms/CorrectionCell/CorrectionCell.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function CorrectionCell({
  value,
  correctValue,
  isRevealed,
  onReveal,
  disabled
}) {
  const isCorrect = value === correctValue;
  const display = isCorrect || isRevealed ? correctValue : value;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        !isCorrect && styles.wrongCell
      ]}
      disabled={isCorrect || disabled}
      onPress={onReveal}
    >
      <Text style={[styles.cellText, !isCorrect && styles.wrongText]}>
        {display}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: { width: 42, height: 42, justifyContent: 'center', alignItems: 'center' },
  wrongCell: { backgroundColor: '#333' },
  cellText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  wrongText: { color: '#888' }
});
