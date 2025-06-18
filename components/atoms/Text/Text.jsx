// components/atoms/Text/Text.jsx
import React from 'react';
import { StyledText } from './styles';

export function Text({
  variant = 'body',
  center = false,
  mt,
  mb,
  color,
  style,
  children,
  ...props
}) {
  return (
    <StyledText
      variant={variant}
      center={center}
      mt={mt}
      mb={mb}
      color={color}
      style={style}
      {...props}
    >
      {children}
    </StyledText>
  );
}
