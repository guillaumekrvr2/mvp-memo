// components/atoms/Commons/HighlightBoxSetterBinaries/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: #2a2a3e;
  border-width: 1px;
  border-color: #3a3a4e;
  border-radius: 12px;
  padding: 20px 24px;
  margin-top: 20px;
  margin-bottom: 16px;
  
  /* Ombre moderne subtile */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  
  /* Effet hover moderne */
  transform: scale(1);
`;

export const ContentWrapper = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const MatrixContainer = styled.View`
  align-items: center;
  justify-content: center;
  min-height: 32px;
  width: 100%;
`;

export const MatrixRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
`;

export const DigitText = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-horizontal: 2px;
  letter-spacing: 2px;
  
  /* Ombre de texte pour profondeur */
  text-shadow-color: rgba(255, 255, 255, 0.1);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 2px;
`;

export const IconContainer = styled.View`
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -20px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #7a4ecd20;
  border-width: 1px;
  border-color: #667eea;
  justify-content: center;
  align-items: center;
  
  /* Glow effect pour l'icône */
  shadow-color: #667eea;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 4;
`;