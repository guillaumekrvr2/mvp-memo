// components/atoms/Grid/styles.js
import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView.attrs(({ theme, contentContainerStyle }) => ({
  contentContainerStyle: [
    {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      alignItems: 'center',
    },
    contentContainerStyle,
  ],
  showsVerticalScrollIndicator: false,
}))``;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const CellContainer = styled.View``;