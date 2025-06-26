// components/atoms/ProgressBar/styles.js
import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
  height: ${({ theme }) => theme.spacing.xs}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => `${theme.spacing.xs / 2}px`};
  overflow: hidden;
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const Bar = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.textOnDark};
`;
