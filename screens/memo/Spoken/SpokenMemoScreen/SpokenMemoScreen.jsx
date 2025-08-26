// screens/memo/Spoken/SpokenMemoScreen/SpokenMemoScreen.jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { useAudioPlayer } from 'expo-audio'
import { theme } from '../../../../theme'
import * as S from './styles'

// Mapping des chiffres vers les fichiers audio MP3
const digitAudioFiles = {
  '1': require('../../../../assets/audio/mp3/1.mp3'),
  '2': require('../../../../assets/audio/mp3/2.mp3'),
  '3': require('../../../../assets/audio/mp3/3.mp3'),
  '4': require('../../../../assets/audio/mp3/4.mp3'),
  '5': require('../../../../assets/audio/mp3/5.mp3'),
  '6': require('../../../../assets/audio/mp3/6.mp3'),
  '7': require('../../../../assets/audio/mp3/7.mp3'),
  '8': require('../../../../assets/audio/mp3/8.mp3'),
  '9': require('../../../../assets/audio/mp3/9.mp3'),
}

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

  // Création des players audio pour chaque chiffre
  const digitPlayers = {
    '1': useAudioPlayer(digitAudioFiles['1']),
    '2': useAudioPlayer(digitAudioFiles['2']),
    '3': useAudioPlayer(digitAudioFiles['3']),
    '4': useAudioPlayer(digitAudioFiles['4']),
    '5': useAudioPlayer(digitAudioFiles['5']),
    '6': useAudioPlayer(digitAudioFiles['6']),
    '7': useAudioPlayer(digitAudioFiles['7']),
    '8': useAudioPlayer(digitAudioFiles['8']),
    '9': useAudioPlayer(digitAudioFiles['9']),
  }

  // Génération d'une séquence aléatoire de chiffres
  const generateDigitSequence = () => {
    const digits = []
    for (let i = 0; i < objectif; i++) {
      const randomDigit = Math.floor(Math.random() * 9) + 1 // 1 à 9
      digits.push(randomDigit.toString())
    }
    console.log(`🎯 Séquence générée (${objectif} chiffres):`, digits.join(', '))
    setDigitSequence(digits)
    return digits
  }

  // Fonction pour arrêter tous les players de chiffres
  const stopAllDigitAudios = () => {
    Object.entries(digitPlayers).forEach(([key, player]) => {
      try {
        if (player.playing) {
          console.log(`🛑 Arrêt du chiffre '${key}' (était en cours)`)
          player.pause()
          player.seekTo(0)
        }
      } catch (error) {
        // Ignore les erreurs
      }
    })
  }

  // Fonction pour jouer un chiffre avec rechargement si nécessaire
  const playDigit = async (digit) => {
    try {
      const player = digitPlayers[digit]
      if (player) {
        // Diagnostic détaillé AVANT de jouer
        console.log(`🎵 === DIAGNOSTIC CHIFFRE '${digit}' ===`)
        console.log(`📊 isLoaded: ${player.isLoaded}`)
        console.log(`📊 playing: ${player.playing}`)
        console.log(`📊 duration: ${player.duration}`)
        console.log(`📊 currentTime: ${player.currentTime}`)
        
        // 🔄 OPTION A: Recharger si isLoaded = false
        if (!player.isLoaded) {
          console.warn(`⚠️ Audio '${digit}' PAS CHARGÉ - RECHARGEMENT EN COURS...`)
          try {
            // Utiliser replace() pour recharger la source
            await player.replace(digitAudioFiles[digit])
            console.log(`✅ Audio '${digit}' rechargé avec succès`)
            
            // Vérifier que ça a marché
            console.log(`📊 Après rechargement - isLoaded: ${player.isLoaded}`)
          } catch (reloadError) {
            console.error(`❌ Erreur rechargement '${digit}':`, reloadError)
          }
        }
        
        // Jouer avec timing précis
        const startTime = Date.now()
        player.seekTo(0)
        player.play()
        
        console.log(`✅ Chiffre '${digit}' lancé à ${startTime}`)
      } else {
        console.error(`❌ Aucun player pour le chiffre '${digit}'`)
      }
    } catch (error) {
      console.warn(`❌ Erreur lecture chiffre '${digit}':`, error)
    }
  }

  // Lecture séquentielle des chiffres avec diagnostic timing précis
  const playDigitSequence = async (sequence) => {
    console.log(`🚀 === DÉBUT SÉQUENCE ===`)
    console.log(`📋 Séquence: [${sequence.join(', ')}]`)
    
    setIsPlaying(true)
    setCurrentDigitIndex(0)
    
    const sequenceStartTime = Date.now()
    
    for (let i = 0; i < sequence.length; i++) {
      const digit = sequence[i]
      const expectedTime = sequenceStartTime + (i * 1000) // Chaque chiffre à +1s
      const currentTime = Date.now()
      const timeDrift = currentTime - expectedTime
      
      console.log(`🎯 === CHIFFRE ${i + 1}/${sequence.length}: ${digit} ===`)
      console.log(`⏰ Temps attendu: ${expectedTime}`)
      console.log(`⏰ Temps réel: ${currentTime}`)
      console.log(`⏰ Dérive: ${timeDrift}ms`)
      
      // Afficher le chiffre actuel
      setCurrentDigitIndex(i)
      setShowCurrentDigit(true)
      
      // Jouer l'audio avec rechargement automatique (async)
      await playDigit(digit)
      
      // Attendre exactement 1 seconde (timing précis)
      if (i < sequence.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    // Fin de la séquence - timing normal
    setTimeout(() => {
      const totalTime = Date.now() - sequenceStartTime
      console.log(`🏁 Séquence terminée en ${totalTime}ms`)
      console.log(`📊 Temps théorique: ${(sequence.length - 1) * 1000 + 1000}ms`)
      
      // 🧪 TEST: Diagnostic final de l'état des players
      console.log(`🔍 === DIAGNOSTIC FINAL TOUS LES PLAYERS ===`)
      Object.entries(digitPlayers).forEach(([digit, player]) => {
        console.log(`📊 Chiffre '${digit}': isLoaded=${player.isLoaded}, playing=${player.playing}, currentTime=${player.currentTime}`)
      })
      
      // stopAllDigitAudios() // ← COMMENTÉ POUR LE TEST
      console.log(`🧪 TEST: Pas d'arrêt final des audios`)
      setIsPlaying(false)
      setCurrentDigitIndex(-1)
      setShowCurrentDigit(false)
    }, 1000)
  }

  const handleValidate = () => {
    // TODO: Navigation vers l'écran suivant (correction/résultats)
    console.log('Validation spoken memo')
  }

  const handleStartMemorization = () => {
    // Diagnostic de l'état de tous les players avant de commencer
    console.log(`🔍 === DIAGNOSTIC INITIAL TOUS LES PLAYERS ===`)
    Object.entries(digitPlayers).forEach(([digit, player]) => {
      console.log(`📊 Chiffre '${digit}': isLoaded=${player.isLoaded}, playing=${player.playing}, duration=${player.duration}`)
    })
    
    const sequence = generateDigitSequence()
    playDigitSequence(sequence)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <S.Container>
        <S.ContentWrapper>
          <S.MicrophoneContainer>
            {showCurrentDigit && currentDigitIndex >= 0 ? (
              <S.CurrentDigit>{digitSequence[currentDigitIndex]}</S.CurrentDigit>
            ) : (
              <S.MicrophoneIcon>🎤</S.MicrophoneIcon>
            )}
          </S.MicrophoneContainer>
          
          <S.InstructionText>
            {isPlaying 
              ? `Chiffre ${currentDigitIndex + 1}/${objectif}`
              : `Mémorisez ${objectif} chiffres dictés`
            }
          </S.InstructionText>
          
          {isPlaying ? (
            <S.PlayingIndicator>
              <S.PlayingText>En cours...</S.PlayingText>
            </S.PlayingIndicator>
          ) : (
            <>
              <S.StartButton onPress={handleStartMemorization}>
                <S.StartButtonText>Commencer</S.StartButtonText>
              </S.StartButton>
              
              {digitSequence.length > 0 && (
                <S.ValidateButton onPress={handleValidate}>
                  <S.ValidateButtonText>Valider</S.ValidateButtonText>
                </S.ValidateButton>
              )}
            </>
          )}
        </S.ContentWrapper>
      </S.Container>
    </SafeAreaView>
  )
}