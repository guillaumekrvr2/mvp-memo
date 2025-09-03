// components/molecules/Names/NamesThumbnailRow/NamesThumbnailRow.jsx
import React, { useRef, useEffect, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import LazyImage from '../../../atoms/Commons/LazyImage/LazyImage'
import { styles } from './styles'

export function NamesThumbnailRow({ 
  profiles, 
  currentProfileIndex, 
  onProfileSelect 
}) {
  const scrollViewRef = useRef(null)

  // Auto-scroll pour garder le profil actuel centré
  useEffect(() => {
    if (scrollViewRef.current && profiles.length > 0) {
      const itemWidth = 80 // largeur + margin des thumbnails
      const centerOffset = currentProfileIndex * itemWidth - (itemWidth * 1.5)
      
      scrollViewRef.current.scrollTo({
        x: Math.max(0, centerOffset),
        animated: true
      })
    }
  }, [currentProfileIndex])

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {profiles.map((profile, index) => {
          const isActive = index === currentProfileIndex
          const isPassed = index < currentProfileIndex
          
          // Ne charger que les thumbnails proches du profil actuel (fenêtre de ±5)
          const distanceFromCurrent = Math.abs(index - currentProfileIndex)
          const shouldLoadThumbnail = distanceFromCurrent <= 5
          
          return (
            <TouchableOpacity
              key={profile.id}
              style={[
                styles.thumbnail,
                isActive && styles.activeThumbnail,
                isPassed && styles.passedThumbnail
              ]}
              onPress={() => onProfileSelect(index)}
              activeOpacity={0.8}
            >
              <LazyImage
                source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
                style={[
                  styles.thumbnailImage,
                  isPassed && styles.passedImage
                ]}
                profileId={`thumb-${profile.id}`} // ID unique pour les thumbnails
                isVisible={shouldLoadThumbnail}
                resizeMode="cover"
              />
              
              {/* Indicateur de progression */}
              <View style={[
                styles.progressIndicator,
                isActive && styles.activeIndicator,
                isPassed && styles.passedIndicator
              ]} />
              
              {/* Nom sous la miniature pour les actifs */}
              {isActive && (
                <Text style={styles.thumbnailName}>
                  {profile.firstName}
                </Text>
              )}
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default NamesThumbnailRow