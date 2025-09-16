import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
  },
  container: {
    width: 193,
    height: 278,
    backgroundColor: 'transparent',
    borderRadius: 7,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    // Drop shadow vers la gauche
    shadowOffset: { width: -3, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowColor: '#000',
    elevation: 4, // Pour Android
  },
  cardImage: {
    width: 207,
    height: 276,
    borderRadius: 5
  },
  slotNumber: {
    position: 'absolute',
    top: -25,
    left: 10,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 24,
    textAlign: 'left',
    zIndex: 10
  }
})