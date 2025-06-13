// components/MenuButton.jsx
import React from 'react';
import { MenuButton as Button, ButtonText } from '../styled-components/HomeStyles';

export function MenuButton({ label, onPress }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>{label}</ButtonText>
    </Button>
  );
}
