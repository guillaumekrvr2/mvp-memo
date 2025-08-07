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
    paddingHorizontal: 4,              // 🎯 Padding horizontal pour alignement
    marginVertical: 16,                // 🎯 Moins de margin vertical (plus compact)
  },
  label: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    // 🎯 Style amélioré pour le label
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // 🎯 Container custom picker plus discret
  customPickerContainer: {
    backgroundColor: '#2a2a3e',         // 🎯 Fond plus discret (moins contrasté)
    borderRadius: 12,                   // 🎯 Border radius plus subtil
    borderWidth: 1,
    borderColor: '#3a3a4e',            // 🎯 Bordure plus subtile (gris bleuté)
    height: 40,                        // 🎯 Légèrement plus compact
    width: 180,                        // 🎯 Largeur augmentée pour plus d'espace
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,             // 🎯 Plus de padding pour le texte
    // 🎯 Ombre plus subtile
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // 🎯 Texte du picker avec plus d'espace
  customPickerText: {
    color: '#a0a9c0',                  // 🎯 Couleur plus subtile (gris bleuté)
    fontSize: 15,
    fontWeight: '500',                 // 🎯 Poids plus léger
    flex: 1,
    textAlign: 'center',
  },

  // 🎯 Icône chevron plus discrète
  customPickerIcon: {
    marginLeft: 8,
    opacity: 0.7,                      // 🎯 Légèrement transparente
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
    // Ombre moderne
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

  // === NUMBERS - INCHANGÉ ===
  wrapperNumbers: {
    // Garde le style existant pour numbers
  },
  viewContainerNumbers: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 40,
  },
  inputIOSNumbers: {
    backgroundColor: '#111',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    height: 50,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputAndroidNumbers: {
    backgroundColor: '#111',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    height: 50,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  iconContainerNumbers: {
    top: (50 - 20) / 2,
    right: 12,
  },
});