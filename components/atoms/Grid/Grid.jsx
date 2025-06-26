// components/atoms/Grid/Grid.jsx
import React from 'react';
import * as S from './styles';

export default function Grid({
  data,
  renderCell,
  scrollRef,
  contentContainerStyle,
}) {
  return (
    <S.ScrollContainer ref={scrollRef} contentContainerStyle={contentContainerStyle}>
      {data.map((row, rowIdx) => (
        <S.Row key={`row-${rowIdx}`}>
          {row.map((item, colIdx) => (
            <S.CellContainer key={`r${rowIdx}-c${colIdx}`}>
              {renderCell(item, rowIdx, colIdx)}
            </S.CellContainer>
          ))}
        </S.Row>
      ))}
    </S.ScrollContainer>
  );
}