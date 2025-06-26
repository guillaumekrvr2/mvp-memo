// components/atoms/HighlightBox/HighlightBox.jsx
import React from 'react';
import * as S from './styles';

/**
 * HighlightBox affiche un encadré avec un texte mis en avant.
 * @param {string} text - Les chiffres ou le contenu à afficher.
 */
export default function HighlightBox({ text }) {
  return (
    <S.Container>
      <S.HighlightText>{text}</S.HighlightText>
    </S.Container>
  );
}