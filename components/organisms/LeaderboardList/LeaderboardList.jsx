// src/components/organisms/LeaderboardList/LeaderboardList.jsx
import React from 'react';
import { FlatList, Text } from 'react-native';
import styles from './styles';
import { LeaderboardItem } from '../../molecules/LeaderboardItem/LeaderboardItem';

/**
 * LeaderboardList
 * Organisme pour afficher la liste des joueurs.
 *
 * Props :
 *  - data : Array des joueurs
 *  - discipline : clé de la discipline sélectionnée
 *  - mode : clé du mode de jeu sélectionné
 *  - disciplines : Array des disciplines (pour calcul global)
 *  - variantId : ID du variant pour cas IAM
 *  - currentUserId : ID de l'utilisateur connecté pour le highlight
 *  - emptyText : texte à afficher si la liste est vide (défaut « Aucun participant »)
 */
export function LeaderboardList({
  data,
  discipline,
  mode,
  disciplines,
  variantId,
  currentUserId,
  emptyText = 'Aucun participant',
}) {
  console.log('[LeaderboardList] Rendering with data:', { 
    dataCount: data ? data.length : 0,
    discipline,
    mode,
    variantId,
    firstItem: data?.[0],
    isEmpty: !data || data.length === 0
  });
  
  return (
    <FlatList
      key={`${mode}-${discipline}`}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <LeaderboardItem
          player={item}
          discipline={discipline}
          mode={mode}
          disciplines={disciplines}
          variantId={variantId}
          currentUserId={currentUserId}
          rank={index + 1} // Position dans le classement (1-indexé)
        />
      )}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>{emptyText}</Text>
      )}
      contentContainerStyle={styles.listPadding}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    />
  );
}