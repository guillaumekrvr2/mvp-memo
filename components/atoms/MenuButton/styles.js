// src/components/atoms/MenuButton/styles.js
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  background-color: #1e1e2e;
  border-radius: 16px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #2a2a3e;
  border-left-width: 4px;
  border-left-color: ${({ color }) => color || '#667eea'};
  margin-vertical: 6px;
  shadow-color: ${({ color }) => color || '#667eea'};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
  ${({ isActive, color }) => isActive && `
    background-color: ${color}20;
    border-color: ${color};
  `}
`

export const EmojiContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  background-color: ${({ color }) => color || '#667eea'}20;
`

export const Emoji = styled.Text`
  font-size: 24px;
`

export const Content = styled.View`
  flex: 1;
`

export const Label = styled.Text`
  color: ${({ theme, isActive, color }) =>
    isActive ? color || '#667eea' : theme?.colors?.textOnDark || '#ffffff'};
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 4px;
`

export const Description = styled.Text`
  color: #a0a9c0;
  font-size: 14px;
`

export const Arrow = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ color }) => color || '#667eea'}20;
  justify-content: center;
  align-items: center;
`

export const ArrowText = styled.Text`
  color: ${({ color }) => color || '#667eea'};
  font-size: 18px;
  font-weight: 600;
`