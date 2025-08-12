// screens/memo/Cards/CardsSettingsScreen/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  // 🎯 SECTION DU HAUT - Configuration
  topSection: {
    paddingTop: 40,
    gap: 24,
  },

  highlightBoxSetter: {
    marginBottom: 8,
  },

  modePicker: {
    marginBottom: 8,
  },

  // 🎯 SECTION DU MILIEU - Paramètres du jeu
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 20,
  },

  objectiveTimePicker: {
    marginBottom: 16,
  },

  autoAdvanceSwitch: {
    marginBottom: 16,
  },

  recordDisplay: {
    marginTop: 8,
  },

  // 🎯 SECTION DU BAS - Actions principales
  bottomSection: {
    gap: 16,
    paddingBottom: 40,
  },

  playButton: {
    marginBottom: 8,
  },

  secondaryButton: {
    marginBottom: 8,
  },
});