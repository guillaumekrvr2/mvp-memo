// screens/memo/Spoken/SpokenMemoScreen/SpokenMemoScreen.jsx
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, View, Platform } from 'react-native'
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
    speechSpeed = 1.0,
    discipline = 'spokens'
  } = route.params || {}

  console.log('📝 SpokenMemoScreen params:', { objectif, temps, variant, speechSpeed });


  const [digitSequence, setDigitSequence] = useState([])
  const [currentDigitIndex, setCurrentDigitIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCurrentDigit, setShowCurrentDigit] = useState(false)
  const [shouldStop, setShouldStop] = useState(false) // Flag pour arrêter la séquence
  const isMountedRef = useRef(true) // Référence pour vérifier si le composant est monté

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
    const startTime = Date.now();
    console.log(`🎤 Speaking digit: ${digit}`);

    return new Promise((resolve) => {
      Speech.speak(digit, {
        language: 'en-US',
        rate: 1.2, // Vitesse plus rapide pour libérer du temps pour les délais
        pitch: 1.0, // Ton de la voix (0.5 à 2.0)
        volume: 1.0, // Volume (0.0 à 1.0)
        onDone: () => {
          const endTime = Date.now();
          const actualDuration = endTime - startTime;
          console.log(`✅ Speech done for '${digit}', duration: ${actualDuration}ms`);
          resolve(actualDuration)
        },
        onError: (error) => {
          console.error(`❌ Erreur speech '${digit}':`, error)
          resolve(0) // Continue même en cas d'erreur
        }
      })
    })
  }

  // Fonction pour arrêter la synthèse vocale
  const stopSpeaking = () => {
    setShouldStop(true) // Activer le flag d'arrêt
    Speech.stop()
    // Arrêter immédiatement les états si le composant est encore monté
    if (isMountedRef.current) {
      setIsPlaying(false)
      setCurrentDigitIndex(-1)
      setShowCurrentDigit(false)
    }
  }

  // Lecture séquentielle des chiffres avec expo-speech
  const playDigitSequence = async (sequence) => {
    console.log('🎵 Starting playDigitSequence with:', sequence);
    // Vérifier si le composant est encore monté avant de commencer
    if (!isMountedRef.current) {
      console.log('❌ Component not mounted, aborting sequence');
      return
    }

    setIsPlaying(true)
    setCurrentDigitIndex(0)
    setShouldStop(false) // Réinitialiser le flag d'arrêt
    
    const sequenceStartTime = Date.now()
    
    for (let i = 0; i < sequence.length; i++) {
      // Vérifier si on doit arrêter ou si le composant est démonté
      if (shouldStop || !isMountedRef.current) {
        break
      }
      
      const digit = sequence[i]
      
      // Afficher le chiffre actuel seulement si le composant est monté
      if (isMountedRef.current) {
        setCurrentDigitIndex(i)
        setShowCurrentDigit(true)
      }
      
      // Prononcer le chiffre avec expo-speech et récupérer la durée réelle
      const actualSpeechDuration = await speakDigit(digit)
      
      // Vérifier à nouveau après la synthèse
      if (shouldStop || !isMountedRef.current) {
        break
      }
      
      // Calculer le délai restant pour atteindre l'intervalle souhaité
      if (i < sequence.length - 1) {
        const targetIntervalMs = speechSpeed * 1000;
        const remainingDelay = Math.max(0, targetIntervalMs - actualSpeechDuration);
        
        if (remainingDelay > 0) {
          // Attendre en vérifiant périodiquement si on doit arrêter
          const checkInterval = 100 // Vérifier toutes les 100ms
          let remainingTime = remainingDelay
          
          while (remainingTime > 0 && !shouldStop && isMountedRef.current) {
            const waitTime = Math.min(checkInterval, remainingTime)
            await new Promise(resolve => setTimeout(resolve, waitTime))
            remainingTime -= waitTime
          }
          
          if (shouldStop || !isMountedRef.current) {
            break
          }
        }
      }
    }
    
    // Fin de la séquence - seulement si le composant est encore monté
    if (isMountedRef.current) {
      setTimeout(() => {
        if (isMountedRef.current) {
          const totalTime = Date.now() - sequenceStartTime
          
          setIsPlaying(false)
          setCurrentDigitIndex(-1)
          setShowCurrentDigit(false)
        }
      }, 1000)
    }
  }

  const handleValidate = () => {
    
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
    setShouldStop(false) // Réinitialiser le flag d'arrêt
    const sequence = generateDigitSequence()
    playDigitSequence(sequence)
  }

  // Démarrer automatiquement la diction au montage du composant
  useEffect(() => {
    console.log('🚀 SpokenMemoScreen mounted, starting sequence...');
    setShouldStop(false) // Réinitialiser le flag d'arrêt
    const sequence = generateDigitSequence()
    console.log('🔢 Generated sequence:', sequence);
    playDigitSequence(sequence)
  }, [])

  // Nettoyer la synthèse vocale au démontage du composant
  useEffect(() => {
    return () => {
      isMountedRef.current = false // Marquer comme démonté
      stopSpeaking()
    }
  }, [])

  // Arrêter la synthèse vocale quand on quitte l'écran
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      isMountedRef.current = false // Marquer comme démonté
      stopSpeaking()
    })

    return unsubscribe
  }, [navigation])

  // Arrêter la synthèse vocale quand le composant perd le focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      isMountedRef.current = false // Marquer comme démonté
      stopSpeaking()
    })

    return unsubscribe
  }, [navigation])

  const Container = Platform.OS === 'ios' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* HEADER */}
      <MemorizationHeader
        onBack={() => navigation.popToTop()}
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
    </Container>
  )
}