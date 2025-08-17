// screens/memo/Cards/CardsCorrectionScreen.jsx
import React, { useEffect } from 'react'
import { Alert } from 'react-native'
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
  const score = userCards.reduce((acc, userCard, index) => {
    const correctCard = correctCards[index]
    return acc + (userCard && correctCard && userCard.id === correctCard.id ? 1 : 0)
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

  console.log('CardsCorrectionScreen rendering with:', { 
    totalAnswered, 
    score, 
    accuracy,
    objectif,
    variant
  })

  // Sauvegarde automatique du score à l'affichage
  useEffect(() => {
    const saveScore = async () => {
      try {
        console.log('🔍 Debug saveScore - Starting with:', { 
          variant, 
          variantType: typeof variant, 
          score, 
          totalAnswered,
          condition: variant && typeof variant === 'number' && score >= 0
        })
        
        if (variant && typeof variant === 'number' && score >= 0) {
          console.log('✅ Saving best score:', { variant, score })
          const result = await saveBestScore(variant, score)
          
          console.log('📊 Save result:', result)
          console.log('🎯 Result.updated:', result.updated)
          
          if (result.updated) {
            console.log('🎉 Showing success popup!')
            Alert.alert(
              "🎉 Nouveau record !",
              `Félicitations ! Vous avez battu votre précédent record avec un score de ${score}/${totalAnswered}`,
              [{ text: "Super !", style: "default" }]
            )
          } else {
            console.log('📝 Score not updated (not better than previous)')
          }
        } else {
          console.log('❌ Cannot save score:', { 
            variant, 
            variantType: typeof variant, 
            score, 
            hasVariant: !!variant,
            isNumber: typeof variant === 'number',
            scoreValid: score >= 0
          })
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
          <SecondaryButton onPress={handleRetry}>
            Recommencer
          </SecondaryButton>
        </ButtonSection>
      </ContentScrollView>
    </Container>
  )
}