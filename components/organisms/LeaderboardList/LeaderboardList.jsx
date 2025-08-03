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
 *  - emptyText : texte à afficher si la liste est vide (défaut « Aucun participant »)
 */
export function LeaderboardList({
  data,
  discipline,
  mode,
  disciplines,
  variantId,
  emptyText = 'Aucun participant',
}) {
  return (
    <FlatList
      key={`${mode}-${discipline}`}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <LeaderboardItem
          player={item}
          discipline={discipline}
          mode={mode}
          disciplines={disciplines}
          variantId={variantId}
        />
      )}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>{emptyText}</Text>
      )}
      contentContainerStyle={styles.listPadding}
    />
  );
}