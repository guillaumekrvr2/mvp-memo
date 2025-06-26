// components/atoms/CorrectionCell/CorrectionCell.jsx
import React from 'react';
import * as S from './styles';

export function CorrectionCell({
  value,
  correctValue,
  isRevealed,
  onReveal,
  disabled
}) {
  const isCorrect = value === correctValue;
  const display = isCorrect || isRevealed ? correctValue : value;

  return (
    <S.Touchable
      isCorrect={isCorrect}
      disabled={isCorrect || disabled}
      onPress={onReveal}
    >
      <S.CellText isCorrect={isCorrect}>
        {display}
      </S.CellText>
    </S.Touchable>
  );
}