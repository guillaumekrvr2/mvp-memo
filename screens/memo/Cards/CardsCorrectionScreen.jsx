// screens/memo/Cards/CardsCorrectionScreen.jsx
import React from 'react'
import { SecondaryButton } from '../../../components/atoms/Commons/SecondaryButton/SecondaryButton'
import { CardsRecallOutput } from '../../../components/organisms/Cards/CardsRecallOutput/CardsRecallOutput'
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
  InstructionsCard,
  InstructionItem,
  SuccessIndicator,
  ErrorIndicator,
  InstructionText,
  ButtonSection,
  ErrorContainer,
  ErrorText
} from './styles'

export default function CardsCorrectionScreen({ route, navigation }) {
  console.log('CardsCorrectionScreen route.params:', route.params)

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
  const totalCorrect = userCards.reduce((acc, userCard, index) => {
    const correctCard = correctCards[index]
    return acc + (userCard && correctCard && userCard.id === correctCard.id ? 1 : 0)
  }, 0)

  // Calcul de la précision
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  // Préparation des slots pour OutputCarousel
  const outputSlots = Array.from({ length: objectif }, (_, index) => ({
    id: index,
    position: index + 1,
    card: userCards[index] || null
  }))

  console.log('CardsCorrectionScreen rendering with:', { 
    totalAnswered, 
    totalCorrect, 
    accuracy,
    objectif
  })

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
              {totalCorrect} / {totalAnswered}
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
          <SecondaryButton onPress={handleRetry}>
            Recommencer
          </SecondaryButton>
        </ButtonSection>
      </ContentScrollView>
    </Container>
  )
}