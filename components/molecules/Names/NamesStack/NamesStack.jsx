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
  onProfileSwipe 
}) {
  // SharedValue pour l'état d'animation partagé entre les cartes
  const topCardIsAnimating = useSharedValue(false)

  const handleSwipeStart = () => {
    console.log('🚀 [NamesStack] Swipe détecté')
  }

  const handleSwipeComplete = () => {
    console.log('✅ [NamesStack] Swipe terminé, déclenchement callback parent')
    onProfileSwipe()
  }

  return (
    <View style={styles.container}>
      {/* Profiles empilées (effet de profondeur) */}
      {profilesToDisplay.map((profile, index) => {
        const isTopProfile = index === 0
        const zIndex = profilesToDisplay.length - index
        
        return (
          <ProfileCardWithGesture
            key={`${profile.id}-${index}`}
            profile={profile}
            index={index}
            isTopProfile={isTopProfile}
            zIndex={zIndex}
            topCardIsAnimating={topCardIsAnimating}
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
  topCardIsAnimating,
  isTransitioning,
  onSwipeStart,
  onSwipeComplete
}) => {
  // Debug: Log des re-renders pour traquer le flash
  console.log(`🎭 [ProfileCard] Render ${profile.firstName} index=${index} isTop=${isTopProfile} zIndex=${zIndex}`)
  const { panGesture, translateX, translateY, rotateZ, scale, isAnimating } = useNamesSwipeGesture({
    isTopProfile,
    onSwipeStart,
    onSwipe: onSwipeComplete
  })

  // Synchroniser l'état d'animation local avec l'état partagé (seulement pour la carte du dessus)
  React.useEffect(() => {
    if (isTopProfile) {
      // Synchronisation continue entre l'état local et partagé
      const syncAnimation = () => {
        topCardIsAnimating.value = isAnimating.value
      }
      syncAnimation()
    }
  }, [isTopProfile, isAnimating, topCardIsAnimating])

  const scaleOffset = 1 - (index * 0.03) // Légère réduction de taille pour les cartes derrière
  const translateYOffset = index * 6 // Décalage vertical plus subtil

  const animatedStyle = useAnimatedStyle(() => {
    // CORRECTION LOGIQUE: Masquer carte C (index 2) pendant la transition
    let cardOpacity = 1
    if (index === 2 && isTransitioning) {
      cardOpacity = 0 // Masquer C (index 2) pour que B (index 1) reste visible
    }

    return {
      transform: [
        { scale: isTopProfile ? scale.value * scaleOffset : scaleOffset },
        { translateY: isTopProfile ? translateY.value + translateYOffset : translateYOffset },
        { translateX: isTopProfile ? translateX.value : 0 },
        { rotateZ: isTopProfile ? `${rotateZ.value}deg` : '0deg' },
      ],
      opacity: cardOpacity,
      zIndex,
    }
  })

  // DEBUG: Couleurs pour identifier les cartes
  const debugColors = ['#ff000040', '#00ff0040', '#0000ff40', '#ffff0040']
  const debugColor = debugColors[index] || '#ffffff20'
  
  const CardContent = (
    <Animated.View style={[styles.profileCard, animatedStyle, { backgroundColor: debugColor }]}>
      {/* DEBUG: Indicateur visuel */}
      <View style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 4,
        borderRadius: 4,
        zIndex: 1000
      }}>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
          {index}:{profile.firstName}
        </Text>
      </View>
      
      {/* Image principale avec LazyImage */}
      <View style={styles.imageContainer}>
        <LazyImage
          source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
          style={styles.profileImage}
          profileId={profile.id}
          isVisible={true} // CORRECTION FINALE: Toujours charger (pas de rechargement inutile) 
          resizeMode="cover"
          onLoad={() => console.log(`📷 [LazyImage] Image chargée: ${profile.firstName} (index=${index}, zIndex=${zIndex})`)}
          onError={(error) => console.log(`❌ [LazyImage] Erreur image: ${profile.firstName} (index=${index})`, error.nativeEvent)}
          onLoadStart={() => console.log(`🔄 [LazyImage] Début chargement: ${profile.firstName} (index=${index}, zIndex=${zIndex})`)}
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
  // Ne re-render que si le profil change vraiment
  return prevProps.profile.id === nextProps.profile.id && 
         prevProps.index === nextProps.index &&
         prevProps.isTopProfile === nextProps.isTopProfile &&
         prevProps.zIndex === nextProps.zIndex
})

export default NamesStack