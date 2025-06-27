useCountdown Hook

Description générale

useCountdown (alias useTimer dans certains fichiers) est un hook qui gère un état de temps (temps) en fournissant par défaut une valeur configurée selon le mode de jeu, et en réinitialisant ce temps à chaque changement de mode.

Fonctionnalités clés

Initialise temps à partir de defaultTimes[mode] (importé de la configuration gameConfig), ou à 0 si aucune valeur correspondant.

Met à jour automatiquement temps à chaque modification du mode via un useEffect.

Expose temps et setTemps pour permettre un ajustement manuel du temps si nécessaire.

Signature

function useCountdown(
  mode: string
): {
  temps: number;
  setTemps: (value: number) => void;
}

Paramètre :

mode (string) : clé correspondant à une entrée de la map defaultTimes.

Retourne :

temps (number) : temps initial configuré pour le mode, mis à jour au changement de mode.

setTemps (function) : setter pour modifier manuellement temps.

Code commenté

export default function useCountdown(mode) {
  // Initialise le state temps selon la config par défaut pour ce mode
  const [temps, setTemps] = useState(defaultTimes[mode] ?? 0)

  // À chaque changement de mode, reset du temps par défaut
  useEffect(() => {
    setTemps(defaultTimes[mode] ?? 0)
  }, [mode])

  // Expose temps et la fonction setTemps
  return { temps, setTemps }
}

Exemple d'utilisation

function ObjectiveTimePicker({ mode, objectif, onObjectifChange, temps, onTempsChange }) {
  // Temp initial est réglé par useCountdown selon le mode
  const { temps: defaultTemps, setTemps } = useCountdown(mode)

  return (
    <View>
      <Text>Temps par défaut pour {mode} : {defaultTemps}s</Text>
      <TextInput
        value={String(temps)}
        onChangeText={text => onTempsChange(parseInt(text, 10) || 0)}
      />
    </View>
  )
}

Cette section documente le hook useCountdown, son initialisation via defaultTimes et sa réactivité aux changements de mode.