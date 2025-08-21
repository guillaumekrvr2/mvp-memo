import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  animatedContainer: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    // Drop shadow adapté aux petites cartes
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3, // Pour Android
  },
  cardImage: {
    width: 75,
    height: 112,
    borderRadius: 6
  }
})