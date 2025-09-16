// hooks/useSaveScoreWithAuth.js

import { Alert } from 'react-native'
import useSaveBestScore from './useSaveBestScore'

/**
 * Hook personnalisé pour gérer la sauvegarde de score avec gestion d'utilisateur non connecté
 * Factorisation de la logique commune à tous les écrans de correction
 *
 * @returns {{ saveScoreWithAuth: function, loading: boolean, error: Error|null }}
 */
export default function useSaveScoreWithAuth() {
  const { saveBestScore, loading, error } = useSaveBestScore()

  /**
   * Sauvegarde le score avec gestion automatique des erreurs d'authentification
   *
   * @param {number} modeVariantId - ID du variant de mode
   * @param {number} score - Score obtenu
   * @param {object} navigation - Objet de navigation React Navigation
   * @param {function} onSuccess - Callback en cas de succès (optionnel)
   * @returns {Promise<Object|null>} Résultat de la sauvegarde ou null si erreur
   */
  const saveScoreWithAuth = async (modeVariantId, score, navigation, onSuccess) => {
    try {
      const result = await saveBestScore(modeVariantId, score)

      // Appeler le callback de succès si fourni
      if (onSuccess) {
        onSuccess(result)
      }

      return result
    } catch (error) {
      // Si l'utilisateur n'est pas connecté, afficher popup de connexion
      if (error.message === 'No user logged in') {
        Alert.alert(
          'Score non sauvegardé',
          'Connecte-toi pour sauvegarder tes scores !',
          [
            {
              text: 'Plus tard',
              style: 'cancel'
            },
            {
              text: 'Se connecter',
              onPress: () => navigation.navigate('SignUp')
            }
          ]
        )
      } else {
        // Autres erreurs : logguer
        console.error('Erreur lors de la sauvegarde automatique:', error)
      }

      return null
    }
  }

  return { saveScoreWithAuth, loading, error }
}