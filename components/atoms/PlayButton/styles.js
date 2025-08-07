// components/atoms/PlayButton/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  background-color: #2a2a3e; /* Fond moderne sombre */
  border-width: 2px;
  border-color: #4ecdc4; /* Bordure cyan accent */
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  
  /* Ombre moderne avec l'accent cyan */
  shadow-color: #4ecdc4;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.3;
  shadow-radius: 16px;
  elevation: 12;
  
  /* Animation subtile au press */
  transform: scale(1);
`;

export const InnerGlow = styled.View`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: #1e1e2e; /* Fond intérieur plus sombre */
  border-width: 1px;
  border-color: #3a3a4e; /* Bordure subtile */
  justify-content: center;
  align-items: center;
  
  /* Effet de glow intérieur */
  shadow-color: #4ecdc4;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 6;
`;

export const Label = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #4ecdc4; /* Texte cyan accent */
  letter-spacing: 2px; /* Espacement moderne */
  text-transform: uppercase;
  
  /* Ombre de texte pour plus de profondeur */
  text-shadow-color: rgba(78, 205, 196, 0.3);
  text-shadow-offset: 0px 2px;
  text-shadow-radius: 4px;
`;