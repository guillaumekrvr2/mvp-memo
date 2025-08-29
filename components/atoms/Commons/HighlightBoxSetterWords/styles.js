// components/atoms/Commons/HighlightBoxSetterWords/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: #2a2a3e; /* Fond moderne cohérent */
  border-width: 1px;
  border-color: #3a3a4e; /* Bordure subtile */
  border-radius: 12px; /* Border radius moderne */
  padding: 20px 24px; /* Padding généreux */
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Label = styled.Text`
  color: #ffffff; /* Texte principal blanc */
  font-size: 20px; /* Taille adaptée aux mots (plus petite que les chiffres) */
  font-weight: 600; /* Semi-bold pour les mots */
  letter-spacing: 1px; /* Espacement modéré pour la lisibilité */
  flex: 1;
  text-align: center;
  align-self: center; /* Centrage vertical supplémentaire */
  line-height: 24px; /* Hauteur de ligne pour meilleur alignement */
  
  /* Ombre de texte pour profondeur */
  text-shadow-color: rgba(255, 255, 255, 0.1);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 2px;
`;

export const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #667eea20; /* Fond bleu transparent pour Words */
  border-width: 1px;
  border-color: #667eea; /* Bordure bleue accent pour Words */
  justify-content: center;
  align-items: center;
  
  /* Glow effect pour l'icône */
  shadow-color: #667eea;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 4;
`;