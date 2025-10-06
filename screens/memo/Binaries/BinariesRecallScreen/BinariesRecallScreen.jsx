// screens/memo/Binaries/RecallScreen.jsx - Version avec scroll dans BorderedContainer
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
import useBinariesRecallInput from '../../../../hooks/Binaries/useBinariesRecallInput'
import { styles } from './BinariesRecallScreen.styles'

export default function BinaryRecallScreen({ route, navigation }) {
  const { objectif, binaries, temps, variant, mode, modeVariantId } = route.params

  const totalTime = 4 * 60
  const scrollRef = useRef(null)

  // Configuration 12 colonnes
  const cols = 12
  const lineHeight = 36

  // Hook personnalisé pour gérer l'input de rappel binaire avec support des tirets
  const {
    displayValue,
    handleInputChange,
    getAnswerArray,
    placeholder,
    mainInputStyle,
    inputScrollContentStyle,
  } = useBinariesRecallInput(objectif, cols, lineHeight)

  // Fonction pour naviguer vers la correction - Memoized
  const navigateToCorrection = useCallback(() => {
    navigation.navigate('BinaryCorrection', {
      inputs: getAnswerArray(),
      binaries,
      temps,
      mode,
      variant,
      modeVariantId
    })
  }, [navigation, getAnswerArray, binaries, temps, mode, variant, modeVariantId])

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
            <Text style={styles.instructionsTitle}>Saisissez votre séquence binaire</Text>
            <Text style={styles.instructionsText}>
              Entrez les {objectif} bits (0 et 1) dans la grille
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