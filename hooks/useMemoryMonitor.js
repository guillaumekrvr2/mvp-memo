// hooks/useMemoryMonitor.js
import { useEffect, useRef } from 'react'
import { Image } from 'react-native'

/**
 * Hook pour surveiller la mémoire et déclencher des nettoyages préventifs
 * Surveille les erreurs de type "Pool hard cap violation" et agit proactivement
 */
export function useMemoryMonitor() {
  const errorCount = useRef(0)
  const lastCleanup = useRef(0)
  
  // Fonction de nettoyage d'urgence
  const emergencyCleanup = () => {
    const now = Date.now()
    
    // Éviter les nettoyages trop fréquents (minimum 10 secondes entre chaque)
    if (now - lastCleanup.current < 10000) {
      return
    }
    
    
    
    try {
      // 1. Clear du cache React Native Image
      if (Image.queryCache && typeof Image.queryCache.clear === 'function') {
        Image.queryCache.clear()
        console.log('✅ [MemoryMonitor] Cache Image.queryCache nettoyé')
      }
      
      // 2. Force garbage collection si disponible (mode debug)
      if (global.gc && typeof global.gc === 'function') {
        global.gc()
        console.log('✅ [MemoryMonitor] Garbage collection forcé')
      }
      
      // 3. Clear des caches système si disponibles
      if (Image.abortPrefetch && typeof Image.abortPrefetch === 'function') {
        // Note: abortPrefetch nécessite un URI, on ne peut pas faire un clear global
        console.log('ℹ️ [MemoryMonitor] abortPrefetch disponible mais nécessite URI spécifique')
      }
      
      lastCleanup.current = now
      errorCount.current = 0
      
    } catch (error) {
      console.warn('⚠️ [MemoryMonitor] Erreur lors du nettoyage d\'urgence:', error)
    }
  }
  
  // Fonction de nettoyage préventif (plus doux)
  const preventiveCleanup = () => {
    const now = Date.now()
    
    // Nettoyage préventif toutes les 60 secondes
    if (now - lastCleanup.current < 60000) {
      return
    }
    
    
    try {
      if (Image.queryCache && typeof Image.queryCache.clear === 'function') {
        Image.queryCache.clear()
      }
      lastCleanup.current = now
    } catch (error) {
      console.warn('⚠️ [MemoryMonitor] Erreur nettoyage préventif:', error)
    }
  }
  
  // Surveiller les erreurs globales
  useEffect(() => {
    const originalError = console.error
    
    const errorInterceptor = (...args) => {
      const errorMessage = args.join(' ')
      
      // Détecter les erreurs de mémoire
      if (errorMessage.includes('Pool hard cap violation')) {
        errorCount.current++
        console.log(`🚨 [MemoryMonitor] Erreur Pool hard cap détectée (${errorCount.current}e fois)`)
        
        // Déclenchement immédiat du nettoyage d'urgence
        setTimeout(emergencyCleanup, 100)
      }
      
      // Appeler console.error original
      originalError.apply(console, args)
    }
    
    // Remplacer console.error temporairement
    console.error = errorInterceptor
    
    // Cleanup à la fin
    return () => {
      console.error = originalError
    }
  }, [])
  
  // Nettoyage préventif périodique
  useEffect(() => {
    const interval = setInterval(preventiveCleanup, 30000) // Toutes les 30 secondes
    
    return () => clearInterval(interval)
  }, [])
  
  return {
    emergencyCleanup,
    preventiveCleanup,
    errorCount: errorCount.current
  }
}