// hooks/useCorrectionGrid.js
import useGrid from './useGrid';

/**
 * Hook pour la grille de correction (mode non-input)
 * @param {string[]} inputs   Tableau des réponses saisies
 * @param {number}   cols     Nombre de colonnes de la grille
 */
export default function useCorrectionGrid(inputs, cols) {
  // grouping = 1 car on ne regroupe pas plusieurs cellules pour l'affichage
  const { rows } = useGrid(inputs, cols, 1 /* grouping */, false /* inputMode */);
  return rows;
}
