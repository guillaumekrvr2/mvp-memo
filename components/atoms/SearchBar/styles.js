import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // ✅ CONTENEUR PARENT - celui qui peut être stylé depuis l'extérieur
  containerWrapper: {
    backgroundColor: 'rgba(253, 0, 0, 1)', // ✅ TON FOND ROUGE ICI
    paddingHorizontal: 0, // Ajuste selon tes besoins
    paddingVertical: 0,
  },
  
  // ✅ SEARCHBAR INTERNE - ses styles propres
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fond de la barre de recherche
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '400',
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
})