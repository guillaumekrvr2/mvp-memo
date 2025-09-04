// screens/memo/Names/NamesRecallScreen/NamesRecallScreen.jsx
import React, { useState, useRef } from 'react'
import { SafeAreaView, View, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
  const flatListRef = useRef(null)
  
  // Safe area insets pour un positionnement intelligent
  const insets = useSafeAreaInsets()

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

  // Fonction pour naviguer vers le prochain input avec gestion du lazy loading
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
        
        if (nextFirstNameRef) {
          // La ref existe déjà, on peut directement faire le focus
          nextFirstNameRef.focus()
        } else {
          // La carte n'est pas encore rendue, forcer le scroll et attendre
          flatListRef.current?.scrollToIndex({ 
            index: nextIndex, 
            animated: true,
            viewPosition: 0.5 // Centrer la carte suivante
          })
          
          // Attendre que la carte soit rendue puis faire le focus
          const checkAndFocus = () => {
            const ref = inputRefs.current[`${nextProfileId}-firstName`]
            if (ref) {
              ref.focus()
            } else {
              // Réessayer après un court délai
              setTimeout(checkAndFocus, 50)
            }
          }
          
          // Délai court pour laisser la FlatList se mettre à jour
          setTimeout(checkAndFocus, 100)
        }
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.select({ios: 80, android: 100})}
      >
        <View style={styles.content}>
          <FlatList
            ref={flatListRef}
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
            
            // 🚀 Optimisations pour le lazy loading et navigation curseur
            initialNumToRender={10} // Rendre les 10 premières cartes (5 rangées) immédiatement
            windowSize={8} // Garder 4 pages en mémoire (2 avant + 2 après la vue courante)
            maxToRenderPerBatch={6} // Rendre 6 éléments par batch (3 rangées)
            updateCellsBatchingPeriod={100} // Attendre 100ms entre les rendus batch
            removeClippedSubviews={false} // Désactiver pour éviter les problèmes de focus
            onScrollToIndexFailed={(info) => {
              // Fallback si scrollToIndex échoue
              console.warn('ScrollToIndex failed:', info)
              flatListRef.current?.scrollToOffset({ 
                offset: info.index * 200, // Estimation de hauteur par élément
                animated: true 
              })
            }}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={[styles.buttonContainer, { bottom: insets.bottom + 10 }]}>
        <PrimaryButton onPress={handleValidate}>
          Valider
        </PrimaryButton>
      </View>
    </SafeAreaView>
  )
}