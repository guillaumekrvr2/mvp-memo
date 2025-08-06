// src/components/molecules/LeaderboardItem/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: 'transparent',
  },
  // Styles pour l'utilisateur connecté
  highlightedRow: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Fond vert subtil
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50', // Barre verte à gauche
    borderRadius: 8,
    marginVertical: 2,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rank: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
    width: 40,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  score: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Styles pour le texte de l'utilisateur connecté
  highlightedText: {
    color: '#4CAF50', // Texte en vert
    fontWeight: '700',
  },
  userIcon: {
    marginLeft: 8,
  },
});