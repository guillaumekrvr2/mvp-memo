import { usePostHog } from 'posthog-react-native'
import { useCallback } from 'react'

/**
 * Hook personnalisé pour simplifier l'utilisation de PostHog dans l'app
 * @returns {Object} Méthodes de tracking PostHog
 */
export default function usePostHogTracking() {
  const posthog = usePostHog()

  /**
   * Identifie un utilisateur dans PostHog
   * @param {string} userId - ID unique de l'utilisateur
   * @param {Object} properties - Propriétés supplémentaires (email, nom, etc.)
   */
  const identifyUser = useCallback((userId, properties = {}) => {
    if (!posthog) return
    posthog.identify(userId, properties)
  }, [posthog])

  /**
   * Capture un événement personnalisé
   * @param {string} eventName - Nom de l'événement
   * @param {Object} properties - Propriétés de l'événement
   */
  const captureEvent = useCallback((eventName, properties = {}) => {
    if (!posthog) return
    posthog.capture(eventName, properties)
  }, [posthog])

  /**
   * Capture le début d'une session de mémorisation
   * @param {Object} sessionData - Données de la session
   */
  const captureMemorizationStart = useCallback((sessionData) => {
    captureEvent('memorization_session_start', {
      discipline: sessionData.discipline,
      mode: sessionData.mode,
      variant: sessionData.variant,
      objectif: sessionData.objectif,
      temps: sessionData.temps,
    })
  }, [captureEvent])

  /**
   * Capture la fin d'une session de mémorisation avec résultats
   * @param {Object} results - Résultats de la session
   */
  const captureMemorizationComplete = useCallback((results) => {
    captureEvent('memorization_session_complete', {
      discipline: results.discipline,
      mode: results.mode,
      score: results.score,
      objectif: results.objectif,
      accuracy: results.accuracy,
      temps_ecoule: results.tempsEcoule,
    })
  }, [captureEvent])

  /**
   * Capture un nouveau record personnel
   * @param {Object} recordData - Données du record
   */
  const captureNewRecord = useCallback((recordData) => {
    captureEvent('new_personal_record', {
      discipline: recordData.discipline,
      mode: recordData.mode,
      new_score: recordData.newScore,
      previous_score: recordData.previousScore,
    })
  }, [captureEvent])

  /**
   * Capture une inscription/connexion
   * @param {string} method - Méthode utilisée (email, google, etc.)
   */
  const captureAuth = useCallback((method, type = 'login') => {
    captureEvent(type === 'login' ? 'user_login' : 'user_signup', {
      method,
    })
  }, [captureEvent])

  /**
   * Reset l'utilisateur (déconnexion)
   */
  const resetUser = useCallback(() => {
    if (!posthog) return
    posthog.reset()
  }, [posthog])

  return {
    // Méthodes de base
    identifyUser,
    captureEvent,
    resetUser,
    // Méthodes spécifiques à l'app
    captureMemorizationStart,
    captureMemorizationComplete,
    captureNewRecord,
    captureAuth,
    // Instance PostHog brute si besoin
    posthog,
  }
}
