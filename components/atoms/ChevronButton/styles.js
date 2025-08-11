// components/atoms/ChevronButton/styles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    // Forme circulaire agrandie
    width: 70,  // Agrandi
    height: 70,
    borderRadius: 35, // Cercle parfait
    
    // Style EXACT des SecondaryButton secondary variant
    backgroundColor: '#2a2a3e', // Fond moderne cohérent
    borderWidth: 1, // Bordure fine comme SecondaryButton
    borderColor: '#3a3a4e', // Bordure subtile comme SecondaryButton
    
    // Centrage
    justifyContent: 'center',
    alignItems: 'center',
    
    // Shadow EXACTE des SecondaryButton
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Pas d'elevation pour éviter les bugs
  },
  
  hitSlop: {
    top: 15,    
    bottom: 15,
    left: 15,
    right: 15,
  },
  
  // Style pour l'icône chevron avec effet glow
  chevronIcon: {
    // Couleur comme SecondaryButton secondary (texte gris moderne)
    color: '#a0a9c0',
    
    // Text shadow pour effet glow sur l'icône
    textShadowColor: '#667eea',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
})