// hooks/useImageMemoryManager.js
import { useState, useCallback, useRef, useEffect } from 'react'
import { Image } from 'expo-image'

/**
 * Hook pour gérer intelligemment la mémoire des images avec expo-image
 * - Pool augmenté pour expo-image (plus efficace)
 * - Cache automatique expo-image intégré
 * - Nettoyage périodique optimisé
 */
export function useImageMemoryManager(maxImagesInMemory = 25) {
  const [loadedImages, setLoadedImages] = useState(new Set())
  const imagePool = useRef(new Map()) // Track images currently in memory
  const lastCleanup = useRef(Date.now())
  
  // Nettoie le cache expo-image si nécessaire
  const cleanupCache = useCallback(() => {
    const now = Date.now()

    // Nettoyage toutes les 45 secondes (expo-image plus efficace)
    if (now - lastCleanup.current > 45000) {
      console.log('🧹 [ImageMemory] Nettoyage cache expo-image')

      try {
        // expo-image cache cleanup
        Image.clearMemoryCache()

        lastCleanup.current = now

        // Reset notre tracking interne
        setLoadedImages(new Set())
        imagePool.current.clear()

      } catch (error) {
        console.warn('⚠️ [ImageMemory] Erreur nettoyage cache expo-image:', error)
      }
    }
  }, [])
  
  // Charge une image de manière contrôlée
  const loadImage = useCallback((imageUri, profileId) => {
    // Vérifier si on peut charger plus d'images
    if (imagePool.current.size >= maxImagesInMemory) {
      // Libérer les plus anciennes images (FIFO)
      const oldestKeys = Array.from(imagePool.current.keys()).slice(0, 2)
      oldestKeys.forEach(key => {
        console.log(`♻️ [ImageMemory] Déchargement image ${key}`)
        imagePool.current.delete(key)
        setLoadedImages(prev => {
          const newSet = new Set(prev)
          newSet.delete(key)
          return newSet
        })
      })
    }
    
    // Ajouter la nouvelle image au pool
    imagePool.current.set(profileId, imageUri)
    setLoadedImages(prev => new Set([...prev, profileId]))
    
    console.log(`📷 [ImageMemory] Image chargée ${profileId}, pool: ${imagePool.current.size}/${maxImagesInMemory}`)
    
    // Nettoyage périodique
    cleanupCache()
    
  }, [maxImagesInMemory, cleanupCache])
  
  // Décharge une image spécifique
  const unloadImage = useCallback((profileId) => {
    if (imagePool.current.has(profileId)) {
      imagePool.current.delete(profileId)
      setLoadedImages(prev => {
        const newSet = new Set(prev)
        newSet.delete(profileId)
        return newSet
      })
      console.log(`🗑️ [ImageMemory] Image déchargée ${profileId}`)
    }
  }, [])
  
  // Vérifier si une image est chargée
  const isImageLoaded = useCallback((profileId) => {
    return loadedImages.has(profileId)
  }, [loadedImages])
  
  // Nettoyage complet expo-image (méthode d'urgence)
  const emergencyCleanup = useCallback(() => {
    console.log('🚨 [ImageMemory] Nettoyage d\'urgence expo-image!')

    try {
      // Clear tous les caches expo-image
      Image.clearMemoryCache()
      Image.clearDiskCache()

      // Reset notre état
      setLoadedImages(new Set())
      imagePool.current.clear()

      // Force garbage collection si disponible
      if (global.gc) {
        global.gc()
      }

    } catch (error) {
      console.warn('⚠️ [ImageMemory] Erreur nettoyage urgence expo-image:', error)
    }
  }, [])
  
  return {
    loadImage,
    unloadImage,
    isImageLoaded,
    emergencyCleanup,
    poolSize: imagePool.current.size,
    maxPoolSize: maxImagesInMemory
  }
}