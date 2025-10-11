// hooks/Cards/useCardsImagePreloader.js
import { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { Platform, Image as RNImage } from 'react-native'
import { clearAllImageCaches, warmupImageCache } from '../../utils/imageCache'

export function useCardsImagePreloader(cards, startPreloading = false) {
  const [preloadedImages, setPreloadedImages] = useState(new Set())
  const [isPreloading, setIsPreloading] = useState(false)
  const [preloadProgress, setPreloadProgress] = useState(0)

  useEffect(() => {
    if (!startPreloading || cards.length === 0) return

    const startPreloadingProcess = async () => {
      setIsPreloading(true)
      setPreloadProgress(0)

      // Sur iOS, purger le cache pour forcer expo-image
      if (Platform.OS === 'ios') {
        await clearAllImageCaches()
        await warmupImageCache()
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Préchargement optimisé pour cartes (assets statiques)
      const batchSize = Platform.OS === 'ios' ? 10 : 15
      let currentIndex = 0
      let successCount = 0
      const preloadedSet = new Set()

      const preloadBatch = () => {
        const batch = cards.slice(currentIndex, currentIndex + batchSize)

        const batchPromises = batch.map((card, batchIndex) => {
          return new Promise((resolve) => {
            if (!card.asset) {
              resolve(false)
              return
            }

            // Délai minimal pour cartes (assets statiques plus légers)
            const delay = batchIndex * 25

            setTimeout(() => {
              try {
                // Résoudre l'asset de carte
                let sourceUri
                if (typeof card.asset === 'string') {
                  sourceUri = card.asset
                } else if (typeof card.asset === 'object' && card.asset.uri) {
                  sourceUri = card.asset.uri
                } else {
                  // Asset require() - résoudre avec React Native Image
                  const resolvedAsset = RNImage.resolveAssetSource ? RNImage.resolveAssetSource(card.asset) : null
                  sourceUri = resolvedAsset?.uri
                }

                if (sourceUri) {
                  Image.prefetch(sourceUri)
                    .then(() => {
                      preloadedSet.add(card.id)
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
          setPreloadProgress(Math.min(currentIndex + batchSize, cards.length))

          currentIndex += batchSize

          // Continuer avec le batch suivant
          if (currentIndex < cards.length) {
            setTimeout(preloadBatch, 50) // Pause très courte pour cartes
          } else {
            setIsPreloading(false)
          }
        })
      }

      preloadBatch()
    }

    startPreloadingProcess()

  }, [startPreloading, cards])

  return {
    preloadedImages,
    isPreloading,
    preloadProgress,
    totalImages: cards.length,
    isImagePreloaded: (cardId) => preloadedImages.has(cardId)
  }
}