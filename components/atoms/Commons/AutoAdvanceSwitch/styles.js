// components/atoms/AutoAdvanceSwitch/styles.js
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.size.md}px;
`;

export const StyledSwitch = styled.Switch.attrs(({ theme, value }) => ({
  // On peut ici utiliser les couleurs du thème ou des valeurs par défaut
  trackColor: {
    false: theme.colors.switchTrackFalse || '#767577',
    true: theme.colors.switchTrackTrue || theme.colors.primary,
  },
  thumbColor: value
    ? theme.colors.textOnDark
    : theme.colors.switchThumbFalse || '#f4f3f4',
  ios_backgroundColor: theme.colors.switchTrackFalse || '#767577',
}))``;