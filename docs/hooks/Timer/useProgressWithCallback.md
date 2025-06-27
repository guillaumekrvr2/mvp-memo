useProgressWithCallback Hook

Description générale

Le hook useProgressWithCallback anime une valeur progressant linéairement de 0 à 1 sur une durée spécifiée, puis déclenche un callback lorsque l’animation est terminée. Utile pour piloter des barres de progression ou autres animations temporelles.

Fonctionnalités clés

Initialise une Animated.Value(0) pour la progression.

Lance une animation Animated.timing de la valeur à jusqu’à 1 sur durationSec * 1000 ms.

Utilise une interpolation linéaire (Easing.linear).

Appelle la fonction onComplete lorsque l’animation se termine (finished === true).

Réinitialise la valeur à 0 à chaque changement de durationSec.

Signature

function useProgressWithCallback(
  durationSec: number,
  onComplete?: () => void
): Animated.Value

Paramètres :

durationSec (number) : durée de l’animation en secondes.

onComplete (() => void) : callback optionnel exécuté quand l’animation se termine.

Retourne :

progress (Animated.Value) : valeur animée entre 0 et 1.

Code commenté

export default function useProgressWithCallback(durationSec, onComplete) {
  // Référence à la valeur animée, initialisée à 0
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Réinitialise la valeur à chaque nouvelle durée
    progress.setValue(0)

    // Déclenche l'animation de 0 à 1
    Animated.timing(progress, {
      toValue: 1,
      duration: durationSec * 1000, // conversion en ms
      easing: Easing.linear,
      useNativeDriver: false, // animation non native
    }).start(({ finished }) => {
      // Si l’animation a bien terminé, on appelle onComplete
      if (finished) onComplete?.()
    })
  }, [durationSec, progress]) // relancer dès que durationSec change

  // Retourne la référence à la valeur animée
  return progress
}

Exemple d'utilisation

function TimedProgressBar({ duration }) {
  const progress = useProgressWithCallback(duration, () => {
    console.log('Progression terminée')
  })

  return (
    <Animated.View
      style={{
        width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
        height: 10,
        backgroundColor: 'blue',
      }}
    />
  )
}

Cette section documente le hook useProgressWithCallback, son usage, son comportement interne et un exemple pratique.");}]}