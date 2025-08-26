// components/atoms/Commons/SpecificRevisionsSelector/styles.js
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.size.md}px;
`;

export const ChevronIcon = styled(Ionicons).attrs(({ theme }) => ({
  color: theme.colors.primary,
}))`
  justify-content: center;
  align-items: center;
`;