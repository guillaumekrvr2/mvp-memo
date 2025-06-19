// components/molecules/ModePicker/styles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export default StyleSheet.create({
  // Styles partagés
  wrapper: {
    marginVertical: theme.spacing.xl,
  },
  label: {
    color: theme.colors.textOnDark,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },

  // Layout différent par variant
  wrapperCommunity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.sm,
  },
  wrapperNumbers: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },

  // Container du Picker
  containerCommunity: {
    backgroundColor: '#111',
    borderRadius: 8,
    height: 40,
    width: 160,
    overflow: 'hidden',
  },
  containerNumbers: {
    backgroundColor: '#111',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    height: 50,
    width: '100%',
    overflow: 'hidden',
  },

  // Style interne du Picker
  pickerCommunity: {
    position: 'absolute',
    top: -20,
    right: 0,
    width: 160,
    height: 80,
    color: '#fff',
  },
  pickerNumbers: {
    position: 'relative',
    top: 0,
    width: '100%',
    height: 50,
    color: '#fff',
  },
});
