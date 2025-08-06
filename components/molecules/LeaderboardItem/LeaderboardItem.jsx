// src/components/molecules/LeaderboardItem/LeaderboardItem.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

/**
 * LeaderboardItem
 * Props :
 *  - player : objet joueur (avec .records)
 *  - discipline : clé de la discipline sélectionnée
 *  - mode : clé du mode de jeu sélectionné
 *  - disciplines : tableau des disciplines pour calcul global
 *  - variantId : ID du variant (pour modes basés sur variant : IAM, Memory League)
 *  - currentUserId : ID de l'utilisateur connecté pour le highlight
 *  - rank : position dans le classement (1, 2, 3...)
 */
export function LeaderboardItem({
  player,
  discipline,
  mode,
  disciplines,
  variantId,
  currentUserId,
  rank,
}) {
  // Vérifier si c'est l'utilisateur connecté
  const isCurrentUser = currentUserId && player.id === currentUserId;

  let text;

  // Cas IAM avec variantId
  if ((mode === 'iam' || mode === 'memory-league') && variantId != null) {
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
    <View style={[styles.row, isCurrentUser && styles.highlightedRow]}>
      <View style={styles.leftContent}>
        <Text style={[styles.rank, isCurrentUser && styles.highlightedText]}>
          #{rank}
        </Text>
        <Text style={[styles.name, isCurrentUser && styles.highlightedText]}>
          {player.firstName} {player.lastName}
        </Text>
        {isCurrentUser && (
          <Ionicons 
            name="person" 
            size={16} 
            color="#4CAF50" 
            style={styles.userIcon}
          />
        )}
      </View>
      <Text style={[styles.score, isCurrentUser && styles.highlightedText]}>
        {text}
      </Text>
    </View>
  );
}