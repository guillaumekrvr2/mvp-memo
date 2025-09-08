// hooks/Names/useNamesImagePreloader.js
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { getNameImage } from '../../data/imageAssets'

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

    setIsPreloading(true)
    setPreloadProgress(0)
    
    
    // Préchargement par batch pour éviter de surcharger
    const batchSize = 5
    let currentIndex = 0
    let successCount = 0
    const preloadedSet = new Set()

    const preloadBatch = () => {
      const batch = profiles.slice(currentIndex, currentIndex + batchSize)
      
      const batchPromises = batch.map((profile, batchIndex) => {
        return new Promise((resolve) => {
          const imageSource = getRealImagePath(profile)
          
          if (!imageSource) {
            console.log(`⚠️ Skipping ${profile.firstName} ${profile.lastName} - image not found`)
            resolve(false)
            return
          }

          // Délai progressif pour éviter la congestion
          const delay = batchIndex * 100
          
          setTimeout(() => {
            try {
              const resolvedAsset = Image.resolveAssetSource(imageSource)
              if (resolvedAsset && resolvedAsset.uri) {
                Image.prefetch(resolvedAsset.uri)
                  .then(() => {
                    preloadedSet.add(profile.id)
                    successCount++
                    resolve(true)
                  })
                  .catch((error) => {
                    console.log(`❌ Erreur preload ${profile.firstName}:`, error)
                    resolve(false)
                  })
              } else {
                console.log(`❌ Asset non résolu pour ${profile.firstName}`)
                resolve(false)
              }
            } catch (error) {
              console.log(`❌ Erreur générale preload ${profile.firstName}:`, error)
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
          setTimeout(preloadBatch, 200) // Pause entre les batches
        } else {
          setIsPreloading(false)
        }
      })
    }

    preloadBatch()
    
  }, [startPreloading, profiles])

  return {
    preloadedImages,
    isPreloading,
    preloadProgress,
    totalImages: profiles.length,
    isImagePreloaded: (profileId) => preloadedImages.has(profileId)
  }
}