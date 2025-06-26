// components/atoms/BorderedContainer/BorderedContainer.jsx
import React from 'react';
import Container from './styles';

export default function BorderedContainer({ children, onLayout }) {
  return (
    <Container onLayout={onLayout}>
      {children}
    </Container>
  );
}
