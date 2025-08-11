// components/molecules/MemorizationHeader/styles.js
import styled from 'styled-components/native'

export const Header = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`