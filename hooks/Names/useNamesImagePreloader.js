// hooks/Names/useNamesImagePreloader.js
import { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { Platform, Image as RNImage } from 'react-native'
import { getNameImage } from '../../data/imageAssets'
import { clearAllImageCaches, warmupImageCache } from '../../utils/imageCache'

export function useNamesImagePreloader(profiles, startPreloading = false) {
  const [preloadedImages, setPreloadedImages] = useState(new Set())
  const [isPreloading, setIsPreloading] = useState(false)
  const [preloadProgress, setPreloadProgress] = useState(0)

  // Fonction pour obtenir le chemin réel de l'image
  const getRealImagePath = (profile) => {
    return getNameImage(profile.gender, profile.imageNumber)
  }

  useEffect(() => {
    if (!startPreloading || profiles.length === 0) return

    const startPreloadingProcess = async () => {
      setIsPreloading(true)
      setPreloadProgress(0)

      // Sur iOS, on purge d'abord le cache pour forcer expo-image
      if (Platform.OS === 'ios') {
        await clearAllImageCaches()
        await warmupImageCache()
        // Petite pause pour laisser le système se stabiliser
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // Préchargement optimisé pour expo-image
      const batchSize = Platform.OS === 'ios' ? 6 : 8
      let currentIndex = 0
      let successCount = 0
      const preloadedSet = new Set()

    const preloadBatch = () => {
      const batch = profiles.slice(currentIndex, currentIndex + batchSize)

      const batchPromises = batch.map((profile, batchIndex) => {
        return new Promise((resolve) => {
          const imageSource = getRealImagePath(profile)

          if (!imageSource) {
            resolve(false)
            return
          }

          // Délai réduit pour expo-image (plus efficace)
          const delay = batchIndex * 50

          setTimeout(() => {
            try {
              // Pour expo-image, il faut résoudre l'asset d'abord
              let sourceUri
              if (typeof imageSource === 'string') {
                sourceUri = imageSource
              } else if (typeof imageSource === 'object' && imageSource.uri) {
                sourceUri = imageSource.uri
              } else {
                // C'est un require() asset, on doit le résoudre avec React Native Image
                const resolvedAsset = RNImage.resolveAssetSource ? RNImage.resolveAssetSource(imageSource) : null
                sourceUri = resolvedAsset?.uri
              }

              if (sourceUri) {
                Image.prefetch(sourceUri)
                  .then(() => {
                    preloadedSet.add(profile.id)
                    successCount++
                    resolve(true)
                  })
                  .catch(() => {
                    resolve(false)
                  })
              } else {
                resolve(false)
              }
            } catch (error) {
              
              resolve(false)
            }
          }, delay)
        })
      })

      Promise.all(batchPromises).then(() => {
        // Mise à jour du state
        setPreloadedImages(new Set(preloadedSet))
        setPreloadProgress(Math.min(currentIndex + batchSize, profiles.length))
        
        currentIndex += batchSize
        
        // Continuer avec le batch suivant
        if (currentIndex < profiles.length) {
          setTimeout(preloadBatch, 100) // Pause réduite pour expo-image
        } else {
          setIsPreloading(false)
        }
      })
    }

      preloadBatch()
    }

    startPreloadingProcess()

  }, [startPreloading, profiles])

  return {
    preloadedImages,
    isPreloading,
    preloadProgress,
    totalImages: profiles.length,
    isImagePreloaded: (profileId) => preloadedImages.has(profileId)
  }
}