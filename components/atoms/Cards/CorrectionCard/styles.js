import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: 120,
    minHeight: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },
  cardContainer: {
    position: 'relative',
    alignItems: 'center'
  },
  cardImage: {
    width: 80,
    height: 120,
    borderRadius: 6
  },
  correctBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center'
  },
  correctBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  correctionContainer: {
    marginTop: 8,
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)'
  },
  correctionLabel: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 4,
    opacity: 0.7
  },
  correctionImage: {
    width: 40,
    height: 60,
    borderRadius: 4
  },
  positionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    marginTop: 4,
    fontWeight: 'bold'
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 24,
    fontWeight: 'bold'
  }
})