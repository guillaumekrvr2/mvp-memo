// components/molecules/Names/NamesStack/NamesStack.jsx
import React, { useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import WordsCell from '../../../atoms/Words/WordsCell/WordsCell'
import LazyImage from '../../../atoms/Commons/LazyImage/LazyImage'
import { useNamesSwipeGesture } from '../../../../hooks/Names/useNamesSwipeGesture'
import { styles } from './styles'

const { width } = Dimensions.get('window')

export function NamesStack({
  profilesToDisplay,
  currentProfile,
  isTransitioning,
  onProfileSwipe,
  style
}) {
  // Générer une clé unique pour forcer la réinitialisation du hook comme Cards
  const topProfileKey = profilesToDisplay[0]?.id || 'empty'
  const handleSwipeStart = () => {
    // Swipe détecté
  }

  const handleSwipeComplete = () => {
    onProfileSwipe()
  }

  return (
    <View style={[styles.container, style]}>
      {/* Profiles empilées (effet de profondeur) */}
      {profilesToDisplay.map((profile, index) => {
        const isTopProfile = index === 0
        const zIndex = profilesToDisplay.length - index
        
        return (
          <ProfileCardWithGesture
            key={isTopProfile ? `top-${topProfileKey}` : `${profile.id}-${index}`} // CLÉ pour réinitialiser le hook
            profile={profile}
            index={index}
            isTopProfile={isTopProfile}
            zIndex={zIndex}
            isTransitioning={isTransitioning}
            onSwipeStart={handleSwipeStart}
            onSwipeComplete={handleSwipeComplete}
          />
        )
      })}
    </View>
  )
}

// Composant pour gérer les profils individuels avec gestes optimisés
const ProfileCardWithGesture = React.memo(({ 
  profile, 
  index, 
  isTopProfile, 
  zIndex,
  isTransitioning,
  onSwipeStart,
  onSwipeComplete
}) => {
  const { panGesture, translateX, translateY, rotateZ, scale } = useNamesSwipeGesture({
    isTopProfile,
    onSwipeStart: isTopProfile ? onSwipeStart : () => {}, // Hook actif seulement pour le top
    onSwipe: isTopProfile ? onSwipeComplete : () => {} // Hook actif seulement pour le top
  })

  const scaleOffset = 1 - (index * 0.03) // Légère réduction de taille pour les cartes derrière
  const translateYOffset = index * 6 // Décalage vertical plus subtil

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: isTopProfile ? scale.value * scaleOffset : scaleOffset },
        { translateY: isTopProfile ? translateY.value + translateYOffset : translateYOffset },
        { translateX: isTopProfile ? translateX.value : 0 },
        { rotateZ: isTopProfile ? `${rotateZ.value}deg` : '0deg' },
      ],
      opacity: 1, // Simplifié : pas de gestion complexe d'opacité
      zIndex,
    }
  })

  // Couleurs debug supprimées pour un design clean
  
  const CardContent = (
    <Animated.View style={[styles.profileCard, animatedStyle]}>
      {/* Image principale avec LazyImage */}
      <View style={styles.imageContainer}>
        <LazyImage
          source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
          style={styles.profileImage}
          profileId={profile.id}
          isVisible={true} // CORRECTION FINALE: Toujours charger (pas de rechargement inutile) 
          resizeMode="cover"
          onLoad={() => {}}
          onError={() => {}}
          onLoadStart={() => {}}
        />
      </View>

      {/* Noms en dessous */}
      <View style={styles.namesContainer}>
        <WordsCell 
          word={profile.firstName}
          style={styles.firstNameCell}
        />
        <WordsCell 
          word={profile.lastName}
          style={styles.lastNameCell}
        />
      </View>
    </Animated.View>
  )

  // Seule la carte du dessus est interactive
  if (isTopProfile) {
    return (
      <GestureDetector gesture={panGesture}>
        {CardContent}
      </GestureDetector>
    )
  }

  return CardContent
}, (prevProps, nextProps) => {
  // IMPORTANT: Re-render si isTopProfile change (pour activer/désactiver le hook)
  return prevProps.profile.id === nextProps.profile.id && 
         prevProps.index === nextProps.index &&
         prevProps.isTopProfile === nextProps.isTopProfile &&
         prevProps.zIndex === nextProps.zIndex &&
         prevProps.isTransitioning === nextProps.isTransitioning
})

export default NamesStack