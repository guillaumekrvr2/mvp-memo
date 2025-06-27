useInputGrid Hook

Description générale

useInputGrid est un hook spécialisé qui encapsule useGrid en mode input pour initialiser automatiquement un tableau de cellules vides et exposer les mêmes API (rows, values, setCellValue, etc.). Il simplifie la création de grilles de saisie.

Fonctionnalités clés

Définit initial comme un tableau de chaînes vides de longueur cellCount.

Appelle useGrid(initial, cols, grouping, true) pour obtenir la matrice, les valeurs et les setters.

Expose directement les mêmes propriétés retournées par useGrid en mode input.

Signature

function useInputGrid(
  cellCount: number,
  cols: number,
  grouping?: number
): ReturnType<typeof useGrid>

Paramètres :

cellCount (number) : nombre de cellules totales à générer initialement vides.

cols (number) : nombre de colonnes de la grille.

grouping (number, optionnel) : taille de chaque groupe pour la surbrillance (défaut 1).

Retourne :

Les propriétés de useGrid en mode input : { rows, values, setCellValue, highlightIndex, setHighlightIndex, maxIndex, highlightDigits, totalGroups }.

Code commenté

export default function useInputGrid(
  cellCount,
  cols,
  grouping = 1
) {
  // 1) Initialise un tableau vide de la taille cellCount
  const initial = Array(cellCount).fill('')
  // 2) Réutilise useGrid en mode input
  const {
    rows,
    values,
    setCellValue,
    highlightIndex,
    setHighlightIndex,
    maxIndex,
    highlightDigits,
    totalGroups
  } = useGrid(initial, cols, grouping, true)

  // 3) Expose les mêmes API que useGrid
  return {
    rows,
    values,
    setCellValue,
    highlightIndex,
    setHighlightIndex,
    maxIndex,
    highlightDigits,
    totalGroups,
  }
}

Relation entre useGrid et useInputGrid

useInputGrid est un simple wrapper de useGrid configuré en inputMode=true.

Il pré-remplit automatiquement le tableau initial avec des chaînes vides et expose directement les mêmes données et callbacks pour la saisie.

Exemple d’utilisation

function InputGridComponent() {
  const { rows, values, setCellValue } = useInputGrid(12, 4, 3)
  return (
    <Grid data={rows} renderCell={(val, r, c) => (
      <TextInput
        value={values[r * 4 + c]}
        onChangeText={text => setCellValue(r, c, text)}
      />
    )} />
  )
}

