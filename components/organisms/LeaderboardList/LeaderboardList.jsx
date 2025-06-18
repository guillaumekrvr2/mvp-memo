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
 *  - emptyText : texte à afficher si la liste est vide (défaut « Aucun participant »)
 */
export function LeaderboardList({
  data,
  discipline,
  mode,
  disciplines,
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
        />
      )}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>{emptyText}</Text>
      )}
      contentContainerStyle={styles.listPadding}
    />
  );
}
