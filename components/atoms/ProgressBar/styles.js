// components/atoms/ProgressBar/styles.js
import styled from 'styled-components/native'
import { Animated } from 'react-native'

export const Container = styled.View`
  flex: 1;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.15);
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
`

export const Bar = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.textOnDark};
  border-radius: 4px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.6;
  shadow-radius: 8px;
  elevation: 4;
`