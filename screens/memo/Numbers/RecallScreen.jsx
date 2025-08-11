// screens/memo/RecallScreen.jsx - Version avec scroll dans BorderedContainer
import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import MemorizationHeader from '../../../components/molecules/MemorizationHeader/MemorizationHeader'
import { SecondaryButton } from '../../../components/atoms/SecondaryButton/SecondaryButton'
import BorderedContainer from '../../../components/atoms/BorderedContainer/BorderedContainer'

export default function RecallScreen({ route, navigation }) {
  // Debug: voir ce qui est reçu
  console.log('RecallScreen route.params:', route.params)
  
  const { objectif, numbers, temps, variant, mode } = route.params

  const totalTime = 4 * 60
  const [userInput, setUserInput] = useState('')

  // Configuration 12 colonnes
  const cols = 12

  // Nettoie l'input utilisateur
  const handleInputChange = (text) => {
    const cleanText = text.replace(/[^0-9]/g, '').slice(0, objectif)
    setUserInput(cleanText)
  }

  // Transforme l'entrée utilisateur en tableau
  const getUserInputArray = () => {
    const digits = userInput.split('')
    return digits.concat(Array(objectif - digits.length).fill(''))
  }

  // Placeholder simple
  const createPlaceholder = () => {
    return '123456789012...'
  }

  // Fonction pour naviguer vers la correction (utilisée par les deux boutons)
  const navigateToCorrection = () => {
    navigation.navigate('Correction', {
      inputs: getUserInputArray(),
      numbers,
      temps,
      mode,
      variant,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <MemorizationHeader
            duration={totalTime}
            onBack={() => navigation.goBack()}
            onDone={navigateToCorrection}
          />

          {/* INSTRUCTIONS */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Saisissez votre séquence</Text>
            <Text style={styles.instructionsText}>
              Entrez les {objectif} chiffres dans la grille
            </Text>
          </View>

          {/* CHAMP DE SAISIE DANS BORDERCONTAINER SCROLLABLE */}
          <BorderedContainer>
            <ScrollView
              style={styles.inputScrollContainer}
              contentContainerStyle={styles.inputScrollContent}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
            >
              <TextInput
                style={styles.mainInput}
                value={userInput}
                onChangeText={handleInputChange}
                placeholder={createPlaceholder()}
                placeholderTextColor="#666"
                keyboardType="number-pad"
                autoFocus={true}
                blurOnSubmit={false}
                multiline={true}
                scrollEnabled={false} // on désactive le scroll du TextInput car on utilise le ScrollView parent
                editable={true}
                selectTextOnFocus={false}
              />
            </ScrollView>
          </BorderedContainer>

          {/* BOUTON VALIDER */}
          <SecondaryButton onPress={navigateToCorrection}>
            Valider
          </SecondaryButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputScrollContainer: {
    flex: 1,
  },
  inputScrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  mainInput: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'top',
    letterSpacing: 30,
    lineHeight: 36,
    minHeight: 200, // hauteur minimale pour que le contenu soit scrollable
  },
})