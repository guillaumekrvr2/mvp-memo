// screens/memo/Names/NamesMemoScreen/NamesMemoScreen.jsx
import React, { useState, useMemo, useCallback } from 'react'
import { SafeAreaView, View } from 'react-native'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import NamesStack from '../../../../components/molecules/Names/NamesStack/NamesStack'
import NamesThumbnailRow from '../../../../components/molecules/Names/NamesThumbnailRow/NamesThumbnailRow'
import { ChevronButton } from '../../../../components/atoms/Cards/ChevronButton/ChevronButton'
import { useNamesData } from '../../../../hooks/Names/useNamesData'
import useAutoAdvance from '../../../../hooks/useAutoAdvance'
import { useMemoryMonitor } from '../../../../hooks/useMemoryMonitor'
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
  
  // État local pour l'index du profil actuel - SIMPLICITÉ CARDS
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  // État minimal pour éviter le clignotement de la carte C
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Génération des données de noms avec le hook personnalisé
  const { profiles, totalProfiles } = useNamesData(objectif)
  
  // Surveillance de la mémoire pour éviter les crashes
  const { emergencyCleanup } = useMemoryMonitor()

  // Profils à afficher : SIMPLICITÉ CARDS - basé directement sur currentProfileIndex
  const profilesToDisplay = useMemo(() => {
    const maxProfilesToShow = 3
    const profilesToDisplay = []
    
    for (let i = currentProfileIndex; i < Math.min(currentProfileIndex + maxProfilesToShow, profiles.length); i++) {
      if (profiles[i]) {
        profilesToDisplay.push(profiles[i])
      }
    }
    
    return profilesToDisplay
  }, [currentProfileIndex, profiles, totalProfiles])
  const currentProfile = profiles[currentProfileIndex] || null
  const isLastProfile = currentProfileIndex >= totalProfiles - 1

  // Auto-advance : avance automatiquement entre les profils
  useAutoAdvance(autoAdvance, temps, totalProfiles, setCurrentProfileIndex)

  // Navigation vers NamesRecall (à créer plus tard)
  const navigateToRecall = useCallback(() => {
    navigation.navigate('NamesRecall', {
      memorizedProfiles: profiles,
      objectif,
      temps,
      mode,
      variant,
      discipline
    })
  }, [navigation, profiles, objectif, temps, mode, variant, discipline])

  // Gestion du swipe de profil - SIMPLIFIÉE comme Cards
  const handleProfileSwipe = () => {
    if (isLastProfile) {
      // Dernier profil → navigation vers NamesRecall
      navigateToRecall()
    } else {
      // Mise à jour immédiate comme Cards (pas de délai)
      setCurrentProfileIndex(prev => prev + 1)
    }
  }

  // Gestion du bouton Done
  const handleDone = useCallback(() => {
    navigateToRecall()
  }, [navigateToRecall])

  // Navigation entre les profils avec les chevrons - SIMPLICITÉ CARDS
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

  // Sélection directe d'un profil depuis le thumbnail - SIMPLICITÉ CARDS
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
      <View style={{ flex: 1, position: 'relative', marginTop: '15%' }}>
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
          key={`stack-${currentProfileIndex}`} // CLÉ pour reset complet comme Cards
          profilesToDisplay={profilesToDisplay}
          currentProfile={currentProfile}
          isTransitioning={isTransitioning}
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