// 📁 components/molecules/CardsThumbnailRow/styles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardsRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#000000',
  },
  cardsRowContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
    paddingBottom: 14.4, // 20% de plus que 12
    alignItems: 'center',
    height: '100%',
  },
  uniformContainer: {
    position: 'relative',
    height: 70,
  },
  uniformCard: {
    position: 'absolute',
    top: 0,
  },
})