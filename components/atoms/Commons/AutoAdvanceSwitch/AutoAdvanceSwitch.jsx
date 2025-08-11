// components/atoms/AutoAdvanceSwitch/AutoAdvanceSwitch.jsx
import React from 'react';
import * as S from './styles';

export default function AutoAdvanceSwitch({ enabled, onToggle }) {
  return (
    <S.Container>
      <S.Label>Auto-advance mode</S.Label>
      <S.StyledSwitch
        value={enabled}
        onValueChange={onToggle}
      />
    </S.Container>
  );
}
