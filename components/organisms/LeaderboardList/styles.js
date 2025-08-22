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
});
