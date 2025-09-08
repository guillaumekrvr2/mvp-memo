// screens/memo/Names/NamesScreen/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  
  content: { 
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 130,
    justifyContent: 'space-between',
  },
  
  // Section du haut - groupement logique (sans HighlightBoxSetter)
  topSection: {
    gap: 16,
  },
  
  // Section du milieu - formulaires
  middleSection: {
    gap: 16,
  },
  
  // Section du bas - actions
  bottomSection: {
    gap: 16,
    alignItems: 'center',
    paddingTop: 8,
  },
  
  modePicker: {
    marginVertical: 0,
  },
  
  recordDisplay: {
    marginVertical: 0,
  },
  
  playButton: {
    marginBottom: 0,
  },
  
  secondaryButton: {
    marginTop: 0,
    marginBottom: 0,
  },
  
  objectiveTimePicker: {
    marginVertical: 0,
  },
  
  autoAdvanceSwitch: {
    marginVertical: 0,
  },
});