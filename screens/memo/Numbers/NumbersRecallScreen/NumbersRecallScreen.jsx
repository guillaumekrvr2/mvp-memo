// screens/memo/RecallScreen.jsx - Version avec scroll dans BorderedContainer  
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
//import useAutoScrollCursor from '../../../../hooks/useAutoScrollCursor'

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
    height: calculatedInputHeight, // Hauteur calculée au lieu de fixe
  }), [calculatedInputHeight])
  const inputScrollContentStyle = useMemo(() => styles.inputScrollContent, [])

  // Nettoie l'input utilisateur - Memoized pour éviter re-renders
  const handleInputChange = useCallback((text) => {
    // Remplace les tirets iOS "intelligents" par des tirets normaux
    let fixedText = text
      .replace(/—/g, '---')  // tiret cadratin → triple tiret
      .replace(/–/g, '--')   // tiret demi-cadratin → double tiret

    const cleanText = fixedText.replace(/[^0-9\-]/g, '').slice(0, objectif)
    setUserInput(cleanText)
    setCursorPosition(cleanText.length)
  }, [objectif])

  // Transforme l'entrée utilisateur en tableau
  const getUserInputArray = () => {
    const chars = userInput.split('')
    // Remplace les tirets par des chaînes vides (skip)
    const processedChars = chars.map(char => char === '-' ? '' : char)
    return processedChars.concat(Array(objectif - processedChars.length).fill(''))
  }

  // Fonction pour naviguer vers la correction - Memoized
  const navigateToCorrection = useCallback(() => {
    navigation.navigate('Correction', {
      inputs: getUserInputArray(),
      numbers,
      temps,
      mode,
      variant,
    })
  }, [navigation, userInput, numbers, temps, mode, variant, objectif])

  const Container = Platform.OS === 'ios' ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* HEADER */}
        <MemorizationHeader
          duration={totalTime}
          onBack={() => navigation.popToTop()}
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
          <BorderedContainer onLayout={useCallback(e => setScrollH(e.nativeEvent.layout.height), [])}>
            <ScrollView
              ref={scrollRef}
              style={styles.inputScrollContainer}
              contentContainerStyle={inputScrollContentStyle}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              onScroll={(e) => {
                const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent
              }}
              onLayout={(e) => {
                const { width, height } = e.nativeEvent.layout
              }}
              scrollEventThrottle={16}
            >
              <TextInput
                style={mainInputStyle}
                value={userInput}
                onChangeText={handleInputChange}
                placeholder={placeholder}
                placeholderTextColor="#666"
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                autoFocus={true}
                blurOnSubmit={false}
                multiline={true}
                scrollEnabled={false}
                editable={true}
                selectTextOnFocus={false}
                removeClippedSubviews={true}
                maxLength={objectif}
                autoCorrect={false}
                autoCapitalize="none"
                spellCheck={false}
                onLayout={(e) => {
                  const { width, height, x, y } = e.nativeEvent.layout
                }}
              />
            </ScrollView>
          </BorderedContainer>

          {/* BOUTON VALIDER */}
            <PrimaryButton onPress={navigateToCorrection}>
              Valider
            </PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </Container>
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
    paddingHorizontal: 24,
  },
  mainInput: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'top',
    letterSpacing: 35,
    lineHeight: 36,
    // Hauteur maintenant gérée dynamiquement dans mainInputStyle
  },
})