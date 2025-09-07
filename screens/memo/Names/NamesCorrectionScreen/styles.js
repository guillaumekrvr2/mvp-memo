// screens/memo/Names/NamesCorrectionScreen/styles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  resultsContainer: {
    alignItems: 'center',
    marginBottom: 20,
    height: 100,
  },

  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },

  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },

  accuracyText: {
    fontSize: 18,
    color: '#888',
  },

  gridContainer: {
    flex: 1,
    marginBottom: 20,
  },

  grid: {
    paddingVertical: 10,
    paddingBottom: 85, // Augmenté de 15% pour éviter le masquage par le bouton Retry
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  instructionsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },

  buttonContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
  },

  // Style FlatList identique à NamesRecallScreen
  flatList: {
    flex: 1,
  },
})