useAutoSaveRecord Hook

Description générale

useAutoSaveRecord est un hook qui enregistre automatiquement un nouveau record lorsque les performances actuelles surpassent les précédentes, pour des modes de jeu spécifiés.

Fonctionnalités clés

Vérifie si le mode est inclus dans modesToAuto et si un utilisateur est connecté (current).

Récupère le record précédent depuis current.records[discipline][mode].

Détermine un nouveau record si :

aucun record précédent (prev est falsy),

même temps (time === lastTime) et score supérieur (score > lastScore),

même score (score === lastScore) et temps inférieur (time < lastTime).

Appelle useSaveRecord pour persister immédiatement le nouveau record, exploitant ainsi le context AccountContext et les alertes.

Signature

function useAutoSaveRecord(
  discipline: string,
  mode: string,
  score: number,
  time: number,
  modesToAuto?: string[]
): void

Paramètres :

discipline (string) : identifiant de la discipline (ex. 'numbers').

mode (string) : mode de jeu courant.

score (number) : score obtenu.

time (number) : durée du jeu en secondes.

modesToAuto (string[], optionnel) : liste des modes activant l’auto-save (par défaut ['memory-league','iam']).

Code commenté

export default function useAutoSaveRecord(
  discipline,
  mode,
  score,
  time,
  modesToAuto = ['memory-league', 'iam']
) {
  // Contexte actuel de l'utilisateur
  const { current } = useContext(AccountContext)
  // Fonction pour sauvegarder manuellement un record
  const saveRecord = useSaveRecord()

  useEffect(() => {
    // Ne rien faire si mode non concerné ou pas d'utilisateur
    if (!modesToAuto.includes(mode) || !current) return

    // Récupère le record précédent pour cette discipline et mode
    const prev = current.records[discipline]?.[mode]
    const lastScore = prev?.score
    const lastTime = prev?.time

    // Détection d'un nouveau record
    const isNewRecord =
      !prev ||
      (time === lastTime && score > lastScore) ||
      (score === lastScore && time < lastTime)

    if (isNewRecord) {
      // Sauvegarde si conditions remplies
      saveRecord(discipline, { mode, score, time })
    }
  }, [discipline, mode, score, time, current, saveRecord, modesToAuto])
}

Exemple d'utilisation

function ResultsScreen({ route }) {
  const { score, temps, mode } = route.params
  // Auto-save pour les modes spécifiés
  useAutoSaveRecord('numbers', mode, score, temps)

  return <View><Text>Score: {score}</Text></View>
}

Cette section documente useAutoSaveRecord, son algorithme de détection de record et son intégration sans action explicite de l’utilisateur.

