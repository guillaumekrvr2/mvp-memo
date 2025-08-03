// src/components/molecules/LeaderboardItem/LeaderboardItem.jsx
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

/**
 * LeaderboardItem
 * Props :
 *  - player : objet joueur (avec .records)
 *  - discipline : clé de la discipline sélectionnée
 *  - mode : clé du mode de jeu sélectionné
 *  - disciplines : tableau des disciplines pour calcul global
 *  - variantId : ID du variant (pour mode IAM)
 */
export function LeaderboardItem({
  player,
  discipline,
  mode,
  disciplines,
  variantId,
}) {
  let text;

  // Cas IAM avec variantId
  if (mode === 'iam' && variantId != null) {
    const rec = player.records?.[variantId];
    const score = rec?.score ?? 0;
    text = `${score} pts`;
  } else if (discipline === 'global') {
    const total = disciplines
      .filter(d => d.key !== 'global')
      .reduce((sum, d) => {
        const rec = player.records?.[d.key]?.[mode];
        return sum + (rec?.score || 0);
      }, 0);
    text = `${total} pts`;
  } else {
    const recContainer = player.records?.[discipline];
    let rec;
    if (recContainer && typeof recContainer === 'object') {
      rec = recContainer[mode];
    }
    if (rec) {
      text = `${rec.score} en ${rec.time}s`;
    } else {
      const fallback = typeof recContainer === 'number' ? recContainer : 0;
      text = `${fallback} pts`;
    }
  }

  return (
    <View style={styles.row}>
      <Text style={styles.name}>
        {player.firstName} {player.lastName}
      </Text>
      <Text style={styles.score}>{text}</Text>
    </View>
  );
}
