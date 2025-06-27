---

## useMode Hook

### Description générale

`useMode` gère la sélection d’un mode parmi une liste d’options, conservant l’état local du mode actif et fournissant un callback pour le mettre à jour.

### Fonctionnalités clés

- **`mode`** (`string`) : valeur du mode actuellement sélectionné.  
- **`onModeChange`** (`(newMode: string) => void`) : fonction pour changer le mode.  
- **`options`** (`{ label: string, value: string }[]`) : liste des options disponibles, inchangée.

### Signature

```ts
function useMode(
  initialMode: string,
  options: { label: string; value: string }[]
): {
  mode: string;
  onModeChange: (newMode: string) => void;
  options: { label: string; value: string }[];
}

export default function useMode(initialMode, options) {
  // 1) Initialise l’état du mode avec la valeur par défaut
  const [mode, setMode] = useState(initialMode);

  // 2) Callback pour mettre à jour le mode
  const onModeChange = useCallback(newMode => {
    setMode(newMode);
  }, []);

  // 3) Expose l’état, le setter et la liste des options
  return { mode, onModeChange, options };
}

Exemple d'utilisation

function ModeSelector({ options }) {
  const { mode, onModeChange } = useMode('memory-league', options);

  return (
    <Picker
      selectedValue={mode}
      onValueChange={onModeChange}
    >
      {options.map(opt => (
        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
      ))}
    </Picker>
  );
}

