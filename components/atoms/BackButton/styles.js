// components/atoms/BackButton/styles.js
import styled, { css } from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  
  ${({ variant }) =>
    variant === 'circular' &&
    css`
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background-color: rgba(255, 255, 255, 0.1);
      border-width: 1px;
      border-color: rgba(255, 255, 255, 0.2);
    `}
    
  ${({ variant }) =>
    variant === 'minimal' &&
    css`
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background-color: transparent;
    `}
`

export const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  
  ${({ variant }) =>
    variant === 'circular' &&
    css`
      shadow-color: ${({ theme }) => theme.colors.primary};
      shadow-offset: 0px 2px;
      shadow-opacity: 0.1;
      shadow-radius: 4px;
      elevation: 2;
    `}
`