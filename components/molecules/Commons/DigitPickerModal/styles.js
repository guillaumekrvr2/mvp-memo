// components/molecules/DigitPickerModal/styles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Même overlay que les autres modales modernes
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  container: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#1e1e2e', // Même fond moderne que Community modal
    borderRadius: 20, // Border radius moderne cohérent
    borderWidth: 1,
    borderColor: '#2a2a3e', // Bordure subtile moderne
    padding: 24,
    alignItems: 'center',
    
    // Même ombre moderne que Community
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  
  title: {
    color: '#ffffff', // Texte blanc moderne
    fontSize: 18,
    fontWeight: '700', // Bold moderne
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12, // Espacement moderne entre les boutons
  },
  
  digitButton: {
    width: 56,
    height: 56,
    borderRadius: 28, // Boutons parfaitement ronds
    backgroundColor: '#2a2a3e', // Fond moderne cohérent
    borderWidth: 1,
    borderColor: '#3a3a4e', // Bordure subtile
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    
    // Ombre subtile pour profondeur
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  digitButtonActive: {
    backgroundColor: '#667eea', // Fond cyan pour état actif
    borderColor: '#667eea',
    
    // Ombre cyan pour état actif
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  
  digitText: {
    color: '#a0a9c0', // Texte gris moderne
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
  digitTextActive: {
    color: '#ffffff', // Texte blanc sur fond cyan actif
    fontWeight: '700',
  },
  
  okButton: {
    backgroundColor: '#667eea', // Bouton cyan moderne
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    minWidth: 120,
    
    // Ombre cyan moderne
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  okText: {
    color: '#ffffff', // Texte blanc sur bouton cyan
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
})