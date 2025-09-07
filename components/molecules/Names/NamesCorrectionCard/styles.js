// components/molecules/Names/NamesCorrectionCard/styles.js
import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

// Même design que NamesRecallCard
const cardWidth = 161
const cardSpacing = 16

export const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 30, 0.95)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  imageContainer: {
    width: cardWidth - 32, // padding * 2 (16 * 2)
    height: (cardWidth - 32) * 1.4, // Ratio plus haut pour compenser les inputs réduits
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  inputContainer: {
    width: '100%',
    gap: 6,
  },

  nameInput: {
    width: '100%',
    height: 36,
    marginHorizontal: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minHeight: 36,
    borderRadius: 16,
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameInputText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    width: '100%',
    padding: 0,
    margin: 0,
  },

  // Styles pour les cellules correctes/incorrectes (inspirés de WordsCell)
  correctAnswerCell: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)', // Vert
    borderColor: '#22c55e',
    borderWidth: 1.5,
  },

  incorrectAnswerCell: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)', // Rouge
    borderColor: '#ef4444',
    borderWidth: 1.5,
  },

  correctAnswerText: {
    color: '#22c55e',
    fontWeight: '700',
  },

  incorrectAnswerText: {
    color: '#ef4444',
    fontWeight: '700',
  },
})