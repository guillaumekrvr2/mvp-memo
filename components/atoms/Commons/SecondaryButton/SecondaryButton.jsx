// components/atoms/SecondaryButton/SecondaryButton.jsx
import React from 'react';
import * as S from './styles';

export function SecondaryButton({ variant = 'secondary', children, ...props }) {
  return (
    <S.Container variant={variant} {...props} activeOpacity={0.8}>
      <S.Label variant={variant}>{children}</S.Label>
    </S.Container>
  );
}