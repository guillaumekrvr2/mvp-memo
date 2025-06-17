// src/components/atoms/SecondaryButton/styles.js
import styled, { css } from 'styled-components/native';

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textOnLight};
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    /* si besoin border ou autre */
  `
};

export const Container = styled.TouchableOpacity`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  align-self: center;
  align-items: center;
  ${({ variant }) => variants[variant]}
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.textOnLight
      : theme.colors.textOnDark};
`;
