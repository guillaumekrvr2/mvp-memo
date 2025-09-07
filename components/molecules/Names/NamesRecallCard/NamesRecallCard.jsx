// components/molecules/Names/NamesRecallCard/NamesRecallCard.jsx
import React, { useRef, memo, useCallback } from 'react'
import { View, TextInput } from 'react-native'
import LazyImage from '../../../atoms/Commons/LazyImage/LazyImage'
import { styles } from './styles'

// Composant WordsCell réduit pour l'écran de recall - optimisé avec memo
const SmallWordsCell = memo(({ value, onTextChange, inputRef, onSubmitEditing, returnKeyType = "next" }) => {
  return (
    <View style={styles.nameInput}>
      <TextInput
        ref={inputRef}
        style={styles.nameInputText}
        value={value}
        onChangeText={onTextChange}
        textAlign="center"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
      />
    </View>
  )
})

const NamesRecallCard = memo(({ 
  profile, 
  userAnswer = {}, 
  onAnswerChange,
  inputRefs,
  onNavigateNext,
  isVisible = true
}) => {
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  
  // Enregistrer les refs dans le parent pour la navigation inter-cartes
  React.useEffect(() => {
    if (inputRefs && inputRefs.current) {
      inputRefs.current[`${profile.id}-firstName`] = firstNameRef.current
      inputRefs.current[`${profile.id}-lastName`] = lastNameRef.current
    }
  }, [profile.id, inputRefs])

  const handleFirstNameChange = useCallback((value) => {
    onAnswerChange(profile.id, 'firstName', value)
  }, [onAnswerChange, profile.id])

  const handleLastNameChange = useCallback((value) => {
    onAnswerChange(profile.id, 'lastName', value)
  }, [onAnswerChange, profile.id])

  const handleFirstNameSubmit = useCallback(() => {
    // Navigation vers le champ nom de la même carte
    if (onNavigateNext) {
      onNavigateNext(profile.id, 'firstName')
    } else {
      lastNameRef.current?.focus()
    }
  }, [onNavigateNext, profile.id])

  const handleLastNameSubmit = useCallback(() => {
    // Navigation vers le prénom de la carte suivante ou fermeture
    if (onNavigateNext) {
      onNavigateNext(profile.id, 'lastName')
    } else {
      lastNameRef.current?.blur()
    }
  }, [onNavigateNext, profile.id])

  return (
    <View style={styles.container}>
      {/* Image du profil */}
      <View style={styles.imageContainer}>
        <LazyImage
          source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
          style={styles.profileImage}
          profileId={`recall-${profile.id}`}
          isVisible={isVisible}
          resizeMode="cover"
        />
      </View>

      {/* Champs de saisie pour prénom et nom */}
      <View style={styles.inputContainer}>
        <SmallWordsCell
          inputRef={firstNameRef}
          value={userAnswer.firstName || ''}
          onTextChange={handleFirstNameChange}
          onSubmitEditing={handleFirstNameSubmit}
          returnKeyType="next"
        />
        <SmallWordsCell
          inputRef={lastNameRef}
          value={userAnswer.lastName || ''}
          onTextChange={handleLastNameChange}
          onSubmitEditing={handleLastNameSubmit}
          returnKeyType="done"
        />
      </View>
    </View>
  )
})

NamesRecallCard.displayName = 'NamesRecallCard'

export default NamesRecallCard