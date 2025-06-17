// src/components/atoms/MenuButton/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  background-color: ${({ theme, isActive }) =>   isActive     ? theme.colors.primary       /* ou theme.colors.surfaceActive si tu en as */     : theme.colors.surface}; border: ${({ theme, isActive }) =>   `${theme.border.width}px solid ${     isActive       ? theme.colors.primary     /* idem, couleur du bord actif */       : theme.colors.borderOnDark   }`};
  border-radius: ${({ theme }) => theme.border.radius}px;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.sm}px;
`;

export const Label = styled.Text`
 color: ${({ theme, isActive }) =>
   isActive
     ? theme.colors.textOnLight    /* couleur du texte quand actif */
     : theme.colors.textOnDark};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  font-size: ${({ theme }) => theme.typography.size.md}px;
`;
