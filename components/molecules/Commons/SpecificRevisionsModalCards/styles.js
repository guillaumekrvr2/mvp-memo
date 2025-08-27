// components/molecules/Commons/SpecificRevisionsModal/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  container: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#1e1e2e',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    padding: 24,
    alignItems: 'center',
    
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  
  fieldsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 24,
    gap: 16,
  },
  
  fieldGroup: {
    flex: 1,
    alignItems: 'center',
  },
  
  fieldLabel: {
    color: '#a0a9c0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  textInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#2a2a3e',
    borderWidth: 1,
    borderColor: '#3a3a4e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  suitsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
    gap: 12,
  },
  
  suitButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2a2a3e',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3a3a4e',
    justifyContent: 'center',
    alignItems: 'center',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  suitButtonSelected: {
    backgroundColor: '#667eea',
    borderColor: '#7c8bf0',
    
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  suitSymbol: {
    fontSize: 20,
    fontWeight: '600',
  },
  
  suitSymbolSelected: {
    color: '#ffffff',
  },
  
  okButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    minWidth: 120,
    
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  okText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});