// components/molecules/Names/NamesStack/NamesStack.jsx
import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import WordsCell from '../../../atoms/Words/WordsCell/WordsCell'
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
    const opacity = isTopProfile 
      ? Math.max(0.3, 1 - Math.abs(translateX.value) / (width * 0.8))
      : 1

    return {
      transform: [
        { scale: isTopProfile ? scale.value * scaleOffset : scaleOffset },
        { translateY: isTopProfile ? translateY.value + translateYOffset : translateYOffset },
        { translateX: isTopProfile ? translateX.value : 0 },
        { rotateZ: isTopProfile ? `${rotateZ.value}deg` : '0deg' },
      ],
      opacity,
      zIndex,
    }
  })

  const CardContent = (
    <Animated.View style={[styles.profileCard, animatedStyle]}>
      {/* Image principale */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
          style={styles.profileImage}
          resizeMode="cover"
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