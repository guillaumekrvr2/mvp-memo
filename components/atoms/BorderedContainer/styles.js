// components/atoms/BorderedContainer/styles.js
import styled from 'styled-components/native';

const Container = styled.View`
  width: 75%;
  height: 60%;
  align-self: center;
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  border-width: ${({ theme }) => theme.border.width}px;
  border-color: ${({ theme }) => theme.colors.textOnDark};
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  overflow: hidden;
`;

export default Container;
