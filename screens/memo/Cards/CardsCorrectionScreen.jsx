// screens/memo/Cards/CardsCorrectionScreen.jsx
import React, { useEffect } from 'react'
import { Alert, TouchableOpacity, Text } from 'react-native'
import { SecondaryButton } from '../../../components/atoms/Commons/SecondaryButton/SecondaryButton'
import { CardsRecallOutput } from '../../../components/organisms/Cards/CardsRecallOutput/CardsRecallOutput'
import useSaveBestScore from '../../../hooks/useSaveBestScore'
import { theme } from '../../../theme'
import { 
  Container,
  ContentScrollView,
  ResultsCard,
  ResultsTitle,
  ScoreContainer,
  ScoreText,
  AccuracyBadge,
  AccuracyText,
  CarouselSection,
  ButtonSection,
  ErrorContainer,
  ErrorText
} from './styles'

export default function CardsCorrectionScreen({ route, navigation }) {

  const { 
    userCards = [], 
    correctCards = [], 
    objectif = 52,
    temps,
    mode,
    variant 
  } = route.params || {}

  // Protection contre les paramètres manquants
  if (!route.params) {
    console.error('CardsCorrectionScreen: Aucun paramètre reçu!')
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>
            Erreur: Paramètres manquants
          </ErrorText>
        </ErrorContainer>
      </Container>
    )
  }

  // Calcul du score
  const totalAnswered = userCards.length
  const score = userCards.reduce((acc, userCard, index) => {
    const correctCard = correctCards[index]
    // Comparer suit + rank au lieu des IDs uniques
    const isMatch = userCard && correctCard && 
                   userCard.suit === correctCard.suit && 
                   userCard.rank === correctCard.rank
    
    return acc + (isMatch ? 1 : 0)
  }, 0)

  // Calcul de la précision
  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0

  // Hook pour la sauvegarde du meilleur score
  const { saveBestScore, loading, error } = useSaveBestScore()

  // Préparation des slots pour OutputCarousel
  const outputSlots = Array.from({ length: objectif }, (_, index) => ({
    id: index,
    position: index + 1,
    card: userCards[index] || null
  }))


  // Sauvegarde automatique du score à l'affichage
  useEffect(() => {
    const saveScore = async () => {
      try {
        
        if (variant && typeof variant === 'number' && score >= 0) {
          
          const result = await saveBestScore(variant, score)
          
          
          
          if (result.updated) {
            console.log('🎉 Showing success popup!')
            Alert.alert(
              "🎉 Nouveau record !",
              `Félicitations ! Vous avez battu votre précédent record avec un score de ${score}/${totalAnswered}`,
              [{ text: "Super !", style: "default" }]
            )
          }
        }
      } catch (error) {
        console.error('💥 Erreur lors de la sauvegarde du score:', error)
      }
    }

    saveScore()
  }, [variant, score, totalAnswered, saveBestScore])

  const handleRetry = () => {
    console.log('Retry button pressed')
    // Retour à l'écran de configuration des cartes
    navigation.navigate('Cards')
  }

  return (
    <Container>
      <ContentScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      >
        {/* Header avec résultats */}
        <ResultsCard>
          <ResultsTitle>Résultats</ResultsTitle>
          <ScoreContainer>
            <ScoreText>
              {score} / {totalAnswered}
            </ScoreText>
            <AccuracyBadge accuracy={accuracy}>
              <AccuracyText>{accuracy}%</AccuracyText>
            </AccuracyBadge>
          </ScoreContainer>
        </ResultsCard>

        {/* Carousel de correction avec bordures colorées */}
        <CarouselSection>
          <CardsRecallOutput
            outputSlots={outputSlots}
            objectif={objectif}
            correctCards={correctCards}
            showCorrection={true}
          />
        </CarouselSection>


        {/* Bouton Retry */}
        <ButtonSection>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 50,
              paddingVertical: 18,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
            onPress={handleRetry}
          >
            <Text style={{
              color: theme.colors.textOnDark,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
              Recommencer
            </Text>
          </TouchableOpacity>
        </ButtonSection>
      </ContentScrollView>
    </Container>
  )
}