// src/components/atoms/MenuButton/MenuButton.jsx
import React from 'react';
import * as S from './styles';

export function MenuButton({ label, isActive = false, onPress }) {
  return (
    <S.Container isActive={isActive} onPress={onPress}>
      <S.Label isActive={isActive}>{label}</S.Label>
    </S.Container>
  );
}