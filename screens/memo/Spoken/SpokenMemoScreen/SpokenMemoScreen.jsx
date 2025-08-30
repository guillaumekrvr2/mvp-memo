// screens/memo/Spoken/SpokenMemoScreen/SpokenMemoScreen.jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import * as Speech from 'expo-speech'
import { theme } from '../../../../theme'
import MemorizationHeader from '../../../../components/molecules/Commons/MemorizationHeader/MemorizationHeader.jsx'
import * as S from './styles'

export default function SpokenMemoScreen({ route, navigation }) {
  const { 
    objectif, 
    temps, 
    variant, 
    autoAdvance,
    mode,
    discipline = 'spokens'
  } = route.params

  const [digitSequence, setDigitSequence] = useState([])
  const [currentDigitIndex, setCurrentDigitIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCurrentDigit, setShowCurrentDigit] = useState(false)

  // Génération d'une séquence aléatoire de chiffres
  const generateDigitSequence = () => {
    const digits = []
    for (let i = 0; i < objectif; i++) {
      const randomDigit = Math.floor(Math.random() * 10) // 0 à 9
      digits.push(randomDigit.toString())
    }
    setDigitSequence(digits)
    return digits
  }

  // Fonction pour prononcer un chiffre avec expo-speech
  const speakDigit = async (digit) => {
    return new Promise((resolve) => {
      
      Speech.speak(digit, {
        language: 'fr-FR',
        rate: 0.8, // Vitesse de parole (0.1 à 2.0)
        pitch: 1.0, // Ton de la voix (0.5 à 2.0) 
        volume: 1.0, // Volume (0.0 à 1.0)
        onDone: () => {
          resolve()
        },
        onError: (error) => {
          console.error(`❌ Erreur speech '${digit}':`, error)
          resolve() // Continue même en cas d'erreur
        }
      })
    })
  }

  // Fonction pour arrêter la synthèse vocale
  const stopSpeaking = () => {
    Speech.stop()
  }

  // Lecture séquentielle des chiffres avec expo-speech
  const playDigitSequence = async (sequence) => {
    
    setIsPlaying(true)
    setCurrentDigitIndex(0)
    
    const sequenceStartTime = Date.now()
    
    for (let i = 0; i < sequence.length; i++) {
      const digit = sequence[i]
    
      
      // Afficher le chiffre actuel
      setCurrentDigitIndex(i)
      setShowCurrentDigit(true)
      
      // Prononcer le chiffre avec expo-speech
      await speakDigit(digit)
      
      // Attendre exactement 1 seconde entre les chiffres
      if (i < sequence.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    // Fin de la séquence
    setTimeout(() => {
      const totalTime = Date.now() - sequenceStartTime
      
      setIsPlaying(false)
      setCurrentDigitIndex(-1)
      setShowCurrentDigit(false)
    }, 1000)
  }

  const handleValidate = () => {
    console.log('🛑 Validation clicked - stopping speech immediately')
    
    // Arrêter IMMÉDIATEMENT la synthèse vocale
    stopSpeaking()
    
    // Réinitialiser les états
    setIsPlaying(false)
    setCurrentDigitIndex(-1)
    setShowCurrentDigit(false)
    
    // Navigation vers l'écran de recall
    navigation.navigate('SpokenRecall', {
      objectif,
      digitSequence,
      temps,
      variant,
      mode,
      discipline: 'spokens'
    })
  }

  const handleStartMemorization = () => {
    
    const sequence = generateDigitSequence()
    playDigitSequence(sequence)
  }

  // Démarrer automatiquement la diction au montage du composant
  useEffect(() => {
    const sequence = generateDigitSequence()
    playDigitSequence(sequence)
  }, [])

  // Nettoyer la synthèse vocale au démontage du composant
  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  // Arrêter la synthèse vocale quand on quitte l'écran
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      console.log('🛑 beforeRemove triggered - stopping speech')
      stopSpeaking()
      setIsPlaying(false)
      setCurrentDigitIndex(-1)
      setShowCurrentDigit(false)
    })

    return unsubscribe
  }, [navigation])

  // Arrêter la synthèse vocale quand le composant est sur le point d'être démonté
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('🛑 Screen blur - stopping speech')
      stopSpeaking()
      setIsPlaying(false)
      setCurrentDigitIndex(-1)
      setShowCurrentDigit(false)
    })

    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* HEADER */}
      <MemorizationHeader
        onBack={() => navigation.goBack()}
        onDone={handleValidate}
        duration={temps}
        title="Spokens 🎤"
        isSpoken={true}
        currentDigitIndex={currentDigitIndex}
        totalDigits={digitSequence.length}
      />

      <S.Container>
        <S.ContentWrapper>
          <S.MicrophoneContainer>
            <S.MicrophoneIcon>🎤</S.MicrophoneIcon>
          </S.MicrophoneContainer>
          
          <S.InstructionText>
            {isPlaying 
              ? `Chiffre ${currentDigitIndex + 1}/${objectif}`
              : `Mémorisez ${objectif} chiffres dictés`
            }
          </S.InstructionText>
          
          {digitSequence.length > 0 && (
            <S.ValidateButton onPress={handleValidate}>
              <S.ValidateButtonText>Valider</S.ValidateButtonText>
            </S.ValidateButton>
          )}
        </S.ContentWrapper>
      </S.Container>
    </SafeAreaView>
  )
}