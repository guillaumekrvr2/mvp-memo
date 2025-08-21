// screens/memo/RecallScreen.jsx - Version avec scroll dans BorderedContainer
import React, { useState, useRef } from 'react'
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

import MemorizationHeader from '../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { SecondaryButton } from '../../../components/atoms/Commons/SecondaryButton/SecondaryButton'
import BorderedContainer from '../../../components/atoms/Commons/BorderedContainer/BorderedContainer'
//import useAutoScrollCursor from '../../../hooks/useAutoScrollCursor'

export default function RecallScreen({ route, navigation }) {
  // Debug: voir ce qui est reçu
  
  const { objectif, numbers, temps, variant, mode } = route.params

  const totalTime = 4 * 60
  const [userInput, setUserInput] = useState('')
  const [scrollH, setScrollH] = useState(0) // Hauteur du BorderedContainer
  const [cursorPosition, setCursorPosition] = useState(0) // Position du curseur
  const scrollRef = useRef(null) // Référence pour le scroll

  // Configuration 12 colonnes
  const cols = 12
  const lineHeight = 36 // Hauteur de ligne du TextInput

  // Hook d'autoscroll basé sur la position du curseur
  //useAutoScrollCursor(scrollRef, scrollH, cursorPosition, cols, lineHeight)

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
        {/* HEADER */}
        <MemorizationHeader
          duration={totalTime}
          onBack={() => navigation.goBack()}
          onDone={navigateToCorrection}
        />

        {/* CONTENU PRINCIPAL avec espacement équitable */}
        <View style={styles.mainContent}>
          {/* INSTRUCTIONS */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Saisissez votre séquence</Text>
            <Text style={styles.instructionsText}>
              Entrez les {objectif} chiffres dans la grille
            </Text>
          </View>

          {/* CHAMP DE SAISIE DANS BORDERCONTAINER AVEC MESURE */}
          <BorderedContainer onLayout={e => setScrollH(e.nativeEvent.layout.height)}>
            <ScrollView
              ref={scrollRef}
              style={styles.inputScrollContainer}
              contentContainerStyle={styles.inputScrollContent}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.mainInput}
                value={userInput}
                onChangeText={handleInputChange}
                onSelectionChange={(event) => {
                  // Track la position du curseur pour l'autoscroll
                  setCursorPosition(event.nativeEvent.selection.start)
                }}
                placeholder={createPlaceholder()}
                placeholderTextColor="#666"
                keyboardType="number-pad"
                autoFocus={true}
                blurOnSubmit={false}
                multiline={true}
                scrollEnabled={false}
                editable={true}
                selectTextOnFocus={false}
              />
            </ScrollView>
          </BorderedContainer>

          {/* BOUTON VALIDER */}
          <SecondaryButton onPress={navigateToCorrection}>
            Valider
          </SecondaryButton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between', // Espacement équitable comme MemoScreen
    alignItems: 'center',
    paddingVertical: 20,
  },
  instructionsContainer: {
    alignItems: 'center',
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