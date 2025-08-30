// screens/memo/Spoken/SpokenCorrectionScreen/styles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a', // theme.colors.background
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
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
  gridContainer: {
    flex: 1,
    minHeight: 300,
    marginVertical: 20,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666666', // theme.colors.textMuted
    textAlign: 'center',
    marginVertical: 2,
  },
  retryButton: {
    marginVertical: 20,
    alignSelf: 'center',
  },
})