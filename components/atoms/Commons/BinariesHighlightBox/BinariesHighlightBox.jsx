import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

/**
 * BinariesHighlightBox affiche un encadré avec des binaires mis en avant organisés en matrice.
 * @param {string} text - Les binaires à afficher (ex: "101011").
 * @param {number} columns - Nombre de colonnes de la matrice.
 * @param {number} rows - Nombre de lignes de la matrice.
 */
export default function BinariesHighlightBox({ text, columns = 3, rows = 2 }) {

  // Si pas de texte, affichage vide (juste le container avec glow)
  if (!text || text.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.innerGlow}>
          <View style={styles.glowLayer1} />
          <View style={styles.glowLayer2} />
          <View style={styles.glowLayer3} />
        </View>
        {/* Pas de texte affiché pendant le chargement */}
      </View>
    );
  }

  // Organiser les binaires en matrice selon columns et rows
  const organizeInMatrix = (binaryString) => {
    const binaryArray = binaryString.split('');
    const matrix = [];

    for (let row = 0; row < rows; row++) {
      const rowArray = [];
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        // Utiliser le binaire correspondant ou une cellule vide si pas assez de données
        rowArray.push(binaryArray[index] || '');
      }
      matrix.push(rowArray);
    }

    return matrix;
  };

  const binaryMatrix = organizeInMatrix(text);

  return (
    <View style={styles.container}>
      {/* Effet de glow blur simulé avec plusieurs couches */}
      <View style={styles.innerGlow}>
        <View style={styles.glowLayer1} />
        <View style={styles.glowLayer2} />
        <View style={styles.glowLayer3} />
      </View>

      {/* Matrice des binaires */}
      <View style={styles.matrixContainer}>
        {binaryMatrix.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.matrixRow}>
            {row.map((digit, colIndex) => (
              <Text
                key={`${rowIndex}-${colIndex}`}
                style={styles.binaryDigit}
              >
                {digit}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}