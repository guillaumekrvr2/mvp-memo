// screens/memo/Cards/CardsRecallScreen.jsx
import React from 'react'
import { SafeAreaView, View, Text, Platform } from 'react-native'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { CardsRecallOutput } from '../../../../components/organisms/Cards/CardsRecallOutput/CardsRecallOutput'
import { CardsRecallInput } from '../../../../components/organisms/Cards/CardsRecallInput/CardsRecallInput'
import { useCardsRecall } from '../../../../hooks/Cards/useCardsRecall'
import { theme } from '../../../../theme'

export default function CardsRecallScreen(props) {
  // Extraction ultra-sécurisée des props
  const route = props && props.route ? props.route : null
  const navigation = props && props.navigation ? props.navigation : null
  
  // Protection contre les props invalides
  if (!route || !navigation) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: Missing navigation props</Text>
      </SafeAreaView>
    )
  }
  
  // Extraction sécurisée des paramètres
  const params = route?.params || {}
  const objectif = params.objectif || 52
  const temps = params.temps || 120
  const mode = params.mode || ''
  const variant = params.variant || ''
  const discipline = params.discipline || ''
  const memorizedCards = params.memorizedCards || []
  
  // Temps fixe pour le recall : 4 minutes comme pour Numbers
  const recallTime = 4 * 60 // 240 secondes

  const {
    outputSlots,
    selectedSuitTab,
    setSelectedSuitTab,
    selectedSlotIndex,
    outputScrollRef,
    undoStack,
    redoStack,
    cardsBySuit,
    handleCardSelect,
    handleSlotSelect,
    handleUndo,
    handleRedo,
    handleRemoveCard,
    handleComplete
  } = useCardsRecall({
    objectif,
    navigation,
    memorizedCards,
    variant,
    mode,
    temps
  })

  // Fonction pour gérer le bouton Done
  const handleDone = () => {
    handleComplete(outputSlots)
  }



  const Container = Platform.OS === 'ios' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: theme.colors?.background || '#000' }}>
      <MemorizationHeader
        onBack={() => navigation.popToTop()}
        onDone={handleDone}
        duration={recallTime}
      />

      <View style={{ flex: 1 }}>
        <CardsRecallOutput
          ref={outputScrollRef}
          outputSlots={outputSlots}
          objectif={objectif}
          onCardRemove={handleRemoveCard}
          selectedSlotIndex={selectedSlotIndex}
          onSlotSelect={handleSlotSelect}
        />

        <CardsRecallInput
          cardsBySuit={cardsBySuit}
          selectedSuit={selectedSuitTab}
          onSuitSelect={setSelectedSuitTab}
          onCardSelect={handleCardSelect}
          undoCount={undoStack.length}
          redoCount={redoStack.length}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      </View>
    </Container>
  )
}
