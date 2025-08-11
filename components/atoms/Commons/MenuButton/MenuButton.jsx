// components/atoms/MenuButton/MenuButton.jsx
import React from 'react';
import { 
  Container, 
  EmojiContainer, 
  Emoji, 
  Content, 
  Label, 
  Description 
} from './styles';

export function MenuButton({ 
  label, 
  onPress, 
  emoji = '🎯', 
  color = '#667eea', 
  description,
  isActive = false,
  isCarousel = false,
  style // Pour les styles additionnels du parent
}) {
  return (
    <Container 
      onPress={onPress} 
      color={color} 
      isActive={isActive}
      isCarousel={isCarousel}
      activeOpacity={0.8}
      style={style}
    >
      <EmojiContainer color={color} isCarousel={isCarousel}>
        <Emoji isCarousel={isCarousel}>{emoji}</Emoji>
      </EmojiContainer>
      
      <Content isCarousel={isCarousel}>
        <Label isActive={isActive} color={color} isCarousel={isCarousel}>
          {label}
        </Label>
        {description && !isCarousel && (
          <Description>{description}</Description>
        )}
      </Content>
    </Container>
  );
}