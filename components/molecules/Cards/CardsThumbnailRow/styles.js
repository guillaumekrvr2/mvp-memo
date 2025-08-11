// 📁 components/molecules/CardsThumbnailRow/styles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardsRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#1e1e2e',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  cardsRowContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
    alignItems: 'center',
    height: '100%',
  },
})