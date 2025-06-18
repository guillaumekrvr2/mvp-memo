// components/molecules/FeatureItem/styles.js
import styled from 'styled-components/native';
import { theme } from '../../../theme';
import spacing from '../../../theme/spacing';

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  margin-bottom: ${spacing.md}px;
`;

export const Icon = styled.Image`
  width: 80px;
  height: 80px;
  margin-bottom: ${spacing.sm}px;
`;

export const Label = styled.Text`
  color: ${theme.colors.textOnDark};
  font-size: ${theme.typography.size.md}px;
  text-align: center;
`;

export const Highlight = styled.Text`
  font-weight: ${theme.typography.weight.bold};
`;