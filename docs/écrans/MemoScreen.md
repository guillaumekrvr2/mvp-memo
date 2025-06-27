MemoScreen

Constantes et hooks

// Récupération des paramètres de navigation
const { objectif, temps, mode, digitCount, autoAdvance } = route.params
// - objectif: nombre d'items ou durée à mémoriser
// - temps: durée initiale du chronomètre (string)
// - mode: mode de jeu actuel (string)
// - digitCount: taille du groupe de chiffres (number)
// - autoAdvance: booléen pour l'avancement auto

// Génération des chiffres à mémoriser
const numbers = useNumbers(objectif) // renvoie un tableau de chiffres aléatoires

// Conversion de la durée en entier pour le timer
const totalTime = parseInt(temps, 10) || 0 // nombre de secondes

// Initialisation du timer
const [timeLeft] = useTimer(totalTime) // timeLeft: secondes restantes

// Configuration de la grille
const cols = 6 // nombre de colonnes fixe
const grouping = digitCount // taille de chaque segment mis en surbrillance

// Logique de grille: segmentation et mise en surbrillance
const { rows, highlightIndex, setHighlightIndex, maxIndex, highlightDigits, totalGroups } =
  useGrid(numbers, cols, digitCount)
// - rows: matrice 2D de chiffres
// - highlightIndex: indice du segment actif
// - setHighlightIndex: setter pour changer de segment
// - maxIndex: indice max possible
// - highlightDigits: valeurs du segment actuel
// - totalGroups: nombre total de segments

// Référence pour le composant Grid (auto-scroll)
const scrollRef = useRef(null) // ref au ScrollView interne

// Stockage de la hauteur du container pour contrôler le scroll
const [scrollH, setH] = useState(0) // scrollH en pixels

// Auto-scroll: fait défiler la grille pour montrer le segment actif
useAutoScroll(scrollRef, scrollH, highlightIndex, 48 + 12)

// Auto-advance: passe au segment suivant automatiquement si activé
useAutoAdvance(autoAdvance, totalTime, totalGroups, setHighlightIndex)

Structure du rendu (JSX) (JSX)

SafeAreaView

<SafeAreaView>

Conteneur principal qui respecte les zones sûres des appareils mobiles.

MemorizationHeader

<MemorizationHeader
  onBack={() => navigation.goBack()}
  onDone={() => navigation.replace('Recall', { objectif, temps, numbers, mode })}
  duration={totalTime}
/>

onBack : callback pour revenir à l’écran précédent (navigation.goBack()).

onDone : callback pour remplacer la route courante par Recall, transmettant { objectif, temps, numbers, mode }.

duration : durée totale du chrono, affichée dans l’entête.

HighlightBox

<HighlightBox text={highlightDigits} />

text (array ou string) : chiffres du groupe courant à mettre en avant, fourni par highlightDigits.

BorderedContainer

<BorderedContainer onLayout={e => setH(e.nativeEvent.layout.height)}>
  {/* Grid */}
</BorderedContainer>

onLayout : callback React Native fournissant la hauteur effective du container (e.nativeEvent.layout.height), mise à jour via setH pour le scroll.

Grid

<Grid
  data={rows}
  cols={cols}
  scrollRef={scrollRef}
  renderCell={(n, rowIdx, colIdx) => { /* ... */ }}
/>

data (array) : matrice de chiffres à afficher, issue de rows.

cols (number) : nombre de colonnes (cols).

scrollRef (Ref) : référence pour permettre le défilement via useAutoScroll.

renderCell (function) : fonction de rendu pour chaque cellule ; reçoit:

n : valeur du chiffre à afficher.

rowIdx, colIdx : indices de position.

Logique interne calculant globalIdx et appliquant styles.highlightCell si dans la fenêtre active.

View des contrôles

<View style={styles.controls}>
  {/* ChevronButtons */}
</View>

Conteneur flex horizontal pour les boutons de navigation manuelle.

ChevronButton (gauche)

<ChevronButton
  direction="left"
  onPress={() => setHighlightIndex(i => Math.max(0, i - 1))}
/>

direction : flèche pointant vers la gauche.

onPress : décrémente highlightIndex jusqu’à 0.

ChevronButton (droite)

<ChevronButton
  direction="right"
  onPress={() => setHighlightIndex(i => Math.min(maxIndex, i + 1))}
/>

direction : flèche pointant vers la droite.

onPress : incrémente highlightIndex jusqu’à maxIndex.

Cette documentation commente chaque partie clé du rendu de MemoScreen, sans détailler les imports ou le style.