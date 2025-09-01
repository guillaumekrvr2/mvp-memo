// components/molecules/Commons/NewRecordModal/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  container: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#1e1e2e',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFD700', // Bordure dorée pour l'aspect festif
    padding: 32,
    alignItems: 'center',
    
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },

  iconContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  
  title: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  message: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    letterSpacing: 0.3,
  },

  scoreContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    padding: 20,
    marginBottom: 28,
    alignItems: 'center',
  },

  newScoreLabel: {
    color: '#a0a9c0',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },

  newScore: {
    color: '#FFD700',
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 16,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  previousScoreLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  previousScore: {
    color: '#9ca3af',
    fontSize: 18,
    fontWeight: '600',
  },
  
  closeButton: {
    backgroundColor: '#FFD700',
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 16,
    minWidth: 140,
    
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  
  closeText: {
    color: '#1e1e2e',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});