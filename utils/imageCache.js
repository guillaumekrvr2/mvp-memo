// utils/imageCache.js
import { Image } from 'expo-image'
import { Platform } from 'react-native'

/**
 * Utilitaires pour la gestion du cache d'images optimisés pour iOS
 */

export const clearAllImageCaches = async () => {
  try {
    // Clear expo-image caches
    await Image.clearMemoryCache()
    await Image.clearDiskCache()

    return true
  } catch (error) {
    return false
  }
}

export const preloadImagesOptimized = async (imageSources) => {
  if (Platform.OS !== 'ios') {
    // On Android, on utilise le préchargement normal
    return Promise.all(imageSources.map(source => Image.prefetch(source)))
  }

  // Sur iOS, préchargement optimisé par batches
  const batchSize = 6
  const results = []

  for (let i = 0; i < imageSources.length; i += batchSize) {
    const batch = imageSources.slice(i, i + batchSize)
    const batchResults = await Promise.allSettled(
      batch.map(source => Image.prefetch(source))
    )
    results.push(...batchResults)

    // Petite pause entre les batches pour éviter la surcharge
    if (i + batchSize < imageSources.length) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  return results
}

export const warmupImageCache = async () => {
  if (Platform.OS === 'ios') {
    // Configuration optimale pour iOS
    try {
      // Ici on pourrait ajouter des configurations spécifiques iOS si nécessaire
    } catch (error) {
      // Silent error
    }
  }
}