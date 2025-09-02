// components/molecules/Names/NamesThumbnailRow/styles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    backdropFilter: 'blur(10px)',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },

  thumbnail: {
    width: 60,
    height: 80,
    marginHorizontal: 8,
    alignItems: 'center',
    opacity: 0.6,
  },

  activeThumbnail: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },

  passedThumbnail: {
    opacity: 0.4,
  },

  thumbnailImage: {
    width: 50,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  passedImage: {
    borderColor: 'rgba(34, 197, 94, 0.6)', // Vert pour "complété"
  },

  progressIndicator: {
    width: 50,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginTop: 4,
  },

  activeIndicator: {
    backgroundColor: '#667eea',
  },

  passedIndicator: {
    backgroundColor: '#22c55e',
  },

  thumbnailName: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
})