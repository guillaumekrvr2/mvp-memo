// components/atoms/Commons/WordsHighlightBox/WordsHighlightBox.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

/**
 * WordsHighlightBox affiche un encadré avec des mots mis en avant.
 * Composant spécifique aux words avec ses propres styles.
 * @param {string} text - Les mots ou le contenu à afficher.
 */
export default function WordsHighlightBox({ text }) {
  // Séparer les mots si il y a un séparateur '|'
  const words = text.split(' | ');
  const hasMultipleWords = words.length > 1;

  return (
    <View style={styles.container}>
      {/* Effet de glow blur simulé avec plusieurs couches */}
      <View style={styles.innerGlow}>
        <View style={styles.glowLayer1} />
        <View style={styles.glowLayer2} />
        <View style={styles.glowLayer3} />
      </View>
      
      {hasMultipleWords ? (
        <View style={styles.wordsRow}>
          {/* Mot de gauche */}
          <Text style={[styles.highlightText, styles.leftWord]}>
            {words[0]}
          </Text>
          
          {/* Séparateur centré */}
          <Text style={[styles.highlightText, styles.separator]}>
            |
          </Text>
          
          {/* Mot de droite */}
          <Text style={[styles.highlightText, styles.rightWord]}>
            {words[1]}
          </Text>
        </View>
      ) : (
        <Text style={styles.highlightText}>{text}</Text>
      )}
    </View>
  );
}