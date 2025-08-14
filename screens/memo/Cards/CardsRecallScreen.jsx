// screens/memo/Cards/CardsRecallScreen.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { SafeAreaView, View, ScrollView, Vibration, Text, TouchableOpacity, Image } from 'react-native'
import MemorizationHeader from '../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader'
import { useCardDeck } from '../../../hooks/Cards/useCardDeck'
import { theme } from '../../../theme'

export default function CardsRecallScreen({ route, navigation }) {
  console.log('🎯 CardsRecallScreen rendering...')
  console.log('📦 Route params:', route?.params)
  
  const { 
    objectif = 52, 
    temps = 120,
    mode,
    variant,
    discipline,
    memorizedCards = [] // Cards that were memorized in previous screen
  } = route?.params || {}

  console.log('🔧 Processed params:', { objectif, temps, mode, variant, discipline })

  const startTime = useRef(Date.now())
  const [preselectedCards, setPreselectedCards] = useState(new Set())
  const [usedCardIds, setUsedCardIds] = useState(new Set())
  const [outputSlots, setOutputSlots] = useState([])
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [selectedSuitTab, setSelectedSuitTab] = useState('spades')
  const outputScrollRef = useRef(null)
  
  const { deck } = useCardDeck(objectif)
  
  // Initialize output slots
  useEffect(() => {
    const slots = Array.from({ length: objectif }, (_, i) => ({
      id: i,
      position: i + 1,
      card: null
    }))
    setOutputSlots(slots)
  }, [objectif])

  // Card order for each suit (A to K) - Note: les 2 sont déjà dans le deck
  const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'queen', 'king']
  
  // Organize cards by suit in order A to K
  const cardsBySuit = {
    spades: cardOrder.map(rank => deck.find(card => card.suit === 'spades' && card.rank === rank)).filter(Boolean),
    hearts: cardOrder.map(rank => deck.find(card => card.suit === 'hearts' && card.rank === rank)).filter(Boolean),
    diamonds: cardOrder.map(rank => deck.find(card => card.suit === 'diamonds' && card.rank === rank)).filter(Boolean),
    clubs: cardOrder.map(rank => deck.find(card => card.suit === 'clubs' && card.rank === rank)).filter(Boolean)
  }

  const suits = ['spades', 'hearts', 'diamonds', 'clubs']
  const suitColors = {
    spades: '#000',
    clubs: '#000', 
    hearts: '#d32f2f',
    diamonds: '#d32f2f'
  }
  
  const suitSymbols = {
    spades: '♠',
    hearts: '♥', 
    diamonds: '♦',
    clubs: '♣'
  }

  const handleCardSelect = useCallback((card) => {
    if (usedCardIds.has(card.id)) {
      // Vibration d'erreur pour carte déjà utilisée
      Vibration.vibrate([0, 30, 50, 30])
      return
    }
    
    // Directement ajouter la carte à l'output (pas de sélection intermédiaire)
    const availableSlots = outputSlots.filter(slot => slot.card === null)
    if (availableSlots.length === 0) {
      Vibration.vibrate([0, 50, 100, 50])
      return
    }

    // Save current state for undo
    const currentState = {
      outputSlots: [...outputSlots],
      usedCardIds: new Set(usedCardIds)
    }
    setUndoStack(prev => [...prev, currentState])
    setRedoStack([])

    // Add card to first available slot
    const newOutputSlots = [...outputSlots]
    newOutputSlots[availableSlots[0].id] = {
      ...availableSlots[0],
      card: card
    }
    setOutputSlots(newOutputSlots)

    // Mark card as used
    setUsedCardIds(prev => new Set([...prev, card.id]))
    
    // Success vibration
    Vibration.vibrate([0, 30, 20, 50])

    // Auto-scroll to focus on the last filled card
    setTimeout(() => {
      const lastFilledIndex = newOutputSlots.map((slot, index) => slot.card ? index : -1)
        .filter(index => index >= 0)
        .pop()
      
      if (lastFilledIndex >= 0 && outputScrollRef.current) {
        // Scroll to show the last filled card with some context
        const cardSpacing = 30 // Espacement ajusté pour containers réduits
        outputScrollRef.current.scrollTo({
          x: Math.max(0, (lastFilledIndex - 1) * cardSpacing),
          animated: true
        })
      }
    }, 200)

    // Check completion
    const filledSlots = newOutputSlots.filter(slot => slot.card !== null).length
    if (filledSlots >= objectif) {
      handleComplete(newOutputSlots)
    }
  }, [usedCardIds, outputSlots, objectif])


  const handleComplete = useCallback((finalSlots) => {
    const endTime = Date.now()
    const durationMs = endTime - startTime.current
    const placedCards = finalSlots.map(slot => slot.card).filter(Boolean)
    
    // Calculate errors (simplified)
    const errorsCount = 0 // Would compare with memorizedCards
    
    const result = {
      placed: placedCards,
      durationMs,
      errorsCount
    }

    // Navigate to correction or back with result
    navigation.goBack()
    // TODO: navigation.navigate('Correction', result)
  }, [navigation])

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) {
      Vibration.vibrate([0, 30, 30, 30])
      return
    }

    const lastState = undoStack[undoStack.length - 1]
    const currentState = {
      outputSlots: [...outputSlots],
      usedCardIds: new Set(usedCardIds)
    }

    setRedoStack(prev => [...prev, currentState])
    setUndoStack(prev => prev.slice(0, -1))
    
    setOutputSlots(lastState.outputSlots)
    setUsedCardIds(lastState.usedCardIds)
    
    Vibration.vibrate([0, 40, 20, 40])
  }, [undoStack, outputSlots, usedCardIds])

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) {
      Vibration.vibrate([0, 30, 30, 30])
      return
    }

    const nextState = redoStack[redoStack.length - 1]
    const currentState = {
      outputSlots: [...outputSlots],
      usedCardIds: new Set(usedCardIds)
    }

    setUndoStack(prev => [...prev, currentState])
    setRedoStack(prev => prev.slice(0, -1))
    
    setOutputSlots(nextState.outputSlots)
    setUsedCardIds(nextState.usedCardIds)
    
    Vibration.vibrate([0, 20, 40, 20])
  }, [redoStack, outputSlots, usedCardIds])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={() => navigation.goBack()}
        duration={temps}
      />

      <View style={{ flex: 1 }}>
        {/* 📱 TOP 50% - OUTPUT CAROUSEL */}
        <View style={{ 
          flex: 0.5, 
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderBottomWidth: 2,
          borderBottomColor: 'rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        }}>
          <Text style={{ 
            color: '#fff', 
            fontSize: 14, 
            fontWeight: 'bold',
            marginBottom: 8,
            textAlign: 'center'
          }}>
            Séquence restituée ({outputSlots.filter(slot => slot.card).length}/{objectif})
          </Text>
          
          <ScrollView 
            ref={outputScrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingHorizontal: 5,
              height: 310, // Hauteur ajustée pour cartes à taille maximale (276px + marges)
              width: Math.max(1000, outputSlots.length * 30 + 200) // Largeur ajustée pour containers réduits
            }}
          >
            <View style={{ 
              flex: 1, 
              position: 'relative',
              justifyContent: 'flex-start' // Alignement à gauche au lieu de centré
            }}>
              {outputSlots.map((slot, index) => {
                if (!slot.card) {
                  // Placeholder pour slots vides
                  return (
                    <View 
                      key={slot.id}
                      style={{
                        position: 'absolute',
                        transform: [{ translateX: index * 30 }], // Espacement réduit cohérent
                        top: 10, // Position absolue en pixels pour slots vides
                        width: 207, // Slots +15% cohérents avec containers
                        height: 276, // Hauteur +15% cohérente avec containers
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.2)', // Bordure discrète slots vides
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fond discret pour slots vides
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: -index // Z-index négatif pour slots vides (dessous)
                      }}
                    >
                      <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 10, fontWeight: 'bold' }}>
                        {slot.position}
                      </Text>
                    </View>
                  )
                }
                
                // Cartes avec alignement flex-start pour voir la tranche gauche
                return (
                  <View
                    key={slot.id}
                    style={{
                      position: 'absolute',
                      transform: [{ translateX: index * 30 }], // Espacement réduit pour containers plus petits
                      top: 10, // Position absolue en pixels pour cartes
                      width: 207, // Container +15% (180 * 1.15)
                      height: 276, // Hauteur +15% (240 * 1.15)
                      backgroundColor: 'transparent', // Pas de fond pour voir que les cartes
                      borderRadius: 6,
                      borderWidth: 0, // Pas de bordure du tout
                      borderColor: 'transparent', // Bordure transparente
                      // elevation: index + 1, // Shadow supprimée
                      zIndex: index + 1,
                      alignItems: 'flex-start', // IMPORTANT: alignement à gauche
                      justifyContent: 'flex-start', // IMPORTANT: voir le HAUT de la carte
                      overflow: 'visible', // Important: laisser déborder l'image
                      // opacity: 1 // Containers opaques
                    }}
                  >
                    <Image 
                      source={slot.card.asset} 
                      style={{ 
                        width: 207, // Carte = taille du container
                        height: 276, // Hauteur = taille du container
                        borderRadius: 5,
                        // backgroundColor: 'transparent' // Pas de fond sur l'image
                      }} 
                      resizeMode="contain" // Contient toute la carte sans rognage 
                    />
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>

        {/* 📱 BOTTOM 50% - INPUT WITH TABS */}
        <View style={{ flex: 0.5, paddingHorizontal: 16 }}>
          {/* Suit Tabs - Ultra Compacts et larges */}
          <View style={{ 
            flexDirection: 'row',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 6,
            padding: 2,
            marginTop: 4,
            marginBottom: 8
          }}>
            {suits.map(suit => (
              <TouchableOpacity
                key={suit}
                style={{
                  flex: 1,
                  paddingVertical: 4,
                  paddingHorizontal: 2,
                  borderRadius: 4,
                  backgroundColor: selectedSuitTab === suit 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  alignItems: 'center'
                }}
                onPress={() => {
                  setSelectedSuitTab(suit)
                  Vibration.vibrate(15)
                }}
              >
                <Text style={{ 
                  fontSize: 18,
                  color: suitColors[suit] === '#000' ? '#fff' : suitColors[suit]
                }}>
                  {suitSymbols[suit]}
                </Text>
                <Text style={{ 
                  fontSize: 8,
                  color: selectedSuitTab === suit ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: selectedSuitTab === suit ? 'bold' : 'normal'
                }}>
                  {suit.charAt(0).toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Cards Carousel for Selected Suit */}
          <View style={{ flex: 1 }}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{ 
                paddingHorizontal: 8,
                alignItems: 'center'
              }}
            >
              {cardsBySuit[selectedSuitTab].map(card => {
                const isUsed = usedCardIds.has(card.id)
                
                return (
                  <TouchableOpacity
                    key={card.id}
                    style={{
                      width: 70,
                      height: 100,
                      marginHorizontal: 4,
                      borderRadius: 8,
                      borderWidth: isUsed ? 1 : 3,
                      borderColor: isUsed 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : '#4caf50',
                      backgroundColor: 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isUsed ? 0.3 : 1,
                      overflow: 'hidden'
                    }}
                    onPress={() => handleCardSelect(card)}
                    disabled={isUsed}
                    activeOpacity={0.7}
                  >
                    <Image 
                      source={card.asset} 
                      style={{ 
                        width: 60, 
                        height: 90, 
                        borderRadius: 6
                      }} 
                      resizeMode="contain" 
                    />
                    {isUsed && (
                      <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                          USED
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>

          {/* Undo/Redo Controls - Plus Compacts */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'center',
            gap: 15,
            marginTop: 10,
            marginBottom: 6
          }}>
            <TouchableOpacity 
              style={{ 
                backgroundColor: undoStack.length > 0 ? '#9c27b0' : 'rgba(255, 255, 255, 0.1)', 
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
                opacity: undoStack.length > 0 ? 1 : 0.5,
                alignItems: 'center'
              }}
              onPress={handleUndo}
              disabled={undoStack.length === 0}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                ↶ Undo ({undoStack.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ 
                backgroundColor: redoStack.length > 0 ? '#9c27b0' : 'rgba(255, 255, 255, 0.1)', 
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
                opacity: redoStack.length > 0 ? 1 : 0.5,
                alignItems: 'center'
              }}
              onPress={handleRedo}
              disabled={redoStack.length === 0}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                ↷ Redo ({redoStack.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}