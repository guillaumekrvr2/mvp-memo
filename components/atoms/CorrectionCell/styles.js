// components/atoms/CorrectionCell/styles.js
import styled from 'styled-components/native';

export const Touchable = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isCorrect, theme }) => (isCorrect ? 'transparent' : theme.colors.surface)};
`;

export const CellText = styled.Text`
  color: ${({ isCorrect, theme }) => (isCorrect ? theme.colors.textOnDark : theme.colors.secondary)};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;