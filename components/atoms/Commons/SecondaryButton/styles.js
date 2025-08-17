// components/atoms/SecondaryButton/styles.js
import styled, { css } from 'styled-components/native';

const variants = {
  primary: css`
    background-color: #4ecdc4; /* Couleur accent moderne */
    border-width: 1px;
    border-color: #4ecdc4;
    /* Ombre cyan pour effet moderne */
    shadow-color: #4ecdc4;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.2;
    shadow-radius: 8px;
    elevation: 6;
  `,
  secondary: css`
    background-color: #2a2a3e; /* Fond moderne cohérent */
    border-width: 1px;
    border-color: #3a3a4e; /* Bordure subtile */
    /* Ombre subtile */
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    elevation: 3;
  `,
  outline: css`
    background-color: transparent;
    border-width: 1px;
    border-color: #4ecdc4; /* Bordure cyan */
  `,
  ghost: css`
    background-color: transparent;
    border-width: 0px;
  `,
  google: css`
    background-color: #ffffff;
    border-width: 1px;
    border-color: #dadce0;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    elevation: 3;
  `
};

export const Container = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 14px 24px; /* Padding plus généreux */
  border-radius: 12px; /* Border radius moderne cohérent */
  align-self: center;
  align-items: center;
  min-width: 120px; /* Largeur minimale pour cohérence */
  ${({ variant }) => variants[variant] || variants.secondary}
`;

export const Label = styled.Text`
  font-size: 15px; /* Taille cohérente avec les autres composants */
  font-weight: 600; /* Weight moderne */
  letter-spacing: 0.3px; /* Espacement moderne */
  color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#ffffff'; /* Texte blanc sur fond cyan */
      case 'outline':
        return '#4ecdc4'; /* Texte cyan pour outline */
      case 'ghost':
        return '#a0a9c0'; /* Texte gris pour ghost */
      case 'google':
        return '#1f1f1f'; /* Texte foncé pour Google */
      default:
        return '#a0a9c0'; /* Texte gris moderne pour secondary */
    }
  }};
`;