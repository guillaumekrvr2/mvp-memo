// components/atoms/Commons/WordsHighlightBox/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 340, // Largeur fixe pour contenir 2x "affaiblissement" + séparateur
    backgroundColor: 'rgba(102, 126, 234, 0.12)', // Fond primary un peu plus visible
    borderWidth: 2, // Bordure plus épaisse pour plus de présence
    borderColor: '#667eea', // theme.colors.primary
    borderRadius: 16,
    paddingHorizontal: 4, // Réduit de 28 à 20
    paddingVertical: 14, // Réduit de 20 à 14
    marginVertical: 12, // Réduit de 16 à 12
    
    // Shadow iOS (subtile)
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    
    // Effet de gradient simulé avec une bordure interne
    // On va ajouter un effet via le composant directement
    
    opacity: 1,
  },
  
  // Effet de glow blur simulé avec plusieurs couches
  innerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  
  // Couche 1 - Glow le plus proche du bord
  glowLayer1: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 14,
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
  },
  
  // Couche 2 - Glow intermédiaire
  glowLayer2: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.10)',
  },
  
  // Couche 3 - Glow le plus vers l'intérieur
  glowLayer3: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
  },
  
  highlightText: {
    color: '#ffffff', // theme.colors.textOnDark
    fontSize: 18, // Réduit de 28 à 24
    fontWeight: '600', // Plus bold pour plus de présence
    textAlign: 'center',
    
    // Text shadow sophistiquée pour s'harmoniser avec le glow
    textShadowColor: 'rgba(102, 126, 234, 0.8)', // Couleur primary plus intense
    textShadowOffset: { width: 0, height: 2 }, // Offset plus marqué
    textShadowRadius: 6, // Radius plus grand pour effet diffus
    
    // Position relative pour être au-dessus des couches de glow
    zIndex: 10,
  },
  
  // Row container pour les mots avec séparateur
  wordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 10,
  },
  
  // Mot de gauche - centré dans sa zone
  leftWord: {
    flex: 1,
    textAlign: 'center',
    paddingRight: 6, // Un peu d'espace par rapport au séparateur
  },
  
  // Séparateur centré
  separator: {
    width: 20,
    textAlign: 'center',
    fontSize: 20, // Un peu plus gros pour le séparateur
  },
  
  // Mot de droite - centré dans sa zone
  rightWord: {
    flex: 1,
    textAlign: 'center',
    paddingLeft: 6, // Un peu d'espace par rapport au séparateur
  },
});