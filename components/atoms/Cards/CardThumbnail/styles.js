// 📁 components/atoms/CardThumbnail/styles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardThumbnail: {
    width: 50,
    height: 70,
    marginHorizontal: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
  },
  cardThumbnailActive: {
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  cardThumbnailImage: {
    width: '100%',
    height: '100%',
  },
})