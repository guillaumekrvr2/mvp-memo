useAutoNavigate Hook

Description générale

Le hook useAutoNavigate déclenche automatiquement une navigation après un délai spécifié, lorsque la navigation automatique est activée.

Fonctionnalités clés

Écoute le flag enabled pour déterminer s’il faut démarrer le minuteur.

Lance un setTimeout exécutant callback après delay millisecondes si enabled est true.

Nettoie le timeout lorsque le flag, le délai ou la fonction callback change ou au démontage.

Signature

function useAutoNavigate(
  enabled: boolean,
  delay: number,
  callback: () => void
): void

Paramètres :

enabled (boolean) : active ou non la navigation automatique.

delay (number) : délai avant exécution de la navigation en millisecondes.

callback (() => void) : fonction de navigation (ex. navigation.replace).

Code commenté

export default function useAutoNavigate(enabled, delay, callback) {
  useEffect(() => {
    // Ne rien faire si la nav auto est désactivée
    if (!enabled) return

    // Démarrage du timeout pour appeler callback
    const timer = setTimeout(callback, delay)

    // Nettoyage si enabled, delay ou callback change, ou au démontage
    return () => clearTimeout(timer)
  }, [enabled, delay, callback])
}

Exemple d'utilisation

function SplashScreen({ navigation }) {
  // Après 3s, passer à l'écran d'accueil
  useAutoNavigate(true, 3000, () => navigation.replace('Home'))

  return <View><Text>Loading...</Text></View>
}

Cette section documente le hook useAutoNavigate, utile pour gérer les écrans temporisés comme les splash screens.