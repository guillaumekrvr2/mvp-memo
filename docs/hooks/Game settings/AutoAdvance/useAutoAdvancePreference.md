useAutoAdvancePreference Hook

Description générale

useAutoAdvancePreference est un hook qui gère la préférence d’avancement automatique des sessions de jeu. Il persiste cette préférence dans AsyncStorage et ne l’active que si le mode en cours est custom.

Fonctionnalités clés

Charge la préférence sauvegardée depuis AsyncStorage sous la clé spécifiée (AUTOADVANCE_KEY) lors du montage.

Expose stored (booléen) reflétant la valeur brute récupérée.

Fournit toggleAutoAdvance(newValue) pour mettre à jour et persister la nouvelle préférence.

Calcule autoAdvance avec useMemo : true uniquement si le mode est custom et que la préférence est activée.

Signature

function useAutoAdvancePreference(
  mode: string,
  key?: string
): { autoAdvance: boolean; toggleAutoAdvance: (value: boolean) => Promise<void> }

Paramètres :

mode (string) : mode de jeu actuel ('custom' ou autre).

key (string, optionnel) : clé AsyncStorage pour persister la préférence (par défaut AUTOADVANCE_KEY).

Retourne :

autoAdvance (boolean) : indique si l’avancement automatique est actif.

toggleAutoAdvance (function) : callback asynchrone pour basculer et persister la préférence.

Code commenté

export default function useAutoAdvancePreference(
  mode,
  key = AUTOADVANCE_KEY
) {
  // 1) Stocke la valeur brute récupérée
  const [stored, setStored] = useState(false)

  // 2) Chargement de la préférence au montage
  useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value != null) setStored(value === 'true')
    })
  }, [key]) // se relance si la clé change

  // 3) Callback pour basculer la préférence et l’enregistrer
  const toggleAutoAdvance = useCallback(
    async newValue => {
      setStored(newValue) // mise à jour du state local
      await AsyncStorage.setItem(key, newValue.toString()) // persistance
    },
    [key]
  )

  // 4) Oui seulement si mode==='custom'
  const autoAdvance = useMemo(
    () => (mode === 'custom' ? stored : false),
    [mode, stored]
  )

  // Expose la valeur calculée et la fonction de basculement
  return { autoAdvance, toggleAutoAdvance }
}

Exemple d'utilisation

function Settings({ mode }) {
  const { autoAdvance, toggleAutoAdvance } = useAutoAdvancePreference(mode)

  return (
    <Switch
      value={autoAdvance}
      onValueChange={toggleAutoAdvance}
    />
  )
}

Cette section documente useAutoAdvancePreference, comment elle gère et persiste la préférence d’avancement automatique, ainsi que son integration conditionnelle au mode custom.