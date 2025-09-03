// components/atoms/Commons/LazyImage/LazyImage.jsx
import React, { useCallback, memo } from 'react'
import { Image, View } from 'react-native'

/**
 * Composant LazyImage avec VRAI lazy loading
 * - Si isVisible=false → placeholder gris (PAS de chargement)
 * - Si isVisible=true → Image normale React Native
 */
const LazyImage = memo(({ 
  source, 
  style, 
  profileId,
  isVisible = true,
  resizeMode = 'cover',
  onLoad,
  onError,
  onLoadStart,
  ...props 
}) => {
  
  // 🎯 VRAI LAZY LOADING : Si pas visible, pas d'Image du tout
  if (!isVisible) {
    return (
      <View 
        style={[
          style, 
          { 
            backgroundColor: '#2a2a3e', 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius: 12,
          }
        ]} 
      />
    )
  }
  
  // Gestionnaires d'événements pour les images visibles
  const handleLoadStart = useCallback(() => {
    onLoadStart && onLoadStart()
  }, [onLoadStart])
  
  const handleLoad = useCallback(() => {
    onLoad && onLoad()
  }, [onLoad])
  
  const handleError = useCallback((error) => {
    // En cas d'erreur de mémoire, nettoyage du cache
    if (error.nativeEvent?.error?.includes?.('Pool hard cap')) {
      console.log('🚨 [LazyImage] Pool hard cap détecté, nettoyage cache')
      try {
        if (Image.queryCache?.clear) {
          Image.queryCache.clear()
        }
        if (global.gc) {
          global.gc()
        }
      } catch (cleanError) {
        console.warn('⚠️ Erreur nettoyage cache:', cleanError)
      }
    }
    
    onError && onError(error)
  }, [onError])
  
  // Image normale si visible
  return (
    <Image
      source={source}
      style={style}
      resizeMode={resizeMode}
      onLoadStart={handleLoadStart}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage