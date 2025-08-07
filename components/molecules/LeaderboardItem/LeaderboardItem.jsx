// components/molecules/LeaderboardItem/LeaderboardItem.jsx
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
  
  // Déterminer l'emoji du rang
  const getRankEmoji = (position) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return null;
    }
  };

  const rankEmoji = getRankEmoji(rank);

  let text;

  // Cas spécifique : discipline numbers avec variantId
  if (discipline === 'numbers' && variantId != null) {
    const rec = player.records?.[variantId];
    const score = rec?.score ?? 0;
    text = `${score} pts`;
  }
  // Cas IAM/Memory League avec variantId (autres disciplines)
  else if ((mode === 'iam' || mode === 'memory-league') && variantId != null) {
    const rec = player.records?.[variantId];
    const score = rec?.score ?? 0;
    text = `${score} pts`;
  } 
  // Cas discipline globale
  else if (discipline === 'global') {
    const total = disciplines
      .filter(d => d.key !== 'global')
      .reduce((sum, d) => {
        const rec = player.records?.[d.key]?.[mode];
        return sum + (rec?.score || 0);
      }, 0);
    text = `${total} pts`;
  } 
  // Cas par défaut : structure records[discipline][mode]
  else {
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
    <View style={[styles.container, isCurrentUser && styles.currentUserContainer]}>
      <View style={styles.leftSection}>
        {/* Rang avec emoji pour les 3 premiers */}
        <View style={styles.rankContainer}>
          {rankEmoji ? (
            <Text style={styles.rankEmoji}>{rankEmoji}</Text>
          ) : (
            <Text style={[styles.rank, isCurrentUser && styles.currentUserText]}>
              #{rank}
            </Text>
          )}
        </View>

        {/* Avatar moderne */}
        <View style={[styles.avatarContainer, isCurrentUser && styles.currentUserAvatar]}>
          <Text style={styles.avatarText}>
            {player.firstName ? player.firstName.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>

        {/* Informations joueur */}
        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, isCurrentUser && styles.currentUserText]}>
            {player.firstName} {player.lastName}
          </Text>

        </View>
      </View>

      {/* Score avec badge moderne */}
      <View style={[styles.scoreContainer, isCurrentUser && styles.currentUserScoreContainer]}>
        <Text style={[styles.scoreText, isCurrentUser && styles.currentUserText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}