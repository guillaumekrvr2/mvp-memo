useCellHandlers Hook

Description générale

useCellHandlers est un hook dédié à la gestion des événements de saisie dans une grille de cellules. Il fournit des callbacks pour :

Mettre à jour la valeur d’une cellule et passer automatiquement au champ suivant lorsque l’utilisateur saisit un caractère.

Gérer la suppression (Backspace) : efface la valeur actuelle ou recule vers la cellule précédente si vide.

Fonctionnalités clés

Calcule l’index linéaire (idx) d’une cellule à partir de row, col et cols.

onChangeText :

Met à jour la cellule via setCellValue(row, col, text).

Si text non vide et que l’index suivant (idx+1) est inférieur à objectif, place le focus sur la cellule suivante (inputRefs.current[idx+1]).

onKeyPress :

Intercepte l’événement nativeEvent.key === 'Backspace'.

Si la cellule actuelle est déjà vide (values[idx] === '') et idx > 0, efface la cellule précédente et place le focus dessus.

Sinon, efface simplement la cellule courante.

Signature

function useCellHandlers(params: {
  row: number;
  col: number;
  cols: number;
  objectif: number;
  values: string[];
  setCellValue: (row: number, col: number, text: string) => void;
  inputRefs: React.RefObject<{ current: { focus: () => void } }[]>;
}): {
  onChangeText: (text: string) => void;
  onKeyPress: ({ nativeEvent }: { nativeEvent: { key: string } }) => void;
}

Code commenté

export default function useCellHandlers({
  row,
  col,
  cols,
  objectif,
  values,
  setCellValue,
  inputRefs,
}) {
  // Index linéaire de la cellule
  const idx = row * cols + col

  // Callback pour la saisie de texte
  const onChangeText = useCallback(
    text => {
      // Met à jour la valeur de la cellule
      setCellValue(row, col, text)
      // Si un caractère est saisi et qu’il reste des cellules
      if (text && idx + 1 < objectif) {
        // Focus automatique sur la cellule suivante
        inputRefs.current[idx + 1]?.current.focus()
      }
    },
    [row, col, idx, objectif, setCellValue, inputRefs]
  )

  // Callback pour la touche Backspace
  const onKeyPress = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.key !== 'Backspace') return
      const current = values[idx] || ''
      if (current === '' && idx > 0) {
        // Si vide, efface la cellule précédente et focus dessus
        const prev = idx - 1
        setCellValue(Math.floor(prev / cols), prev % cols, '')
        inputRefs.current[prev]?.current.focus()
      } else {
        // Sinon, efface la cellule courante
        setCellValue(row, col, '')
      }
    },
    [row, col, idx, cols, values, setCellValue, inputRefs]
  )

  // Expose les deux handlers
  return { onChangeText, onKeyPress }
}

Exemple d’utilisation

function InputGridCell({ row, col, cols, objectif, values, setCellValue, inputRefs }) {
  // Récupère les handlers adaptés à la cellule
  const { onChangeText, onKeyPress } = useCellHandlers({
    row,
    col,
    cols,
    objectif,
    values,
    setCellValue,
    inputRefs,
  })

  return (
    <TextInput
      ref={el => (inputRefs.current[row * cols + col] = el)}
      value={values[row * cols + col]}
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
    />
  )
}

Cette section documente useCellHandlers, ses callbacks et leur rôle dans la navigation automatique entre champs de saisie.