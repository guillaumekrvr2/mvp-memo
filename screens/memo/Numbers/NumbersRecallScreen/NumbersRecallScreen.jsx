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

export default function RecallScreen({ route, navigation }) {
  const { objectif, numbers, temps, variant, mode } = route.params

  const totalTime = 4 * 60
  const [userInput, setUserInput] = useState('')
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Configuration 6 colonnes (plus grande grille)
  const cols = 6
  const lineHeight = 72

  // Placeholder pour 6 colonnes
  const createPlaceholder = () => {
    return '123456...' // 6 chiffres par ligne
  }

  // Calcul de la hauteur optimale du TextInput basé sur l'objectif
  const calculatedInputHeight = useMemo(() => {
    const estimatedLines = Math.ceil(objectif / cols)
    const minHeight = 300 // Hauteur minimale augmentée
    const calculatedHeight = estimatedLines * lineHeight + 100 // +100px de marge
    return Math.max(minHeight, calculatedHeight)
  }, [objectif, cols])

  // Memoized values pour éviter re-renders
  const placeholder = useMemo(() => createPlaceholder(), [])
  const mainInputStyle = useMemo(() => ({
    ...styles.mainInput,
    height: calculatedInputHeight, // Hauteur calculée au lieu de fixe
    // Fix iOS: sans letterSpacing pour éviter bug curseur, utilise fontVariant
    ...(Platform.OS === 'ios' && {
      textAlign: 'center',
      width: '100%',
      alignSelf: 'center',
      fontVariant: ['tabular-nums'], // Chiffres à largeur fixe
      paddingHorizontal: 12, // Padding horizontal réduit pour iOS
    })
  }), [calculatedInputHeight])
  const inputScrollContentStyle = useMemo(() => ({
    ...styles.inputScrollContent,
    // Centrage spécifique iOS
    ...(Platform.OS === 'ios' && {
      alignItems: 'center',
      justifyContent: 'flex-start',
    })
  }), [])

  // Fonction pour ajouter espacement visuel avec Unicode ET retours à la ligne forcés tous les 6 caractères
  const addVisualSpacing = useCallback((text) => {
    if (Platform.OS !== 'ios') return text;

    // Crée des lignes de 6 caractères avec espaces Unicode
    const lines = [];
    for (let i = 0; i < text.length; i += cols) {
      const line = text.slice(i, i + cols);
      // Ajoute espaces Unicode entre chaque caractère de la ligne
      const spacedLine = line.split('').join('\u2009');
      lines.push(spacedLine);
    }

    // Joint les lignes avec des retours à la ligne
    return lines.join('\n');
  }, [cols]);

  // Nettoie l'input utilisateur - Memoized pour éviter re-renders
  const handleInputChange = useCallback((text) => {
    // Retire les espaces Unicode ajoutés pour l'affichage ET les retours à la ligne
    let cleanText = text.replace(/\u2009/g, '').replace(/\n/g, '');

    // Remplace les tirets iOS "intelligents" par des tirets simples
    cleanText = cleanText
      .replace(/—/g, '-')  // tiret cadratin → tiret simple
      .replace(/–/g, '-')   // tiret demi-cadratin → tiret simple

    // Garde uniquement les chiffres et tirets simples
    cleanText = cleanText.replace(/[^0-9\-]/g, '').slice(0, objectif)

    setUserInput(cleanText)
  }, [objectif, userInput])

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

          {/* CHAMP DE SAISIE DANS BORDERCONTAINER */}
          <BorderedContainer>
            <ScrollView
              ref={scrollRef}
              style={styles.inputScrollContainer}
              contentContainerStyle={inputScrollContentStyle}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                ref={inputRef}
                style={mainInputStyle}
                value={addVisualSpacing(userInput)}
                onChangeText={handleInputChange}
                onSelectionChange={(event) => {
                  // Position du curseur pour debug si nécessaire
                }}
                placeholder={placeholder}
                placeholderTextColor="#666"
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                autoFocus={true}
                blurOnSubmit={false}
                multiline={true}
                scrollEnabled={false}
                editable={true}
                selectTextOnFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                spellCheck={false}
                enablesReturnKeyAutomatically={false}
                clearButtonMode="never"
                textContentType="none"
                smartDashesType="no"
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
    paddingHorizontal: Platform.OS === 'ios' ? 8 : 40, // Padding réduit pour iOS uniquement
  },
  mainInput: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 24 : 32, // Taille optimisée pour iOS uniquement
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', // Police monospace plus espacée
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'top',
    letterSpacing: Platform.OS === 'ios' ? 8 : 35, // Letter spacing réduit pour iOS uniquement
    lineHeight: Platform.OS === 'ios' ? 36 : 72, // Hauteur réduite pour iOS uniquement
    // Optimisations iOS pour le centrage
    ...(Platform.OS === 'ios' && {
      includeFontPadding: false, // Supprime le padding de police iOS
    }),
    // Hauteur maintenant gérée dynamiquement dans mainInputStyle
  },
})