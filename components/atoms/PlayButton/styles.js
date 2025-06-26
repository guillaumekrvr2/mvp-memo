// components/atoms/PlayButton/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.textOnLight};
`;