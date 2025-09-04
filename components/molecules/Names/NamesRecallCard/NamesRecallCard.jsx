// components/molecules/Names/NamesRecallCard/NamesRecallCard.jsx
import React, { useRef } from 'react'
import { View, TextInput } from 'react-native'
import LazyImage from '../../../atoms/Commons/LazyImage/LazyImage'
import { styles } from './styles'

// Composant WordsCell réduit pour l'écran de recall
const SmallWordsCell = ({ value, onTextChange, inputRef, onSubmitEditing, returnKeyType = "next" }) => {
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
}

export default function NamesRecallCard({ 
  profile, 
  userAnswer = {}, 
  onAnswerChange,
  inputRefs,
  onNavigateNext
}) {
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  
  // Enregistrer les refs dans le parent pour la navigation inter-cartes
  React.useEffect(() => {
    if (inputRefs && inputRefs.current) {
      inputRefs.current[`${profile.id}-firstName`] = firstNameRef.current
      inputRefs.current[`${profile.id}-lastName`] = lastNameRef.current
    }
  }, [profile.id, inputRefs])

  const handleFirstNameChange = (value) => {
    onAnswerChange(profile.id, 'firstName', value)
  }

  const handleLastNameChange = (value) => {
    onAnswerChange(profile.id, 'lastName', value)
  }

  const handleFirstNameSubmit = () => {
    // Navigation vers le champ nom de la même carte
    if (onNavigateNext) {
      onNavigateNext(profile.id, 'firstName')
    } else {
      lastNameRef.current?.focus()
    }
  }

  const handleLastNameSubmit = () => {
    // Navigation vers le prénom de la carte suivante ou fermeture
    if (onNavigateNext) {
      onNavigateNext(profile.id, 'lastName')
    } else {
      lastNameRef.current?.blur()
    }
  }

  return (
    <View style={styles.container}>
      {/* Image du profil */}
      <View style={styles.imageContainer}>
        <LazyImage
          source={typeof profile.imageUri === 'string' ? { uri: profile.imageUri } : profile.imageUri}
          style={styles.profileImage}
          profileId={`recall-${profile.id}`}
          isVisible={true}
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
}