// screens/memo/Names/NamesRecallScreen/styles.js
import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: 'transparent', // Transparent pour hériter du container
  },

  content: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#0a0a0a', // Fond noir pour le contenu principal
  },

  flatList: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  grid: {
    paddingBottom: 80, // Espace pour que la dernière carte ne soit pas cachée par le bouton flottant
    backgroundColor: 'transparent',
  },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },

  buttonContainer: {
    position: 'absolute',
    // bottom calculé dynamiquement avec les insets
    left: 24, // Margin left au lieu de paddingHorizontal
    right: 24, // Margin right au lieu de paddingHorizontal
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255)', // Transparent maintenant
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
})