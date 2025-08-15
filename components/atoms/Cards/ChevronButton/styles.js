import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fond sombre pour contraste
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    transform: [{ translateY: -20 }],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)' // Bordure subtile
  },
  disabled: {
    opacity: 0.3
  },
  chevron: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22, // Améliore le centrage vertical
    includeFontPadding: false // Android: supprime padding extra
  },
  chevronDisabled: {
    color: 'rgba(255, 255, 255, 0.3)'
  }
})