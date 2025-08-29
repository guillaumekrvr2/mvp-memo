import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export default StyleSheet.create({
  // Texte affiché quand la liste est vide
  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  // Padding pour le container de la FlatList
  listPadding: {
    paddingBottom: 80,
    flexGrow: 1,
  },
  // Container pour le loader
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  // Texte du loader
  loadingText: {
    marginTop: 15,
    color: theme.colors.textPrimary,
    fontSize: 16,
    textAlign: 'center',
  },
});
