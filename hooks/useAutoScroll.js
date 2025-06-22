// src/hooks/useAutoScroll.js
import { useEffect } from 'react'

/**
 * @param {React.RefObject} scrollRef 
 * @param {number} scrollHeight Hauteur visible
 * @param {number} index       Index de surbrillance
 * @param {number} rowHeight   Hauteur d’une ligne
 */
export default function useAutoScroll(scrollRef, scrollHeight, index, rowHeight) {
  useEffect(() => {
    if (!scrollRef.current || scrollHeight === 0) return
    const visibleCount = Math.floor(scrollHeight / rowHeight)
    const threshold = Math.max(0, visibleCount - 3)
    if (index >= threshold) {
      const offset = (index - threshold) * rowHeight
      scrollRef.current.scrollTo({ y: offset, animated: true })
    }
  }, [scrollRef, scrollHeight, index, rowHeight])
}
