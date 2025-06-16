// src/components/atoms/MenuButton/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.border.radius}px;
  border: ${({ theme }) => theme.border.width}px solid ${({ theme }) => theme.colors.borderOnDark};
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.sm}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  font-size: ${({ theme }) => theme.typography.size.md}px;
`;
