useGrid Hook

Description générale

useGrid est un hook qui transforme un tableau linéaire en matrice à plusieurs colonnes, gère l’état de surbrillance de groupes d’éléments, et offre un mode "input" pour la modification des cellules.

Fonctionnalités clés

Calcule le nombre total d’éléments (total), d’étapes (totalGroups) et l’indice maximal (maxIndex) à partir de la longueur initiale du tableau et de la taille de groupe (grouping).

Gère l’état highlightIndex et le setter setHighlightIndex pour indiquer quel groupe est actif.

En mode input (inputMode=true), initialise un état values copiant le tableau fourni et expose un setter setCellValue(rowIdx, colIdx, raw) pour valider et mettre à jour les cellules.

Utilise useMemo pour découper la source (soit items soit values) en matrice rows de largeur cols.

Calcule highlightDigits (les éléments du groupe actuel) en joignant les valeurs du segment correspondant.

Retourne un objet combinant rows, highlightIndex, setHighlightIndex, maxIndex, highlightDigits, totalGroups et, si inputMode, values et setCellValue.

Signature

function useGrid<T>(
  items: T[],
  cols: number,
  grouping: number,
  inputMode?: boolean
): {
  rows: T[][];
  highlightIndex: number;
  setHighlightIndex: Dispatch<SetStateAction<number>>;
  maxIndex: number;
  highlightDigits: string;
  totalGroups: number;
  values?: string[];
  setCellValue?: (rowIdx: number, colIdx: number, raw: string) => void;
}

Code commenté

export default function useGrid(
  items,
  cols,
  grouping,
  inputMode = false
) {
  // 1) Nombre d’éléments et calcul des groupes
  const total = items.length
  const maxIndex = Math.ceil(total / grouping) - 1
  const totalGroups = Math.ceil(total / grouping)
  // 2) État du groupe actif
  const [highlightIndex, setHighlightIndex] = useState(0)

  // 3) En mode input, on duplique items pour pouvoir modifier
  const [values, setValues] = useState(
    inputMode ? [...items] : null
  )

  // 4) Découpage du tableau en matrice (rows)
  const rows = useMemo(() => {
    const source = inputMode ? values : items
    const r = []
    for (let i = 0; i < total; i += cols) {
      r.push(source.slice(i, i + cols))
    }
    return r
  }, [inputMode, items, values, cols, total])

  // 5) Setter ciblé pour les inputs
  const setCellValue = inputMode
    ? (rowIdx, colIdx, raw) => {
        const idx = rowIdx * cols + colIdx
        const clean = raw.replace(/[^0-9]/g, '')
        setValues(v => {
          const copy = [...v]
          copy[idx] = clean
          return copy
        })
      }
    : undefined

  // 6) Calcul de la chaîne surlignée
  const highlightDigits = useMemo(() => {
    const start = highlightIndex * grouping
    const source = inputMode ? values : items
    return source.slice(start, start + grouping).join('')
  }, [inputMode, items, values, grouping, highlightIndex])

  // Expose les données et fonctions
  return {
    rows,
    highlightIndex,
    setHighlightIndex,
    maxIndex,
    highlightDigits,
    totalGroups,
    ...(inputMode && { values, setCellValue }),
  }
}

Exemple d’utilisation