// src/components/molecules/LeaderboardItem/styles.js
import { StyleSheet } from 'react-native';
import { theme }       from '../../../theme';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,  // par exemple '#333'
  },
  name: {
    color: theme.colors.textOnDark,          // par exemple '#fff'
    fontSize: 16,
  },
  score: {
    color: theme.colors.textOnDark,          // même couleur que le nom
    fontSize: 16,
  },
});
