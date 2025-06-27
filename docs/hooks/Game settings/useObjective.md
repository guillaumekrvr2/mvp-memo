useObjective Hook

Description générale

useObjective est un hook basé sur useAsyncStorageState qui gère une valeur persistante (objectif) via AsyncStorage. Il synchronise l’état avec une valeur initiale et réinitialise automatiquement si la clé change.

Fonctionnalités clés

Utilise useAsyncStorageState(key, initialValue) pour persister et récupérer la valeur depuis AsyncStorage.

Expose objectif (la valeur courante) et setObjectif (setter persistant).

Réinitialise objectif à initialValue lorsque ce dernier change et si objectif est vide.

Signature

function useObjective(
  key?: string,
  initialValue?: string
): { objectif: string; setObjectif: (value: string) => void }

Paramètres :

key (string, optionnel) : clé AsyncStorage utilisée pour stocker la valeur (par défaut 'objectif').

initialValue (string, optionnel) : valeur de référence si aucune donnée n’est en cache.

Retourne :

objectif (string) : valeur persistée actuelle.

setObjectif (function) : fonction pour modifier et persister objectif.

Code commenté

export default function useObjective(key = 'objectif', initialValue = '') {
  // Hook persistant via AsyncStorageState
  const [objectif, setObjectif] = useAsyncStorageState(key, initialValue)

  useEffect(() => {
    // Si la valeur initiale change (ex. changement de mode) et que l’objectif est vide,
    // on le réinitialise pour refléter la nouvelle initialValue.
    if (objectif === '') {
      setObjectif(initialValue)
    }
  }, [initialValue])

  // Retourne l’état et le setter
  return { objectif, setObjectif }
}

Exemple d'utilisation

function ObjectiveInput({ mode }) {
  // Initialise l’objectif persistant sous la clé `numbers:objectif:easy`
  const { objectif, setObjectif } = useObjective(`numbers:objectif:${mode}`, '60')

  return (
    <TextInput
      value={objectif}
      onChangeText={text => setObjectif(text)}
    />
  )
}

Cette section documente useObjective, sa gestion de la persistance et la logique de réinitialisation automatique.