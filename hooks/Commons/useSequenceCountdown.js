// hooks/Commons/useSequenceCountdown.js
import { useState, useEffect, useRef } from 'react'
import * as Haptics from 'expo-haptics'
import { useAudioPlayer } from 'expo-audio'

// Mapping des éléments vers les fichiers audio MP3
const audioFiles = {
  'A': require('../../assets/audio/mp3/a.mp3'),
  'B': require('../../assets/audio/mp3/b.mp3'),
  'C': require('../../assets/audio/mp3/c.mp3'),
  '3': require('../../assets/audio/mp3/3.mp3'),
  '2': require('../../assets/audio/mp3/2.mp3'),
  '1': require('../../assets/audio/mp3/1.mp3'),
}

/**
 * Hook pour gérer les séquences de décompte personnalisées
 * @param {Array} sequences - Tableau des séquences [['A','B','C'], ['3','2','1']]
 * @param {Function} onComplete - Callback appelé à la fin de toutes les séquences
 * @param {Object} hapticConfig - Configuration des vibrations pour chaque phase
 */
export const useSequenceCountdown = (sequences = [], onComplete, hapticConfig = {}) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1) // Commencer à -1 pour l'état "Prêt"
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showReady, setShowReady] = useState(true) // État initial "Prêt"
  const lastPlayedRef = useRef(null) // Tracker du dernier audio joué pour éviter les doublons
  
  // Création des players audio pour chaque élément
  const audioPlayers = {
    'A': useAudioPlayer(audioFiles['A']),
    'B': useAudioPlayer(audioFiles['B']),
    'C': useAudioPlayer(audioFiles['C']),
    '3': useAudioPlayer(audioFiles['3']),
    '2': useAudioPlayer(audioFiles['2']),
    '1': useAudioPlayer(audioFiles['1']),
  }
  
  // Fonction pour arrêter tous les players audio
  const stopAllAudio = () => {
    console.log('🛑 stopAllAudio() appelé')
    Object.entries(audioPlayers).forEach(([key, player]) => {
      try {
        if (player.playing) {
          console.log(`🛑 Arrêt de l'audio '${key}' (était en cours de lecture)`)
          player.pause()
          player.seekTo(0)
        }
      } catch (error) {
        // Ignore les erreurs de pause
      }
    })
  }
  
  // Fonction pour jouer l'audio d'un élément
  const playAudio = (item) => {
    console.log(`🎵 TENTATIVE de lecture audio pour '${item}'`)
    try {
      // Arrêter tous les autres audios d'abord
      stopAllAudio()
      
      const player = audioPlayers[item]
      if (player) {
        console.log(`🎵 Player trouvé pour '${item}' - seekTo(0) puis play()`)
        player.seekTo(0)
        player.play()
        console.log(`✅ Audio '${item}' lancé avec succès`)
      } else {
        console.warn(`❌ Aucun player trouvé pour '${item}'`)
      }
    } catch (error) {
      console.warn(`❌ Erreur lecture audio pour '${item}':`, error)
    }
  }
  
  // Phase actuelle basée sur l'index
  const currentPhase = sequences[currentPhaseIndex] || []
  const currentItem = showReady ? 'Prêt' : (currentPhase[currentItemIndex] || '')
  const isLastPhase = currentPhaseIndex >= sequences.length - 1
  const isLastItemInPhase = currentItemIndex >= currentPhase.length - 1
  
  useEffect(() => {
    if (sequences.length === 0) return
    
    let timeoutId
    
    if (showReady) {
      // État initial "Prêt" - pas d'audio, juste attendre puis commencer
      timeoutId = setTimeout(() => {
        setShowReady(false)
        setCurrentPhaseIndex(0)
        setCurrentItemIndex(0)
      }, 1000)
    } else if (currentPhaseIndex >= sequences.length) {
      // Si on a dépassé toutes les séquences, on termine
      setTimeout(() => {
        stopAllAudio()
        onComplete?.()
      }, 500)
      return
    } else {
      // Jouer l'audio pour l'élément actuel
      if (currentItem !== 'Prêt') {
        console.log(`🎯 useEffect déclenché - currentItem: '${currentItem}' (phase: ${currentPhaseIndex}, index: ${currentItemIndex})`)
        
        // Éviter de rejouer le même audio si c'est un double trigger
        const currentKey = `${currentPhaseIndex}-${currentItemIndex}-${currentItem}`
        if (lastPlayedRef.current !== currentKey) {
          console.log(`🆕 Nouveau élément détecté, lancement audio`)
          lastPlayedRef.current = currentKey
          playAudio(currentItem)
        } else {
          console.log(`⏭️ Même élément déjà joué, skip`)
        }
      }
      
      const currentSequence = sequences[currentPhaseIndex]
      
      if (currentItemIndex < currentSequence.length - 1) {
        // Continuer dans la séquence actuelle
        timeoutId = setTimeout(async () => {
          // Vibration selon la phase
          const hapticStyle = hapticConfig[currentPhaseIndex] || Haptics.ImpactFeedbackStyle.Heavy
          await Haptics.impactAsync(hapticStyle)
          
          // Animation
          setIsAnimating(true)
          setTimeout(() => {
            setCurrentItemIndex(currentItemIndex + 1)
            setIsAnimating(false)
          }, 100)
        }, 1000)
      } else {
        // Fin de séquence actuelle
        if (currentPhaseIndex < sequences.length - 1) {
          // Passer à la séquence suivante
          setTimeout(() => {
            setCurrentPhaseIndex(currentPhaseIndex + 1)
            setCurrentItemIndex(0)
          }, 1000)
        } else {
          // Toutes les séquences terminées
          setTimeout(() => {
            stopAllAudio()
            onComplete?.()
          }, 1000)
        }
      }
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [sequences, currentPhaseIndex, currentItemIndex, showReady, onComplete, hapticConfig])
  
  return {
    currentItem,
    currentPhaseIndex,
    currentItemIndex,
    isAnimating,
    isLastPhase,
    isLastItemInPhase,
    reset: () => {
      setCurrentPhaseIndex(0)
      setCurrentItemIndex(0)
      setIsAnimating(false)
    }
  }
}