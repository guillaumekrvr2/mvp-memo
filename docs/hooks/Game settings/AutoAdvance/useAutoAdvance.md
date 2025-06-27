useAutoAdvance Hook

Description générale

Le hook useAutoAdvance automatise le passage entre les segments (highlightIndex) d’une grille de mémorisation sur une durée fixe. Il crée un intervalle basé sur le nombre total d’étapes (stepsCount) et la durée (temps), et incrémente l’indice tant que l’avancement automatique est activé.

Fonctionnalités clés

Active l’auto-avancement si autoAdvance est true et stepsCount > 0.

Calcule la durée totale en millisecondes (durationMs = temps * 1000).

Détermine l’intervalle entre chaque étape (intervalMs = durationMs / stepsCount).

Utilise setInterval pour incrémenter highlightIndex toutes les intervalMs.

Arrête l’intervalle lorsque highlightIndex atteint stepsCount - 1.

Nettoie le timer au démontage ou lorsque l’une des dépendances change.

Signature

function useAutoAdvance(
  autoAdvance: boolean,
  temps: number,
  stepsCount: number,
  setHighlightIndex: Dispatch<SetStateAction<number>>
): void

Paramètres :

autoAdvance (boolean) : flag indiquant si l’auto-avance doit être exécuté.

temps (number) : durée totale du compte à rebours en secondes.

stepsCount (number) : nombre total de segments à parcourir.

setHighlightIndex (function) : setter React pour mettre à jour l’indice.

Code commenté

export default function useAutoAdvance(
  autoAdvance,
  temps,
  stepsCount,
  setHighlightIndex
) {
  useEffect(() => {
    // Ne rien faire si désactivé ou pas d’étapes
    if (!autoAdvance || stepsCount === 0) return

    // Calcul des durées en ms
    const durationMs = temps * 1000
    const intervalMs = durationMs / stepsCount

    // Lancement de l’intervalle
    const id = setInterval(() => {
      setHighlightIndex(prev => {
        if (prev < stepsCount - 1) {
          return prev + 1
        } else {
          clearInterval(id) // arrêt de l’intervalle
          return prev
        }
      })
    }, intervalMs)

    // Nettoyage à la fin
    return () => clearInterval(id)
  }, [autoAdvance, temps, stepsCount, setHighlightIndex])
}

Exemple d’utilisation