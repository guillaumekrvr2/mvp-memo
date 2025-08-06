// src/components/atoms/MenuButton/MenuButton.jsx
import React from 'react'
import { 
  Container, 
  EmojiContainer, 
  Emoji, 
  Content, 
  Label, 
  Description,
  Arrow,
  ArrowText 
} from './styles'

export function MenuButton({ 
  label, 
  onPress, 
  emoji = '🎯', 
  color = '#667eea', 
  description,
  isActive = false 
}) {
  return (
    <Container 
      onPress={onPress} 
      color={color} 
      isActive={isActive}
      activeOpacity={0.7}
    >
      <EmojiContainer color={color}>
        <Emoji>{emoji}</Emoji>
      </EmojiContainer>
      
      <Content>
        <Label isActive={isActive} color={color}>
          {label}
        </Label>
        {description && (
          <Description>{description}</Description>
        )}
      </Content>
      
      <Arrow color={color}>
        <ArrowText color={color}>→</ArrowText>
      </Arrow>
    </Container>
  )
}