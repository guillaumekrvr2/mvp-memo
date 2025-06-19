import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export default StyleSheet.create({
  // wrapper commun
  wrapper: {
    width: '100%',
    marginVertical: theme.spacing.xl,
  },

  // === community ===
  wrapperCommunity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textOnDark,
    fontSize: 20,
    fontWeight: '600',
  },
  viewContainerCommunity: {
   backgroundColor: '#111',
   borderRadius: 8,
   borderWidth: 1,
   borderColor: '#fff',
   height: 40,
   width: 160,
   justifyContent: 'center',
   paddingHorizontal: 12,
   overflow: 'hidden',
  },
  inputIOSCommunity: {
    backgroundColor: '#111',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    color: '#fff',
  },
  inputAndroidCommunity: {
    backgroundColor: '#111',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    color: '#fff',
  },
  iconContainerCommunity: {
    top: (40 - 20) / 2,
    right: 12,
  },

  // === numbers ===
  viewContainerNumbers: {
    width: '100%',
    height: 50,           // ← couvrir toute la hauteur du bouton
    justifyContent: 'center',  // ← centrer verticalement le texte
    paddingLeft: 16,
    paddingRight: 40,     // ← espace côté gauche **ET** côté droit
  },
  inputIOSNumbers: {
    backgroundColor: '#111',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    height: 50,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputAndroidNumbers: {
    backgroundColor: '#111',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    height: 50,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  iconContainerNumbers: {
    top: (50 - 20) / 2,
    right: 12,
  },
});
