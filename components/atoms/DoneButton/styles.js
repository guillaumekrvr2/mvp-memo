// components/atoms/DoneButton/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  /* Pas de margin ni padding par défaut,
     pour que ton layout (progress bar, etc.) ne bouge pas */
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;
