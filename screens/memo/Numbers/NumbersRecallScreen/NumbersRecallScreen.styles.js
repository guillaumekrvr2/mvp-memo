import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between', // Espacement équitable comme MemoScreen
    alignItems: 'center',
    paddingVertical: 20,
  },
  instructionsContainer: {
    alignItems: 'center',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputScrollContainer: {
    flex: 1,
  },
  inputScrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: Platform.OS === 'ios' ? 8 : 40, // Padding réduit pour iOS uniquement
  },
  mainInput: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 24 : 24, // Taille optimisée pour iOS uniquement
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', // Police monospace plus espacée
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'top',
    letterSpacing: Platform.OS === 'ios' ? 8 : 24, // Letter spacing réduit de 50% pour Android
    lineHeight: Platform.OS === 'ios' ? 36 : 36, // Hauteur réduite de 50% pour Android

    // Optimisations iOS pour le centrage
    ...(Platform.OS === 'ios' && {
      includeFontPadding: false, // Supprime le padding de police iOS
    }),
    // Hauteur maintenant gérée dynamiquement dans mainInputStyle
  },
})
