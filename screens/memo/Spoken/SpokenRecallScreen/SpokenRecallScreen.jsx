// screens/memo/Spoken/SpokenRecallScreen/SpokenRecallScreen.jsx
import React, { useState, useRef, useCallback, useMemo } from 'react'
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

import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton'
import BorderedContainer from '../../../../components/atoms/Commons/BorderedContainer/BorderedContainer'

export default function SpokenRecallScreen({ route, navigation }) {
  const { objectif, digitSequence, temps, variant, mode, discipline = 'spokens' } = route.params

  const totalTime = 4 * 60 // 4 minutes pour le recall
  const [userInput, setUserInput] = useState('')
  const [scrollH, setScrollH] = useState(0)
  const [cursorPosition, setCursorPosition] = useState(0)
  const scrollRef = useRef(null)

  // Placeholder simple
  const createPlaceholder = () => {
    return '123456789012...'
  }

  // Calcul de la hauteur optimale du TextInput basé sur l'objectif
  const calculatedInputHeight = useMemo(() => {
    const cols = 12 // Colonnes approximatives avec letterSpacing: 30
    const lineHeight = 36
    const estimatedLines = Math.ceil(objectif / cols)
    const minHeight = 200 // Hauteur minimale
    return Math.max(minHeight, estimatedLines * lineHeight + 50) // +50px de marge
  }, [objectif])

  // Memoized values pour éviter re-renders
  const placeholder = useMemo(() => createPlaceholder(), [])
  const mainInputStyle = useMemo(() => ({
    ...styles.mainInput,
    height: calculatedInputHeight,
  }), [calculatedInputHeight])
  const inputScrollContentStyle = useMemo(() => styles.inputScrollContent, [])

  // Nettoie l'input utilisateur
  const handleInputChange = useCallback((text) => {
    const cleanText = text.replace(/[^0-9]/g, '').slice(0, objectif)
    setUserInput(cleanText)
    setCursorPosition(cleanText.length)
  }, [objectif])

  // Transforme l'entrée utilisateur en tableau
  const getUserInputArray = () => {
    const digits = userInput.split('')
    return digits.concat(Array(objectif - digits.length).fill(''))
  }

  // Navigation vers la correction
  const navigateToCorrection = useCallback(() => {
    navigation.navigate('SpokenCorrection', {
      inputs: getUserInputArray(),
      digitSequence,
      temps,
      mode,
      variant,
      discipline,
      objectif
    })
  }, [navigation, userInput, digitSequence, temps, mode, variant, discipline, objectif])

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

        {/* CONTENU PRINCIPAL */}
        <View style={styles.mainContent}>
          {/* INSTRUCTIONS */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Saisissez votre séquence 🎤</Text>
            <Text style={styles.instructionsText}>
              Entrez les {objectif} chiffres que vous avez mémorisés
            </Text>
          </View>

          {/* CHAMP DE SAISIE DANS BORDERCONTAINER */}
          <BorderedContainer onLayout={useCallback(e => setScrollH(e.nativeEvent.layout.height), [])}>
            <ScrollView
              ref={scrollRef}
              style={styles.inputScrollContainer}
              contentContainerStyle={inputScrollContentStyle}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              scrollEventThrottle={16}
            >
              <TextInput
                style={mainInputStyle}
                value={userInput}
                onChangeText={handleInputChange}
                placeholder={placeholder}
                placeholderTextColor="#666"
                keyboardType="number-pad"
                autoFocus={true}
                blurOnSubmit={false}
                multiline={true}
                scrollEnabled={false}
                editable={true}
                selectTextOnFocus={false}
                removeClippedSubviews={true}
                maxLength={objectif}
              />
            </ScrollView>
          </BorderedContainer>

          {/* BOUTON VALIDER */}
          <PrimaryButton onPress={navigateToCorrection}>
            Valider
          </PrimaryButton>
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
    justifyContent: 'space-between',
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
  },
})