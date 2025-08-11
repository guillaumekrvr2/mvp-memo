// components/molecules/RecallCell/RecallCell.jsx
import React, { memo } from 'react'
import InputCell from '../../atoms/InputCell/InputCell'
import useCellHandlers from '../../../hooks/useCellHandlers'

// Mémoiser le composant avec une comparaison personnalisée
const RecallCell = memo(function RecallCell({
  row,
  col,
  cols,
  objectif,
  values,
  setCellValue,
  inputRefs,
  style,
}) {
  const idx = row * cols + col
  const cellValue = values[idx] || ''

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
    <InputCell
      ref={inputRefs[idx]}  // Accès direct sans .current
      value={cellValue}
      style={style}
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
    />
  )
}, (prevProps, nextProps) => {
  // Comparaison personnalisée pour éviter les re-renders inutiles
  const prevIdx = prevProps.row * prevProps.cols + prevProps.col
  const nextIdx = nextProps.row * nextProps.cols + nextProps.col
  
  // Ne re-render que si la valeur de CETTE cellule a changé
  return (
    prevProps.values[prevIdx] === nextProps.values[nextIdx] &&
    prevProps.row === nextProps.row &&
    prevProps.col === nextProps.col &&
    prevProps.cols === nextProps.cols &&
    prevProps.objectif === nextProps.objectif
  )
})

export default RecallCell