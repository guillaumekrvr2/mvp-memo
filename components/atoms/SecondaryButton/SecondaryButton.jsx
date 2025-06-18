///components/atoms/SecondaryButton/SecondaryButton.jsx
import React from 'react';
import * as S from './styles';

export function SecondaryButton({ variant = 'primary', children, ...props }) {
  return (
    <S.Container variant={variant} {...props}>
      <S.Label variant={variant}>{children}</S.Label>
    </S.Container>
  );
}
