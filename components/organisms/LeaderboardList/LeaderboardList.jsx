// src/components/organisms/LeaderboardList/LeaderboardList.jsx
import React from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native';
import styles from './styles';
import { LeaderboardItem } from '../../molecules/LeaderboardItem/LeaderboardItem';
import { theme } from '../../../theme';

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
 *  - loading : boolean pour afficher le loader
 */
export function LeaderboardList({
  data,
  discipline,
  mode,
  disciplines,
  variantId,
  currentUserId,
  emptyText = 'Aucun participant',
  loading = false,
}) {
  
  // Affichage du loader pendant le chargement
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Chargement du classement...</Text>
      </View>
    );
  }
  
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