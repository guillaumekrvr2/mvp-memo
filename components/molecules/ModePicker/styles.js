// components/molecules/ModePicker/styles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.xl,   // à la place de marginTop
  },
  label: {
    color: theme.colors.textOnDark,
    fontSize: 20,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#111',
    borderRadius: 8,
    height: 40,
    position: 'relative',
    overflow: 'visible',
  },
  picker: {
    width: 160,
    color: '#fff',
    position: 'absolute',
    top: -20,
    right: 0,
    height: 80,
  },
});
