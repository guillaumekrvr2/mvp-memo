// components/atoms/BorderedContainer/BorderedContainer.jsx
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export default function BorderedContainer({ children, onLayout, style }) {
  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {/* Effet de glow interne comme HighlightBox */}
      <View style={styles.innerGlow}>
        <View style={styles.glowLayer1} />
        <View style={styles.glowLayer2} />
      </View>
      {children}
    </View>
  );
}