// screens/memo/Names/NamesRecallScreen/NamesRecallScreen.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton'
import NamesRecallCard from '../../../../components/molecules/Names/NamesRecallCard/NamesRecallCard'

import { useNamesRecallVisibility } from '../../../../hooks/Names/useNamesRecallVisibility'
import { useNamesRecallNavigation } from '../../../../hooks/Names/useNamesRecallNavigation'
import { useNamesRecallAnswers } from '../../../../hooks/Names/useNamesRecallAnswers'

import { styles } from './styles'

export default function NamesRecallScreen({ route, navigation }) {
  // Paramètres de navigation
  const { 
    memorizedProfiles = [],
    objectif,
    temps,
    mode,
    variant,
    discipline
  } = route.params || {}

  // Hooks métier
  const { visibleItems, onViewableItemsChanged, viewabilityConfig, isItemVisible } = useNamesRecallVisibility(memorizedProfiles)
  const { inputRefs, flatListRef, navigateToNextInput } = useNamesRecallNavigation(memorizedProfiles)
  const { userAnswers, handleAnswerChange } = useNamesRecallAnswers()

  // État UI
  const [keyboardKey, setKeyboardKey] = useState(0)
  const insets = useSafeAreaInsets()

  // Constants
  const recallDuration = 240

  // Gestion du clavier
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardKey(prev => prev + 1)
    })
    return () => keyboardDidHideListener?.remove()
  }, [])

  // Validation des réponses
  const handleValidate = useCallback(() => {
    // Préparer les données pour la correction
    const correctionData = {
      memorizedProfiles,
      userAnswers,
      objectif,
      temps,
      mode,
      variant,
      discipline
    }

    // Navigation vers NamesCorrectionScreen
    navigation.replace('NamesCorrection', correctionData)
  }, [navigation, memorizedProfiles, userAnswers, objectif, temps, mode, variant, discipline])

  // Configuration de la FlatList
  const renderItem = useCallback(({ item }) => (
    <NamesRecallCard
      profile={item}
      userAnswer={userAnswers[item.id] || {}}
      onAnswerChange={handleAnswerChange}
      inputRefs={inputRefs}
      onNavigateNext={navigateToNextInput}
      isVisible={isItemVisible(item.id)}
    />
  ), [userAnswers, handleAnswerChange, inputRefs, navigateToNextInput, isItemVisible])

  const getItemLayout = useCallback((data, index) => ({
    length: 200,
    offset: 200 * Math.floor(index / 2),
    index,
  }), [])

  const onScrollToIndexFailed = useCallback((info) => {
    console.warn('ScrollToIndex failed:', info)
    flatListRef.current?.scrollToOffset({ 
      offset: info.index * 100,
      animated: true 
    })
  }, [])

  // Container conditionnel comme NumbersMemoScreen
  const Container = Platform.OS === 'ios' ? View : SafeAreaView;

  return (
    <Container style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.popToTop()}
        onDone={handleValidate}
        duration={recallDuration}
        title="Rappel"
      />

      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <KeyboardAvoidingView 
          key={`keyboard-${keyboardKey}`}
          style={styles.keyboardAvoidingView} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={Platform.select({ ios: 80, android: 100 })}
        >
          <View style={styles.content}>
            <FlatList
              ref={flatListRef}
              data={memorizedProfiles}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.grid}
              showsVerticalScrollIndicator={false}
              style={styles.flatList}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              columnWrapperStyle={styles.row}
              keyboardShouldPersistTaps="handled"
              
              // Optimisations de performance pour lazy loading
              initialNumToRender={6}
              windowSize={2}
              maxToRenderPerBatch={2}
              updateCellsBatchingPeriod={100}
              removeClippedSubviews={false}
              
              // Configuration du lazy loading
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              onScrollToIndexFailed={onScrollToIndexFailed}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <View style={[styles.buttonContainer, { bottom: 0, paddingBottom: insets.bottom + 10 }]}>
        <PrimaryButton onPress={handleValidate}>
          Valider
        </PrimaryButton>
      </View>
    </Container>
  )
}