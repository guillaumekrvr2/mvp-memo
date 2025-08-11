// components/atoms/Grid/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  
  contentContainer: {
    paddingHorizontal: 16, // theme.spacing.md approximatif
    paddingVertical: 16,   // theme.spacing.md approximatif
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  row: {
    flexDirection: 'row',
    marginBottom: 8, // Espacement entre les lignes
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  cellContainer: {
    marginHorizontal: 2, // Petit espacement entre les cellules
    marginVertical: 2,
  },
});

// Styles pour les cellules individuelles (à utiliser dans MemoScreen)
export const cellStyles = StyleSheet.create({
  // Style de base pour toutes les cellules
  cell: {
    width: 44,  // Légèrement plus grand que 42px
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Plus arrondi pour modernité
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)', // Bordure primary subtile
    backgroundColor: 'rgba(102, 126, 234, 0.05)', // Fond primary très subtil
    
    // Shadow iOS subtile
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
    // Transform de base pour animation
    transform: [{ scale: 1 }],
  },
  
  // Style pour les cellules en highlight (groupe actuel) - VERSION AMÉLIORÉE
  highlightCell: {
    backgroundColor: 'rgba(102, 126, 234, 0.25)', // Fond primary plus intense
    borderColor: '#667eea', // Bordure primary pleine
    borderWidth: 2, // Bordure plus épaisse
    
    // Shadow beaucoup plus marquée pour effet "glow"
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 }, // Shadow concentrée (pas de décalage)
    shadowOpacity: 0.6, // Très visible
    shadowRadius: 8, // Large diffusion pour effet glow
    
    // Transform pour légère augmentation de taille
    transform: [{ scale: 1.05 }],
    
    // Effet de double bordure via un deuxième style
    // (On va l'ajouter avec une View supplémentaire si besoin)
  },
  
  // NOUVEAU : Style pour effet de propagation dans le groupe
  groupCell: {
    backgroundColor: 'rgba(102, 126, 234, 0.15)', // Intermédiaire
    borderColor: 'rgba(102, 126, 234, 0.7)', // Bordure semi-transparente
    borderWidth: 1.5,
    
    // Shadow intermédiaire
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    
    // Légère augmentation
    transform: [{ scale: 1.02 }],
  },
  
  // Style pour le texte des cellules
  cellText: {
    color: '#ffffff', // Blanc
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    
    // Text shadow subtile pour profondeur
    textShadowColor: 'rgba(102, 126, 234, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // Style pour le texte des cellules en highlight - AMÉLIORÉ
  highlightCellText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700', // Plus bold pour l'highlight
    textAlign: 'center',
    
    // Text shadow beaucoup plus marquée avec effet glow
    textShadowColor: '#667eea', // Couleur primary pure
    textShadowOffset: { width: 0, height: 0 }, // Pas de décalage = glow
    textShadowRadius: 6, // Large pour effet diffus
  },
  
  // NOUVEAU : Style pour le texte du groupe
  groupCellText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '650', // Intermédiaire
    textAlign: 'center',
    
    // Text shadow intermédiaire
    textShadowColor: 'rgba(102, 126, 234, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});