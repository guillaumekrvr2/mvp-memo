// screens/memo/Names/NamesMemoScreen/NamesMemoScreen.jsx
import React, { useState, useMemo, useCallback } from 'react'
import { SafeAreaView, View } from 'react-native'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import NamesStack from '../../../../components/molecules/Names/NamesStack/NamesStack'
import NamesThumbnailRow from '../../../../components/molecules/Names/NamesThumbnailRow/NamesThumbnailRow'
import { ChevronButton } from '../../../../components/atoms/Cards/ChevronButton/ChevronButton'
import { useNamesData } from '../../../../hooks/Names/useNamesData'
import useAutoAdvance from '../../../../hooks/useAutoAdvance'
import { styles } from './styles'

export default function NamesMemoScreen({ route, navigation }) {
  // Récupération des paramètres depuis la navigation
  const { 
    objectif = 20, 
    temps = 120, 
    mode,
    variant,
    autoAdvance,
    discipline,
    fromValue,
    toValue,
    useSpecificRange
  } = route.params || {}
  
  // État local pour l'index du profil actuel
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  
  // Génération des données de noms avec le hook personnalisé
  const { profiles, totalProfiles } = useNamesData(objectif)

  // Profils à afficher : profil actuel + quelques suivants pour l'effet de pile
  const getProfilesToDisplay = () => {
    const maxProfilesToShow = 4
    const profilesToDisplay = []
    
    for (let i = currentProfileIndex; i < Math.min(currentProfileIndex + maxProfilesToShow, profiles.length); i++) {
      if (profiles[i]) {
        profilesToDisplay.push(profiles[i])
      }
    }
    
    return profilesToDisplay
  }

  const profilesToDisplay = getProfilesToDisplay()
  const currentProfile = profiles[currentProfileIndex] || null
  const isLastProfile = currentProfileIndex >= totalProfiles - 1

  // Auto-advance : avance automatiquement entre les profils
  useAutoAdvance(autoAdvance, temps, totalProfiles, setCurrentProfileIndex)

  // Navigation vers NamesRecall (à créer plus tard)
  const navigateToRecall = useCallback(() => {
    // Pour l'instant, on retourne à l'écran précédent
    // Plus tard : navigation.navigate('NamesRecall', { memorizedProfiles: profiles, ... })
    console.log('Navigation vers NamesRecall - à implémenter')
    navigation.goBack()
  }, [navigation, profiles])

  // Gestion du swipe de profil
  const handleProfileSwipe = () => {
    if (isLastProfile) {
      // Dernier profil → navigation vers NamesRecall
      setTimeout(() => {
        navigateToRecall()
      }, 1000)
    } else {
      // Passer au profil suivant
      setCurrentProfileIndex(prev => prev + 1)
    }
  }

  // Gestion du bouton Done
  const handleDone = useCallback(() => {
    navigateToRecall()
  }, [navigateToRecall])

  // Navigation entre les profils avec les chevrons
  const handlePreviousProfile = useCallback(() => {
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex(prev => prev - 1)
    }
  }, [currentProfileIndex])

  const handleNextProfile = useCallback(() => {
    if (currentProfileIndex < totalProfiles - 1) {
      setCurrentProfileIndex(prev => prev + 1)
    }
  }, [currentProfileIndex, totalProfiles])

  // Sélection directe d'un profil depuis le thumbnail
  const handleProfileSelect = useCallback((index) => {
    if (index >= 0 && index < totalProfiles) {
      setCurrentProfileIndex(index)
    }
  }, [totalProfiles])

  return (
    <SafeAreaView style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={handleDone}
        duration={temps}
      />

      {/* Container pour les profils avec chevrons */}
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Chevron gauche */}
        <ChevronButton
          direction="left"
          onPress={handlePreviousProfile}
          disabled={currentProfileIndex === 0}
          style={{ 
            position: 'absolute',
            left: 20,
            top: '45%',
            zIndex: 1000,
            elevation: 1000,
            transform: [{ translateY: -20 }]
          }}
        />

        {/* Chevron droit */}
        <ChevronButton
          direction="right"
          onPress={handleNextProfile}
          disabled={currentProfileIndex >= totalProfiles - 1}
          style={{ 
            position: 'absolute',
            right: 20,
            top: '45%',
            zIndex: 1000,
            elevation: 1000,
            transform: [{ translateY: -20 }]
          }}
        />

        <NamesStack
          profilesToDisplay={profilesToDisplay}
          currentProfile={currentProfile}
          onProfileSwipe={handleProfileSwipe}
        />
      </View>

      <NamesThumbnailRow
        profiles={profiles}
        currentProfileIndex={currentProfileIndex}
        onProfileSelect={handleProfileSelect}
      />
    </SafeAreaView>
  )
}