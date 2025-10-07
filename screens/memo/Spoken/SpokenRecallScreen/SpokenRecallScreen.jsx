// screens/memo/Spoken/SpokenRecallScreen/SpokenRecallScreen.jsx
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
import useSpokenRecallInput from '../../../../hooks/Spoken/useSpokenRecallInput'
import { styles } from './SpokenRecallScreen.styles'

export default function SpokenRecallScreen({ route, navigation }) {
  const { objectif, digitSequence, temps, variant, mode, discipline = 'spokens' } = route.params

  const totalTime = 4 * 60 // 4 minutes pour le recall
  const scrollRef = useRef(null)

  // Configuration 6 colonnes (comme Numbers et Binaries)
  const cols = 6
  const lineHeight = 36

  // Hook personnalisé pour gérer l'input de rappel spoken avec support des tirets
  const {
    displayValue,
    handleInputChange,
    getAnswerArray,
    placeholder,
    mainInputStyle,
    inputScrollContentStyle,
  } = useSpokenRecallInput(objectif, cols, lineHeight)

  // Navigation vers la correction
  const navigateToCorrection = useCallback(() => {
    navigation.navigate('SpokenCorrection', {
      inputs: getAnswerArray(),
      digitSequence,
      temps,
      mode,
      variant,
      discipline,
      objectif
    })
  }, [navigation, getAnswerArray, digitSequence, temps, mode, variant, discipline, objectif])

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