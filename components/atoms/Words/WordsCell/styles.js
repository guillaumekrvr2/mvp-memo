import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wordCell: {
    width: '45%', // Augmenté de 40% à 45%
    marginHorizontal: 6, // Réduit de 8 à 6 pour compenser
    paddingHorizontal: 12, // Augmenté de 8 à 12
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 26, 46, 0.95)', // Fond plus opaque pour masquer les textes derrière
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 45,
  },

  highlightWordCell: {
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
    borderColor: '#667eea',
    borderWidth: 1.5,
  },

  wordText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  highlightWordText: {
    color: '#ffffff',
    fontWeight: '700',
    zIndex: 10,
  },

  inputText: {
    width: '100%',
    padding: 0,
    margin: 0,
  },

  correctWordCell: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)', // Vert
    borderColor: '#22c55e',
    borderWidth: 1.5,
  },

  incorrectWordCell: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)', // Rouge
    borderColor: '#ef4444',
    borderWidth: 1.5,
  },

  correctWordText: {
    color: '#22c55e',
    fontWeight: '700',
  },

  incorrectWordText: {
    color: '#ef4444',
    fontWeight: '700',
  },
});