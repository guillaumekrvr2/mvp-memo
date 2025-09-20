// screens/memo/Binaries/CorrectionScreen/styles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a', // theme.colors.background
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between', // Espacement équitable entre les 3 éléments
    alignItems: 'center', // Centrage horizontal
    paddingVertical: 20,
    paddingTop: 30, // Réduit encore de 50 à 30 pour remonter davantage
  },
  resultsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // theme.colors.textOnDark
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 20,
    color: '#667eea', // theme.colors.primary
    marginBottom: 8,
    fontWeight: '600',
  },
  accuracyText: {
    fontSize: 16,
    color: '#a0a9c0', // theme.colors.secondary
  },
  buttonContainer: {
    paddingHorizontal: 20, // 20px de padding horizontal
    paddingBottom: 10, // 10px d'écart avec le bas
    alignItems: 'center',
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666666', // theme.colors.textMuted
    textAlign: 'center',
    marginVertical: 2,
  },
  retryButton: {
    width: '100%', // Utilise toute la largeur du container (moins le padding)
  },
})