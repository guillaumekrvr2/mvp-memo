// screens/memo/Names/NamesCorrectionScreen/NamesCorrectionScreen.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, FlatList, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton'
import NamesCorrectionCard from '../../../../components/molecules/Names/NamesCorrectionCard/NamesCorrectionCard'
import NewRecordModal from '../../../../components/molecules/Commons/NewRecordModal/NewRecordModal'

import { useNamesRecallVisibility } from '../../../../hooks/Names/useNamesRecallVisibility'
import useSaveBestScore from '../../../../hooks/useSaveBestScore'

import { styles } from './styles'

export default function NamesCorrectionScreen({ route, navigation }) {
  // Paramètres de navigation
  const { 
    memorizedProfiles = [],
    userAnswers = {},
    objectif,
    temps,
    mode,
    variant,
    discipline
  } = route.params || {}

  // État pour la révélation des réponses
  const [revealedAnswers, setRevealedAnswers] = useState({})
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [recordData, setRecordData] = useState(null)
  
  // Ref pour FlatList (identique à NamesRecallScreen)
  const flatListRef = React.useRef(null)

  // Hooks - Copie exacte de NamesRecallScreen (sans options)
  const { visibleItems, onViewableItemsChanged, viewabilityConfig, isItemVisible } = useNamesRecallVisibility(memorizedProfiles)
  
  // Debug logs pour l'initialisation
  useEffect(() => {
    console.log('🚀 [NamesCorrectionScreen] Component initialized')
    console.log('🚀 [NamesCorrectionScreen] Total profiles received:', memorizedProfiles.length)
    console.log('🚀 [NamesCorrectionScreen] Variant received:', variant, typeof variant)
    console.log('🚀 [NamesCorrectionScreen] First 3 profiles:', memorizedProfiles.slice(0, 3).map(p => ({ id: p.id, firstName: p.firstName })))
  }, [])

  // Debug logs pour la visibilité (débounced pour éviter les boucles)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('🔍 [NamesCorrectionScreen] Visible items:', Array.from(visibleItems))
      console.log('🔍 [NamesCorrectionScreen] Total visible items:', visibleItems.size)
      console.log('🔍 [NamesCorrectionScreen] Total profiles:', memorizedProfiles.length)
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [visibleItems.size, memorizedProfiles.length])
  const { saveBestScore, loading: savingScore } = useSaveBestScore()
  const insets = useSafeAreaInsets()

  // Calcul du score
  const totalProfiles = memorizedProfiles.length
  const correctAnswers = memorizedProfiles.reduce((acc, profile) => {
    const userAnswer = userAnswers[profile.id] || {}
    const isFirstNameCorrect = userAnswer.firstName?.toLowerCase().trim() === profile.firstName?.toLowerCase().trim()
    const isLastNameCorrect = userAnswer.lastName?.toLowerCase().trim() === profile.lastName?.toLowerCase().trim()
    return acc + (isFirstNameCorrect && isLastNameCorrect ? 1 : 0)
  }, 0)

  const accuracy = Math.round((correctAnswers / totalProfiles) * 100)

  // Gestion de la révélation
  const handleReveal = useCallback((profileId) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [profileId]: true
    }))
  }, [])

  // Sauvegarde du meilleur score
  useEffect(() => {
    const saveScore = async () => {
      // variant est déjà l'ID (number) envoyé depuis NamesScreen
      if (!variant || savingScore) return
      
      try {
        const result = await saveBestScore(variant, correctAnswers)
        
        if (result.updated) {
          setRecordData({
            score: correctAnswers,
            previousScore: result.record.previousBestScore,
            discipline: 'Names'
          })
          setShowRecordModal(true)
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du score:', error)
      }
    }

    saveScore()
  }, [variant, correctAnswers, saveBestScore, savingScore])

  // Configuration de la FlatList
  const renderItem = useCallback(({ item, index }) => {
    const userAnswer = {
      ...userAnswers[item.id],
      isRevealed: revealedAnswers[item.id]
    }

    const itemIsVisible = isItemVisible(item.id)

    return (
      <NamesCorrectionCard
        profile={item}
        userAnswer={userAnswer}
        isVisible={itemIsVisible}
        onReveal={handleReveal}
      />
    )
  }, [userAnswers, revealedAnswers, isItemVisible, handleReveal])

  const getItemLayout = useCallback((data, index) => ({
    length: 200,
    offset: 200 * Math.floor(index / 2),
    index,
  }), [])

  const handleRetry = () => {
    navigation.navigate('Names')
  }

  const closeRecordModal = () => {
    setShowRecordModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        title="Correction"
        showTimer={false}
      />

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        {/* Résultats */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Résultats</Text>
          <Text style={styles.scoreText}>
            Score: {correctAnswers} / {totalProfiles}
          </Text>
          <Text style={styles.accuracyText}>
            Précision: {accuracy}%
          </Text>
        </View>

        {/* Grille de correction - COPIE EXACTE de NamesRecallScreen */}
        <View style={styles.gridContainer}>
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
            
            // Optimisations de performance pour lazy loading (copie exacte)
            initialNumToRender={6}
            windowSize={2}
            maxToRenderPerBatch={2}
            updateCellsBatchingPeriod={100}
            removeClippedSubviews={false}
            
            // Configuration du lazy loading (copie exacte)
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
      </View>

      {/* Bouton Retry */}
      <View style={[styles.buttonContainer, { bottom: insets.bottom + 10 }]}>
        <PrimaryButton onPress={handleRetry}>
          Retry
        </PrimaryButton>
      </View>

      {/* Modal de nouveau record */}
      <NewRecordModal
        visible={showRecordModal}
        onClose={closeRecordModal}
        score={recordData?.score || 0}
        previousScore={recordData?.previousScore}
        discipline={recordData?.discipline || 'Names'}
      />
    </SafeAreaView>
  )
}