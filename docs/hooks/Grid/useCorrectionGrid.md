useCorrectionGrid Hook

Description générale

useCorrectionGrid est un hook spécialisé qui génère les lignes d’une grille de correction en mode lecture seule (pas de saisie). Il se base sur useGrid pour découper les données sans activer le mode input.

Fonctionnalités clés

Reçoit un tableau inputs contenant les réponses saisies par l’utilisateur.

Appelle useGrid(inputs, cols, 1, false) :

grouping = 1 pour ne pas regrouper plusieurs valeurs par segment.

inputMode = false pour le mode lecture seule.

Retourne uniquement la matrice rows des valeurs, prête à être affichée.

Hérite de la logique de découpage en grille de useGrid sans exposer l’édition des cellules.

Signature

function useCorrectionGrid(
  inputs: string[],
  cols: number
): string[][]

Paramètres :

inputs (string[]) : tableau des réponses à afficher.

cols (number) : nombre de colonnes de la grille.

Retourne :

rows (string[][]) : matrice des réponses organisées par lignes.

Code commenté

export default function useCorrectionGrid(inputs, cols) {
  // Utilise useGrid en mode lecture seule et sans regroupement
  const { rows } = useGrid(
    inputs,
    cols,
    1,      // grouping = 1
    false   // inputMode = false
  )
  // Ne retourne que la matrice rows, pas les setters ni autres données
  return rows
}

Relation avec useGrid

useCorrectionGrid est un wrapper de useGrid, qui fixe grouping à 1 et inputMode à false, simplifiant l’usage pour les grilles de correction.

Exemple d’utilisation