// screens/memo/Names/NamesRecallScreen/styles.js
import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 12, // Légèrement réduit pour les cartes plus larges
  },

  flatList: {
    flex: 1,
  },

  grid: {
    paddingVertical: 20, // Plus d'espace vertical
  },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#0a0a0a',
  },
})