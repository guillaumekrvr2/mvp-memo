// components/atoms/Commons/SpecificRevisionsSelector/SpecificRevisionsSelector.jsx
import React from 'react';
import * as S from './styles';

export default function SpecificRevisionsSelector({ onPress }) {
  return (
    <S.Container onPress={onPress}>
      <S.Label>Révisions spécifiques</S.Label>
      <S.ChevronIcon name="chevron-down" size={20} />
    </S.Container>
  );
}