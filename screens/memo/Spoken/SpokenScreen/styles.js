// screens/memo/Spoken/SpokenScreen/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  
  content: { 
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 100,       // Augmenté pour éviter le header
    paddingBottom: 130,    // Augmenté pour éviter que le bouton soit rogné (nav bar + marge)
    justifyContent: 'space-between', // Distribution équilibrée
  },
  
  // Section du haut - groupement logique
  topSection: {
    gap: 16,  // Spacing uniforme entre HighlightBoxSetter et ModePicker
  },
  
  // Section du milieu - formulaires
  middleSection: {
    gap: 16,  // Spacing plus serré pour les éléments de forme
  },
  
  // Section du bas - actions
  bottomSection: {
    gap: 16,  // Spacing réduit pour éviter le débordement
    alignItems: 'center',
    paddingTop: 8,
  },
  
  // Override pour les margins des composants modernisés
  highlightBoxSetter: {
    marginTop: 0,      // Reset margin pour contrôler via gap
    marginBottom: 0,
  },
  
  modePicker: {
    marginVertical: 0,  // Reset margin pour contrôler via gap
  },
  
  recordDisplay: {
    marginVertical: 0,  // Reset margin pour contrôler via gap
  },
  
  playButton: {
    marginBottom: 0,    // Reset margin pour contrôler via gap
  },
  
  secondaryButton: {
    marginTop: 0,       // Reset margin pour contrôler via gap
    marginBottom: 0,
  },
  
  // Style pour ObjectiveTimePicker spacing
  objectiveTimePicker: {
    marginVertical: 0,  // Reset margin pour contrôler via gap
  },
  
  // Style pour AutoAdvanceSwitch si nécessaire
  autoAdvanceSwitch: {
    marginVertical: 0,  // Reset margin pour contrôler via gap
  },
});