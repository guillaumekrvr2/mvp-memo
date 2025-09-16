// screens/memo/Names/NamesCorrectionScreen/NamesCorrectionScreen.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, FlatList, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Header from '../../../../components/Header.jsx'
import { PrimaryButton } from '../../../../components/atoms/Commons/PrimaryButton/PrimaryButton'
import NamesCorrectionCard from '../../../../components/molecules/Names/NamesCorrectionCard/NamesCorrectionCard'
import NewRecordModal from '../../../../components/molecules/Commons/NewRecordModal/NewRecordModal'

import { useNamesRecallVisibility } from '../../../../hooks/Names/useNamesRecallVisibility'
import useSaveScoreWithAuth from '../../../../hooks/useSaveScoreWithAuth'

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

  // Debug logs pour la visibilité (débounced pour éviter les boucles)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [visibleItems.size, memorizedProfiles.length])
  const { saveScoreWithAuth, loading: savingScore } = useSaveScoreWithAuth()
  const insets = useSafeAreaInsets()

  // Calcul du score - 1 point par prénom correct + 1 point par nom correct
  const totalProfiles = memorizedProfiles.length
  const correctAnswers = memorizedProfiles.reduce((acc, profile) => {
    const userAnswer = userAnswers[profile.id] || {}
    const isFirstNameCorrect = userAnswer.firstName?.toLowerCase().trim() === profile.firstName?.toLowerCase().trim()
    const isLastNameCorrect = userAnswer.lastName?.toLowerCase().trim() === profile.lastName?.toLowerCase().trim()
    return acc + (isFirstNameCorrect ? 1 : 0) + (isLastNameCorrect ? 1 : 0)
  }, 0)

  const totalPossiblePoints = totalProfiles * 2 // 2 points par profil (prénom + nom)
  const accuracy = Math.round((correctAnswers / totalPossiblePoints) * 100)

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

      await saveScoreWithAuth(variant, correctAnswers, navigation, (result) => {
        if (result.updated) {
          setRecordData({
            score: correctAnswers,
            previousScore: result.record.previousBestScore,
            discipline: 'Names'
          })
          setShowRecordModal(true)
        }
      })
    }

    saveScore()
  }, [variant, correctAnswers, saveScoreWithAuth, savingScore, navigation])

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
      <Header navigation={navigation} />

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        {/* Résultats */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Résultats</Text>
          <Text style={styles.scoreText}>
            Score: {correctAnswers} / {totalPossiblePoints}
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