// hooks/useNamesRecallAnswers.js
import { useState, useCallback } from 'react'

/**
 * Hook pour gérer les réponses utilisateur dans l'écran de rappel des noms
 */
export const useNamesRecallAnswers = () => {
  const [userAnswers, setUserAnswers] = useState({})

  const handleAnswerChange = useCallback((profileId, field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [profileId]: {
        ...prev[profileId],
        [field]: value
      }
    }))
  }, [])

  const getCompletedAnswersCount = useCallback((profiles) => {
    return Object.keys(userAnswers).filter(profileId => {
      const answer = userAnswers[profileId]
      return answer?.firstName?.trim() && answer?.lastName?.trim()
    }).length
  }, [userAnswers])

  return {
    userAnswers,
    handleAnswerChange,
    getCompletedAnswersCount
  }
}