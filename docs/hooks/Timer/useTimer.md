useTimer Hook

Description générale

useTimer est un hook React qui gère un compte à rebours interne en secondes. Il décrémente automatiquement la valeur de temps restant chaque seconde jusqu'à zéro.

Fonctionnalités clés

Initialise le temps restant à la valeur initialTime passée en paramètre.

Décrémente timeLeft d'une unité toutes les 1000 ms tant que timeLeft > 0.

Nettoie le timer (clearTimeout) à chaque ré-exécution ou démontage pour éviter les fuites.

Signature

function useTimer(initialTime: number): [timeLeft: number, setTimeLeft: (newTime: number) => void]

Paramètre :

initialTime (number) : durée de départ en secondes.

Retourne :

timeLeft (number) : temps restant mis à jour chaque seconde.

setTimeLeft (function) : setter pour ajuster manuellement timeLeft.

Code commenté

export default function useTimer(initialTime) {
  // Initialise le state avec le temps de départ
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    // Si le temps restant est épuisé, arrêter le timer
    if (timeLeft <= 0) return

    // Lance un timeout d'une seconde pour décrémenter timeLeft
    const timer = setTimeout(
      () => setTimeLeft(timeLeft - 1), // décrémente de 1 seconde
      1000 // délai en ms
    )

    // Lors du nettoyage (changement de timeLeft ou démontage), annule le timeout
    return () => clearTimeout(timer)
  }, [timeLeft]) // dépend de timeLeft pour relancer à chaque mise à jour

  // Retourne le temps restant et le setter pour modification manuelle
  return [timeLeft, setTimeLeft]
}

Exemple d'utilisation

function CountdownDisplay() {
  const [timeLeft] = useTimer(30)

  return <Text>Temps restant : {timeLeft}s</Text>
}

Cette section documente intégralement le hook useTimer, ses paramètres, son comportement interne et un exemple d'usage.