// screens/memo/RecallScreen.jsx - Version avec scroll dans BorderedContainer
import React, { useRef, useCallback } from 'react'
import {
  SafeAreaView,
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
import useNumbersRecallInput from '../../../../hooks/Numbers/useNumbersRecallInput'
import { styles } from './styles'

export default function RecallScreen({ route, navigation }) {
  const { objectif, numbers, temps, variant, mode } = route.params

  const totalTime = 4 * 60
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Configuration 6 colonnes (plus grande grille)
  const cols = 6
  const lineHeight = 72

  // Hook personnalisé pour gérer l'input de rappel
  const {
    displayValue,
    handleInputChange,
    getAnswerArray,
    placeholder,
    mainInputStyle,
    inputScrollContentStyle,
  } = useNumbersRecallInput(objectif, cols, lineHeight)

  // Fonction pour naviguer vers la correction - Memoized
  const navigateToCorrection = useCallback(() => {
    navigation.navigate('Correction', {
      inputs: getAnswerArray(),
      numbers,
      temps,
      mode,
      variant,
    })
  }, [navigation, getAnswerArray, numbers, temps, mode, variant])

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
              contentContainerStyle={[styles.inputScrollContent, inputScrollContentStyle]}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                ref={inputRef}
                style={[styles.mainInput, mainInputStyle]}
                value={displayValue}
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