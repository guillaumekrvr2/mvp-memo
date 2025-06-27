useAutoScroll Hook

Description générale

useAutoScroll est un hook qui effectue un défilement programmatique d’un composant scrollable (par exemple une grille) pour suivre l’indice de surbrillance (index). Il garantit que les éléments actifs restent visibles à l’écran.

Fonctionnalités clés

Calcule le nombre d’éléments entièrement visibles (visibleCount) à partir de la hauteur du container (scrollHeight) et de la hauteur d’une ligne (rowHeight).

Détermine un seuil (threshold) pour commencer le défilement, afin de ne pas scroller immédiatement tant que l’indice est sous le seuil.

Si index >= threshold, calcule un offset vertical (offset = (index - threshold) * rowHeight) et appelle scrollTo({ y: offset, animated: true }) sur la référence scrollRef.

Ne déclenche aucune action si scrollRef.current est null ou si scrollHeight vaut 0.

Se réévalue à chaque changement de scrollRef, scrollHeight, index ou rowHeight.

Signature

function useAutoScroll(
  scrollRef: React.RefObject<ScrollView | FlatList>,
  scrollHeight: number,
  index: number,
  rowHeight: number
): void

Paramètres :

scrollRef (RefObject) : référence vers le composant scrollable (doit exposer scrollTo).

scrollHeight (number) : hauteur visible du container en pixels.

index (number) : indice de l’élément à mettre en surbrillance.

rowHeight (number) : hauteur d’une ligne ou cellule en pixels.

Code commenté

export default function useAutoScroll(scrollRef, scrollHeight, index, rowHeight) {
  useEffect(() => {
    // Vérifie la référence et la hauteur
    if (!scrollRef.current || scrollHeight === 0) return

    // Nombre d’éléments visibles à l’écran
    const visibleCount = Math.floor(scrollHeight / rowHeight)
    // Définit un seuil pour ne pas scroller trop tôt
    const threshold = Math.max(0, visibleCount - 3)

    // Si l’élément actif dépasse le seuil, calcule et applique le scroll
    if (index >= threshold) {
      const offset = (index - threshold) * rowHeight
      scrollRef.current.scrollTo({ y: offset, animated: true })
    }
  }, [scrollRef, scrollHeight, index, rowHeight])
}

Exemple d’utilisation

function NumberGrid({ rows, rowHeight }) {
  const scrollRef = useRef(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const [highlightIndex, setHighlightIndex] = useState(0)

  // Appliquer le scroll automatique
  useAutoScroll(scrollRef, containerHeight, highlightIndex, rowHeight)

  return (
    <View onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}>
      <ScrollView ref={scrollRef}>
        {rows.map((row, idx) => (
          <Row key={idx} data={row} isHighlighted={idx === highlightIndex} />
        ))}
      </ScrollView>
    </View>
  )
}

Cette section documente useAutoScroll, son fonctionnement interne et son usage pour garder un élément mis en surbrillance visible à l’écran.")}]}