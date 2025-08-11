// components/atoms/HighlightBox/HighlightBox.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

/**
 * HighlightBox affiche un encadré avec un texte mis en avant.
 * @param {string} text - Les chiffres ou le contenu à afficher.
 */
export default function HighlightBox({ text }) {
  return (
    <View style={styles.container}>
      {/* Effet de glow blur simulé avec plusieurs couches */}
      <View style={styles.innerGlow}>
        <View style={styles.glowLayer1} />
        <View style={styles.glowLayer2} />
        <View style={styles.glowLayer3} />
      </View>
      <Text style={styles.highlightText}>{text}</Text>
    </View>
  );
}