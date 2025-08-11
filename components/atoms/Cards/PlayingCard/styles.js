// 📁 components/atoms/PlayingCard/styles.js
import { StyleSheet, Dimensions } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

export const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    width: 280,
    height: 380,
  },
  animatedCard: {
    position: 'absolute',
    width: 280,
    height: 380,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  topCardIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topCardText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
})