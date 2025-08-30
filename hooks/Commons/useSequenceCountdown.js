// hooks/Commons/useSequenceCountdown.js
import { useState, useEffect, useRef } from 'react'
import * as Haptics from 'expo-haptics'
import * as Speech from 'expo-speech'

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
  const lastPlayedRef = useRef(null) // Tracker du dernier élément prononcé pour éviter les doublons
  
  // Fonction pour arrêter la synthèse vocale
  const stopSpeaking = () => {
    console.log('🛑 Arrêt de la synthèse vocale')
    Speech.stop()
  }
  
  // Fonction pour prononcer un élément avec expo-speech
  const speakItem = (item) => {
    console.log(`🎵 Prononciation de '${item}'`)
    
    // Arrêter d'abord toute synthèse en cours
    stopSpeaking()
    
    Speech.speak(item, {
      language: 'fr-FR',
      rate: 0.8, // Vitesse de parole
      pitch: 1.0, // Ton de la voix 
      volume: 1.0, // Volume
      onDone: () => {
        console.log(`✅ Synthèse de '${item}' terminée`)
      },
      onError: (error) => {
        console.error(`❌ Erreur synthèse '${item}':`, error)
      }
    })
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
        stopSpeaking()
        onComplete?.()
      }, 500)
      return
    } else {
      // Prononcer l'élément actuel avec expo-speech
      if (currentItem !== 'Prêt') {
        console.log(`🎯 useEffect déclenché - currentItem: '${currentItem}' (phase: ${currentPhaseIndex}, index: ${currentItemIndex})`)
        
        // Éviter de repronocer le même élément si c'est un double trigger
        const currentKey = `${currentPhaseIndex}-${currentItemIndex}-${currentItem}`
        if (lastPlayedRef.current !== currentKey) {
          console.log(`🆕 Nouveau élément détecté, lancement synthèse`)
          lastPlayedRef.current = currentKey
          speakItem(currentItem)
        } else {
          console.log(`⏭️ Même élément déjà prononcé, skip`)
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
            stopSpeaking()
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