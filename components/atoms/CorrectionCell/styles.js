// components/atoms/CorrectionCell/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  touchable: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // theme.colors.surface
  },
  correctTouchable: {
    backgroundColor: 'transparent',
  },
  cellText: {
    color: '#aaa', // theme.colors.secondary
    fontSize: 18,
    fontWeight: '600', // theme.typography.weight.semibold
  },
  correctText: {
    color: '#fff', // theme.colors.textOnDark
  },
});