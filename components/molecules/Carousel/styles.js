// components/molecules/Carousel/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginBottom: 8,
    flexDirection: 'row',
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  shadowWrapper: {
    // iOS
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Android
    elevation: 3,
    backgroundColor: 'transparent', // ou theme.colors.background si tu veux
    overflow: 'visible',
  },
});
