useSaveRecord Hook

Description générale

useSaveRecord est un hook personnalisé qui expose une fonction saveRecord pour persister un résultat de session de jeu dans le contexte utilisateur (AccountContext). Il gère l’affichage de notifications de succès ou d’erreur.

Fonctionnalités clés

Récupère updateRecord depuis le AccountContext via useContext.

Fournit saveRecord(discipline, { mode, score, time }) :

Affiche un log de confirmation en console.

Appelle updateRecord pour enregistrer les données.

Affiche un Alert.alert de succès ou d’erreur.

Gère les erreurs via un try/catch et affiche une alerte en cas d’échec.

Signature

function useSaveRecord(): (
  discipline: string,
  payload: { mode: string; score: number; time: number }
) => Promise<void>

Retourne :

saveRecord (function) : fonction asynchrone pour enregistrer un record.

discipline (string) : catégorie de jeu (ex. "numbers").

payload ({ mode, score, time }) : objet contenant le mode de jeu, le score et la durée.

Code commenté

export default function useSaveRecord() {
  // Récupère la fonction updateRecord du contexte utilisateur
  const { updateRecord } = useContext(AccountContext)

  const saveRecord = useCallback(
    async (discipline, { mode, score, time }) => {
      // Log pour le débogage
      console.log(
        `[useSaveRecord] saving ${discipline}`,
        { mode, score, time }
      )
      try {
        // Appelle la mise à jour du record dans le contexte
        await updateRecord(discipline, { mode, score, time })
        // Alerte de succès
        Alert.alert(
          'Record sauvegardé',
          `Discipline: ${discipline}
Mode: ${mode}
Score: ${score}
Temps: ${time}s`
        )
      } catch (e) {
        // Log de l'erreur et alerte d'échec
        console.error(
          `[useSaveRecord] erreur saving ${discipline}`,
          e
        )
        Alert.alert('Erreur', "Impossible de sauvegarder le record.")
      }
    },
    [updateRecord]
  )

  // Retourne la fonction saveRecord
  return saveRecord
}

Exemple d'utilisation

function ResultsScreen() {
  const saveRecord = useSaveRecord()
  const onRetry = () => {
    saveRecord('numbers', { mode: 'easy', score: 10, time: 30 })
      .then(() => {
        // rediriger vers l'écran de démarrage
      })
  }
  return <Button onPress={onRetry}>Retry</Button>
}

Cette section détaille l’implémentation interne de useSaveRecord, comment l’utiliser et gérer les retours d’erreur.