// components/atoms/SearchBar/styles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',   // 🎯 Fond semi-transparent pour glassmorphisme
    borderRadius: 16,                           // 🎯 Border radius moderne
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',    // 🎯 Bordure plus subtile
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  searchIcon: {
    marginRight: 12,
  },
  
  input: {
    flex: 1,
    color: '#fff',                        // 🎯 Texte blanc
    fontSize: 16,
    paddingVertical: 14,
    fontWeight: '400',
  },
  
  clearButton: {
    marginLeft: 8,
    padding: 4,                           // 🎯 Zone de touch plus grande
  },
})