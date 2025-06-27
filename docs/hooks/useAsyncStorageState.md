useAsyncStorageState Hook

Description générale

useAsyncStorageState est un hook générique qui synchronise un état React avec AsyncStorage. Il permet de charger, persister et réinitialiser automatiquement une valeur entre les sessions de l’utilisateur.

Fonctionnalités clés

Charge la valeur stockée en AsyncStorage sous la clé spécifiée lors de l’initialisation.

Initialise l’état local avec initialValue tant que la valeur en cache n’est pas chargée ou si elle est absente.

Fournit un setter setAndPersist qui met à jour l’état local et persiste la nouvelle valeur dans AsyncStorage.

Gère les erreurs de lecture et d’écriture en consignant dans la console.

Signature

function useAsyncStorageState<T>(
  key: string,
  initialValue: T
): [state: T, setStateAndPersist: (value: T) => void]

Paramètres :

key (string) : clé sous laquelle la valeur est enregistrée en AsyncStorage.

initialValue (T) : valeur initiale utilisée tant qu’aucune donnée n’est chargée.

Retourne :

state (T) : état actuel, synchronisé avec AsyncStorage.

setStateAndPersist (function) : fonction pour mettre à jour state et persister la nouvelle valeur.

Code commenté

export default function useAsyncStorageState(key, initialValue) {
  // Initialise le state local
  const [state, setState] = useState(initialValue)

  // 1) Chargement initial depuis AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key)
        if (raw !== null) {
          // Parse JSON et met à jour le state
          setState(JSON.parse(raw))
        }
      } catch (e) {
        console.error(`Erreur lecture AsyncStorage clé="${key}"`, e)
      }
    })()
  }, [key]) // relancer si la clé change

  // 2) Setter enveloppé pour persister la nouvelle valeur
  const setAndPersist = useCallback(
    async newVal => {
      try {
        // Sauvegarde dans AsyncStorage
        await AsyncStorage.setItem(key, JSON.stringify(newVal))
        // Met à jour le state local
        setState(newVal)
      } catch (e) {
        console.error(`Erreur écriture AsyncStorage clé="${key}"`, e)
      }
    },
    [key]
  )

  // Retourne l'état et le setter persistant
  return [state, setAndPersist]
}

Exemple d'utilisation

function Example() {
  // Hook persistant pour la clé 'username'
  const [username, setUsername] = useAsyncStorageState('username', 'Guest')

  return (
    <TextInput
      value={username}
      onChangeText={text => setUsername(text)}
    />
  )
}

Cette section documente le hook useAsyncStorageState, son comportement de chargement, de persistance et son API simple.")}]}