import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 20
  },
  cardCounter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  stats: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: '600'
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20
  },
  chevronLeft: {
    position: 'absolute',
    left: 10,
    zIndex: 10
  },
  chevronRight: {
    position: 'absolute',
    right: 10,
    zIndex: 10
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructions: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginTop: 20
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16
  }
})