// components/atoms/HighlightBoxSetter/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: ${({ theme }) => theme.border.width}px;
  border-color: ${({ theme }) => theme.colors.textOnDark};
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.xl}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;
