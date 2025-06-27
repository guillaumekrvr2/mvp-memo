useRecord Hook

Description générale

useRecord est un hook qui expose les dernières performances (score et temps) pour une discipline et un mode donnés, en synchronisant avec le contexte utilisateur à chaque focalisation d’écran.

Fonctionnalités clés

Lit les enregistrements (records) depuis AccountContext.current.records[gameKey][mode].

Initialise lastScore et lastTime à partir des valeurs existantes ou à zéro par défaut.

Met à jour automatiquement lastScore et lastTime à chaque fois que l’écran gagne le focus, grâce à useFocusEffect.

Signature

function useRecord(
  gameKey: string,
  mode: string
): { lastScore: number; lastTime: number }

Paramètres :

gameKey (string) : clé de la discipline (ex. "numbers").

mode (string) : nom du mode de jeu.

Retourne :

lastScore (number) : dernier score enregistré.

lastTime (number) : dernier temps enregistré.

Code commenté

export default function useRecord(gameKey, mode) {
  // Récupère le contexte utilisateur et ses records
  const { current } = useContext(AccountContext)
  // Extrait tous les records pour la discipline, ou objet vide
  const allRecs = current?.records?.[gameKey] || {}
  // Sélectionne le record pour le mode, ou { score:0, time:0 }
  const rec = allRecs[mode] || { score: 0, time: 0 }

  // State local pour stocker le dernier score et temps
  const [lastScore, setLastScore] = useState(rec.score)
  const [lastTime, setLastTime] = useState(rec.time)

  // useFocusEffect pour mettre à jour les valeurs à chaque entrée de l'écran
  useFocusEffect(
    useCallback(() => {
      setLastScore(rec.score) // synchronise le score
      setLastTime(rec.time)   // synchronise le temps
    }, [rec.score, rec.time])
  )

  // Retourne les valeurs synchronisées
  return { lastScore, lastTime }
}

Exemple d'utilisation

function ResultsDisplay({ gameKey, mode }) {
  const { lastScore, lastTime } = useRecord(gameKey, mode)
  return (
    <View>
      <Text>Dernier score : {lastScore}</Text>
      <Text>Dernier temps : {lastTime}s</Text>
    </View>
  )
}

Documente le hook useRecord, son comportement de synchronisation et sa mise à jour au focus.

