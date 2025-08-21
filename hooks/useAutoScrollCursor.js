// hooks/useAutoScrollCursor.js
import { useEffect } from 'react'

/**
 * Hook d'autoscroll basé sur la position du curseur dans un TextInput
 * @param {React.RefObject} scrollRef 
 * @param {number} scrollHeight Hauteur visible du container
 * @param {number} cursorPosition Position du curseur dans le texte
 * @param {number} cols Nombre de colonnes (pour calculer la ligne)
 * @param {number} lineHeight Hauteur d'une ligne de texte
 */
export default function useAutoScrollCursor(scrollRef, scrollHeight, cursorPosition, cols, lineHeight) {
  useEffect(() => {
    if (!scrollRef.current || scrollHeight === 0 || cursorPosition === null) return
    
    // Calcul de la ligne actuelle basée sur la position du curseur
    const currentLine = Math.floor(cursorPosition / cols)
    
    // Calcul du seuil de scroll - Plus agressif pour tenir compte du clavier
    const visibleLines = Math.floor(scrollHeight / lineHeight)
    const threshold = Math.max(0, visibleLines - 8) // Plus agressif que MemoScreen (était -3)
    
    // Si le curseur dépasse le seuil, on scroll vers le bas
    if (currentLine >= threshold) {
      const offset = (currentLine - threshold) * lineHeight
      scrollRef.current.scrollTo({ y: offset, animated: true })
    }
  }, [scrollRef, scrollHeight, cursorPosition, cols, lineHeight])
}