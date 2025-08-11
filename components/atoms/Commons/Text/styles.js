// components/atoms/Text/styles.js
import styled from 'styled-components/native';
import { theme } from '../../../../theme';
import typography from '../../../../theme/typography';
import spacing from '../../../../theme/spacing';

// Map semantic variants to design tokens
const VARIANT_STYLES = {
  h1: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.semibold,
    // Ensure lineHeight is >= fontSize to prevent clipping
    lineHeight: typography.size.xxl * 1.2,
  },
  h2: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    lineHeight: typography.lineHeight.md,
  },
  body: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    lineHeight: typography.lineHeight.md,
  },
  small: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular,
    lineHeight: typography.lineHeight.sm,
  }
};

export const StyledText = styled.Text`
  color: ${({ color }) => color || theme.colors.textOnDark};
  font-size: ${({ variant }) =>
    (VARIANT_STYLES[variant] || VARIANT_STYLES.body).fontSize}px;
  font-weight: ${({ variant }) =>
    (VARIANT_STYLES[variant] || VARIANT_STYLES.body).fontWeight};
  line-height: ${({ variant }) =>
    (VARIANT_STYLES[variant] || VARIANT_STYLES.body).lineHeight}px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  include-font-padding: false;
  ${({ mt }) => (mt ? `margin-top: ${spacing[mt]}px;` : '')}
  ${({ mb }) => (mb ? `margin-bottom: ${spacing[mb]}px;` : '')}
`;
