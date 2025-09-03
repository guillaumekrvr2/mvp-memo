// components/molecules/Names/NamesStack/NamesStack.jsx
import React from 'react'
import { View, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import WordsCell from '../../../atoms/Words/WordsCell/WordsCell'
import LazyImage from '../../../atoms/Commons/LazyImage/LazyImage'
import { useNamesSwipeGesture } from '../../../../hooks/Names/useNamesSwipeGesture'
import { styles } from './styles'

const { width } = Dimensions.get('window')

export function NamesStack({ 
  profilesToDisplay, 
  currentProfile,
  onProfileSwipe 
}) {

  return (
    <View style={styles.container}>
      {/* Profiles empilées (effet de profondeur) */}
      {profilesToDisplay.map((profile, index) => {
        const isTopProfile = index === 0
        const zIndex = profilesToDisplay.length - index
        
        return (
          <ProfileCardWithGesture
            key={profile.id}
            profile={profile}
            index={index}
            isTopProfile={isTopProfile}
            zIndex={zIndex}
            onProfileSwipe={onProfileSwipe}
          />
        )
      })}
    </View>
  )
}

// Composant pour gérer les profils individuels avec gestes optimisés
function ProfileCardWithGesture({ 
  profile, 
  index, 
  isTopProfile, 
  zIndex,
  onProfileSwipe
}) {
  const { panGesture, translateX, translateY, rotateZ, scale } = useNamesSwipeGesture({
    isTopProfile,
    onSwipe: onProfileSwipe
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
      opacity: 1, // Garde l'opacité fixe à 1 pour éviter de voir les cartes en dessous
      zIndex,
    }
  })

  const CardContent = (
    <Animated.View style={[styles.profileCard, animatedStyle]}>
      {/* Image principale avec LazyImage */}
      <View style={styles.imageContainer}>
        <LazyImage
          source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
          style={styles.profileImage}
          profileId={profile.id}
          isVisible={index < 2} // Seules les 2 premières cartes chargent leur image
          resizeMode="cover"
          onLoad={() => console.log(`📷 [LazyImage] Image chargée: ${profile.firstName} ${profile.lastName} (${profile.gender}${profile.imageNumber})`)}
          onError={(error) => console.log(`❌ [LazyImage] Erreur image: ${profile.firstName} ${profile.lastName}`, error.nativeEvent)}
          onLoadStart={() => console.log(`🔄 [LazyImage] Début chargement: ${profile.firstName} ${profile.lastName} (${profile.gender}${profile.imageNumber})`)}
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
}

export default NamesStack