import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    width: 207,
    height: 276,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(80, 80, 80, 0.9)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  positionText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 10,
    fontWeight: 'bold'
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
    textAlign: 'left'
  }
})