// components/atoms/HighlightBox/styles.js
import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: center;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  border-width: ${({ theme }) => theme.border.width}px;
  border-color: ${({ theme }) => theme.colors.textOnDark};
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

export const HighlightText = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;