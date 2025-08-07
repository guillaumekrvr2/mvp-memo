// components/atoms/DoneButton/styles.js
import styled, { css } from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  
  ${({ variant }) =>
    variant === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors.primary};
      shadow-color: ${({ theme }) => theme.colors.primary};
      shadow-offset: 0px 2px;
      shadow-opacity: 0.3;
      shadow-radius: 6px;
      elevation: 4;
    `}
    
  ${({ variant }) =>
    variant === 'minimal' &&
    css`
      background-color: transparent;
      border-width: 1px;
      border-color: rgba(255, 255, 255, 0.3);
    `}
    
  ${({ variant }) =>
    variant === 'ghost' &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
      border-width: 1px;
      border-color: rgba(255, 255, 255, 0.2);
    `}
`

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  
  ${({ variant }) =>
    variant === 'primary' &&
    css`
      color: ${({ theme }) => theme.colors.textOnLight};
    `}
    
  ${({ variant }) =>
    (variant === 'minimal' || variant === 'ghost') &&
    css`
      color: ${({ theme }) => theme.colors.textOnDark};
    `}
`