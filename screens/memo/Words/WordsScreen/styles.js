// screens/memo/Words/WordsScreen/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  
  content: { 
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 20,      // 🎯 ALIGNÉ avec NumbersScreen
    paddingBottom: 130,  // 🎯 ALIGNÉ avec NumbersScreen
    justifyContent: 'space-between', // 🎯 Distribution équilibrée
  },
  
  // Section du haut - groupement logique
  topSection: {
    gap: 16,  // 🎯 Spacing uniforme aligné avec NumbersScreen
  },
  
  // Section du milieu - formulaires
  middleSection: {
    gap: 16,  // 🎯 Spacing aligné avec NumbersScreen
  },
  
  // Section du bas - actions
  bottomSection: {
    gap: 16,  // 🎯 Spacing aligné avec NumbersScreen
    alignItems: 'center',
    paddingTop: 8,
  },
  
  // Override pour les margins des composants modernisés
  highlightBoxSetter: {
    marginTop: 0,      // 🎯 Reset margin pour contrôler via gap
    marginBottom: 0,
  },
  
  modePicker: {
    marginVertical: 0,  // 🎯 Reset margin pour contrôler via gap
  },
  
  recordDisplay: {
    marginVertical: 0,  // 🎯 Reset margin pour contrôler via gap
  },
  
  playButton: {
    marginBottom: 0,    // 🎯 Reset margin pour contrôler via gap
  },
  
  secondaryButton: {
    marginTop: 0,       // 🎯 Reset margin pour contrôler via gap
    marginBottom: 0,
  },
  
  // Style pour ObjectiveTimePicker spacing
  objectiveTimePicker: {
    marginVertical: 0,  // 🎯 Reset margin pour contrôler via gap
  },
  
  // Style pour AutoAdvanceSwitch
  autoAdvanceSwitch: {
    marginVertical: 0,  // 🎯 Reset margin pour contrôler via gap
  },
  
  // Style pour SpecificRevisionsSelector - pas utilisé dans Words mais gardé pour cohérence
  specificRevisionsSelector: {
    marginVertical: 0,  // 🎯 Reset margin pour contrôler via gap
  },
});