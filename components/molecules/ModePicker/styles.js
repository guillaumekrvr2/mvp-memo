import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export default StyleSheet.create({
  // wrapper commun
  wrapper: {
    width: '100%',
    marginVertical: theme.spacing.xl,
  },

  // === COMMUNITY - VERSION CUSTOM MODERNE ===
  wrapperCommunity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  customPickerContainer: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3a3a4e',
    height: 40,
    width: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  customPickerText: {
    color: '#a0a9c0',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },

  customPickerIcon: {
    marginLeft: 8,
    opacity: 0.7,
  },

  // === MODAL STYLES ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: '#1e1e2e',
    borderRadius: 20,
    width: '100%',
    maxWidth: 320,
    maxHeight: 400,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },

  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },

  modalCloseButton: {
    padding: 4,
    borderRadius: 8,
  },

  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },

  selectedOption: {
    backgroundColor: '#4ecdc420',
    borderLeftWidth: 4,
    borderLeftColor: '#4ecdc4',
  },

  modalOptionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },

  selectedOptionText: {
    color: '#4ecdc4',
    fontWeight: '700',
  },

  // === NUMBERS - VERSION MODAL CUSTOM IDENTIQUE À COMMUNITY ===
  wrapperNumbers: {
    marginVertical: 16, // Plus compact comme community
  },

  // Container du picker custom pour Numbers (même style que community)
  customPickerContainerNumbers: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3a3a4e',
    height: 48,
    width: '100%', // Pleine largeur pour Numbers
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  customPickerTextNumbers: {
    color: '#a0a9c0',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },

  customPickerIconNumbers: {
    marginLeft: 8,
    opacity: 0.7,
  },

  // Style pour l'icône du picker numbers (maintenu pour rétrocompatibilité)
  pickerIcon: {
    opacity: 0.7,
  },
});