// src/components/atoms/MenuButton/MenuButton.jsx
import React from 'react';
import * as S from './styles';

export function MenuButton({ label, onPress }) {
  return (
    <S.Container onPress={onPress}>
      <S.Label>{label}</S.Label>
    </S.Container>
  );
}