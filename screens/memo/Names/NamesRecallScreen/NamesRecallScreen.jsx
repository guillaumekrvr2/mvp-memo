// screens/memo/Names/NamesRecallScreen/NamesRecallScreen.jsx
import React, { useState, useRef } from 'react'
import { SafeAreaView, View, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton'
import NamesRecallCard from '../../../../components/molecules/Names/NamesRecallCard/NamesRecallCard'
import { styles } from './styles'

export default function NamesRecallScreen({ route, navigation }) {
  // Récupération des paramètres depuis la navigation
  const { 
    memorizedProfiles = [],
    objectif,
    temps,
    mode,
    variant,
    discipline
  } = route.params || {}

  // État pour stocker les réponses de l'utilisateur
  const [userAnswers, setUserAnswers] = useState({})
  
  // Refs pour tous les inputs pour la navigation inter-cartes
  const inputRefs = useRef({})

  // Temps fixe de recall à 4 minutes (240 secondes)
  const recallDuration = 240

  // Mise à jour des réponses utilisateur
  const handleAnswerChange = (profileId, field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [profileId]: {
        ...prev[profileId],
        [field]: value
      }
    }))
  }

  // Validation des réponses
  const handleValidate = () => {
    // Compter les réponses complètes
    const completedAnswers = Object.keys(userAnswers).filter(profileId => {
      const answer = userAnswers[profileId]
      return answer?.firstName?.trim() && answer?.lastName?.trim()
    }).length

    Alert.alert(
      'Validation',
      `Vous avez complété ${completedAnswers}/${memorizedProfiles.length} profils.`,
      [
        {
          text: 'Continuer',
          onPress: () => {
            // Navigation vers l'écran de correction (à créer plus tard)
            navigation.goBack()
          }
        }
      ]
    )
  }

  // Fonction pour naviguer vers le prochain input
  const navigateToNextInput = (currentProfileId, currentField) => {
    const currentIndex = memorizedProfiles.findIndex(p => p.id === currentProfileId)
    
    if (currentField === 'firstName') {
      // Prénom → Nom de la même carte
      const lastNameRef = inputRefs.current[`${currentProfileId}-lastName`]
      lastNameRef?.focus()
    } else if (currentField === 'lastName') {
      // Nom → Prénom de la carte suivante
      const nextIndex = currentIndex + 1
      if (nextIndex < memorizedProfiles.length) {
        const nextProfileId = memorizedProfiles[nextIndex].id
        const nextFirstNameRef = inputRefs.current[`${nextProfileId}-firstName`]
        nextFirstNameRef?.focus()
      } else {
        // Dernière carte, fermer le clavier
        const currentRef = inputRefs.current[`${currentProfileId}-lastName`]
        currentRef?.blur()
      }
    }
  }

  // Configuration pour la grille 6x6 avec infinite scroll
  const renderItem = ({ item, index }) => (
    <NamesRecallCard
      profile={item}
      userAnswer={userAnswers[item.id] || {}}
      onAnswerChange={handleAnswerChange}
      inputRefs={inputRefs}
      onNavigateNext={navigateToNextInput}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={handleValidate}
        duration={recallDuration}
        title="Rappel"
      />

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.content}>
          <FlatList
            data={memorizedProfiles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Grille 2x colonnes pour mobile, équivalent à 6x6 sur larger screens
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />} // Plus d'espace vertical
            columnWrapperStyle={styles.row}
            keyboardShouldPersistTaps="handled" // Permet de taper en dehors pour fermer le clavier
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleValidate}>
          Valider
        </PrimaryButton>
      </View>
    </SafeAreaView>
  )
}