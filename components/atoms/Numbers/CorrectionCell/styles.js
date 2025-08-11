// components/atoms/CorrectionCell/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  touchable: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  // Cellules vides (neutre)
  emptyTouchable: {
    backgroundColor: '#2a2a2a', // Gris neutre sombre
    borderColor: '#444',
  },
  // Cellules correctes (vert sombre)
  correctTouchable: {
    backgroundColor: '#1a4a1a', // Vert très sombre
    borderColor: '#2d5a2d',
  },
  // Cellules incorrectes (rouge sombre)
  incorrectTouchable: {
    backgroundColor: '#4a1a1a', // Rouge très sombre
    borderColor: '#5a2d2d',
  },
  cellText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    color: '#aaa', // Gris pour les cellules vides
  },
  correctText: {
    color: '#90EE90', // Vert clair pour contraster sur fond vert sombre
  },
  incorrectText: {
    color: '#FFB6C1', // Rouge clair pour contraster sur fond rouge sombre
  },
});