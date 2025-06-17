//components/molecules/Carousel/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // ton conteneur “tabs”
  container: {
    paddingBottom: 10,
    marginBottom: 8,
    flexDirection: 'row',
  },

  // nouveaux styles pour le ScrollView
  scrollView: {
    flexGrow: 0,       // n’étire pas le ScrollView
    flexShrink: 0,     // n’évince pas les autres éléments
    alignSelf: 'flex-start',
  },

  contentContainer: {
    flexGrow: 0,       // n’appuie pas sur le parent
  },
});
