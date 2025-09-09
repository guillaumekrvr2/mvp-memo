// src/components/organisms/CorrectionGrid/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Style pour le ScrollView principal
  scrollContainer: {
    flex: 1,             // pour prendre tout l'espace dispo dans le BorderedContainer
  },

  // Styles appliqués au contentContainer de la ScrollView
  scroll: {
    paddingHorizontal: 12,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Chaque ligne de la grille
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  }
});
