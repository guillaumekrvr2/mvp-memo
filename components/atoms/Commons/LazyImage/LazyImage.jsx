// components/atoms/Commons/LazyImage/LazyImage.jsx
import React, { useCallback, memo } from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'

/**
 * Composant LazyImage optimisé avec expo-image
 * - Si isVisible=false → placeholder gris (PAS de chargement)
 * - Si isVisible=true → expo-image avec cache automatique et optimisations iOS
 */
const LazyImage = memo(({
  source,
  style,
  profileId,
  isVisible = true,
  contentFit = 'cover',
  priority = 'normal',
  placeholder,
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
  
  // Gestionnaires d'événements pour expo-image
  const handleLoadStart = useCallback(() => {
    onLoadStart && onLoadStart()
  }, [onLoadStart])

  const handleLoad = useCallback(() => {
    onLoad && onLoad()
  }, [onLoad])

  const handleError = useCallback((error) => {
    // expo-image gère automatiquement la mémoire, mais on garde le callback
    onError && onError(error)
  }, [onError])
  
  // expo-image optimisé si visible avec cache agressif pour iOS
  return (
    <Image
      source={source}
      style={style}
      contentFit={contentFit}
      priority={priority || "high"}
      placeholder={placeholder}
      onLoadStart={handleLoadStart}
      onLoad={handleLoad}
      onError={handleError}
      cachePolicy="memory-disk"
      recyclingKey={profileId ? String(profileId) : undefined}
      transition={{ duration: 150, effect: 'fade' }}
      allowDownscaling={false}
      decodeFormat="rgb"
      {...props}
    />
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage