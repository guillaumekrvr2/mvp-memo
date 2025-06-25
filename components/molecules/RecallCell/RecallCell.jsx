//components/molecules/RecallCell/RecallCell.jsx
import InputCellUI from '../../atoms/InputCell/InputCell'
import useCellHandlers from '../../../hooks/useCellHandlers'

export default function RecallCell({
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
    <InputCellUI
      ref={inputRefs.current[idx]}
      value={cellValue}
      style={style}
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
    />
  )
}
