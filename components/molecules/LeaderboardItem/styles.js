// components/molecules/LeaderboardItem/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // 🎯 Container principal avec style card moderne
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    // Ombre subtile
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // 🎯 Container pour l'utilisateur connecté
  currentUserContainer: {
    backgroundColor: '#1e2e1e',           // Fond légèrement vert
    borderWidth: 2,
    borderColor: '#43e97b',               // Bordure verte moderne
    borderLeftWidth: 6,                   // Bordure gauche plus marquée
    // Ombre verte
    shadowColor: '#43e97b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  // 🎯 Section gauche avec rang, avatar et info
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },

  // 🎯 Container pour le rang
  rankContainer: {
    width: 32,
    alignItems: 'center',
  },

  // 🎯 Rang numérique
  rank: {
    color: '#a0a9c0',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  // 🎯 Emoji pour les 3 premiers
  rankEmoji: {
    fontSize: 24,
    textAlign: 'center',
  },

  // 🎯 Avatar circulaire moderne
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#667eea20',
    borderWidth: 2,
    borderColor: '#667eea40',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 🎯 Avatar pour l'utilisateur connecté
  currentUserAvatar: {
    backgroundColor: '#43e97b20',
    borderColor: '#43e97b',
  },

  // 🎯 Texte dans l'avatar
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  // 🎯 Section info joueur
  playerInfo: {
    flex: 1,
    gap: 4,
    marginRight: 10,
  },

  // 🎯 Nom du joueur
  playerName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    
  },

  // 🎯 Badge "Vous" pour l'utilisateur connecté
  currentUserBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#43e97b20',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    gap: 4,
  },

  currentUserLabel: {
    color: '#43e97b',
    fontSize: 11,
    fontWeight: '600',
  },

  // 🎯 Container du score
  scoreContainer: {
    backgroundColor: '#4ecdc420',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#4ecdc440',
    minWidth: 80,
    alignItems: 'center',
  },

  // 🎯 Score container pour l'utilisateur connecté
  currentUserScoreContainer: {
    backgroundColor: '#43e97b20',
    borderColor: '#43e97b60',
  },

  // 🎯 Texte du score
  scoreText: {
    color: '#4ecdc4',
    fontSize: 15,
    fontWeight: '700',
  },

  // 🎯 Styles pour l'utilisateur connecté
  currentUserText: {
    color: '#43e97b',
    fontWeight: '700',
  },
});