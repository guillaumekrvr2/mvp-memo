// components/atoms/BorderedContainer/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '85%', // Légèrement plus large que 75% pour plus de contenu
    height: '60%', // Réduit de 60% à 50% pour laisser plus d'espace aux chevrons
    alignSelf: 'center',
    marginVertical: 16, // theme.spacing.md approximatif
    paddingVertical: 12, // theme.spacing.sm approximatif
    
    // Style moderne cohérent avec HighlightBox
    backgroundColor: 'rgba(102, 126, 234, 0.08)', // Fond primary subtil 
    borderWidth: 2, // Bordure plus épaisse pour plus de présence
    borderColor: '#667eea', // theme.colors.primary
    borderRadius: 16, // Border radius moderne
    overflow: 'hidden', // Important pour le contenu interne
    
    // Shadow iOS (pas d'elevation pour éviter les bugs)
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    
    // Position relative pour les couches de glow
    position: 'relative',
  },
  
  // Effet de glow interne (version allégée pour ne pas distraire du contenu)
  innerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 14, // Légèrement plus petit que le container
    backgroundColor: 'transparent',
    pointerEvents: 'none', // Important pour ne pas bloquer les interactions
  },
  
  // Couche 1 - Glow subtil proche du bord
  glowLayer1: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.06)', // Plus subtil que HighlightBox
    pointerEvents: 'none',
  },
  
  // Couche 2 - Glow très léger vers l'intérieur
  glowLayer2: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(102, 126, 234, 0.03)', // Très subtil
    pointerEvents: 'none',
  },
});