// components/molecules/Carousel/styles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export default StyleSheet.create({
  wrapperShadow: {
    // iOS
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Android
    elevation: 3,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  container: {
    paddingBottom: 4,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xs, // Espacement aux extrémités
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  // 🎯 Wrapper pour chaque MenuButton dans le carousel
  buttonWrapper: {
    marginRight: 12,
    // Pas de largeur fixe pour permettre au MenuButton de s'adapter
  },
});