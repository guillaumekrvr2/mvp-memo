// src/components/atoms/MenuButton/styles.js
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: ${({ isCarousel }) => (isCarousel ? '140px' : '140px')};
  height: ${({ isCarousel }) => (isCarousel ? '140px' : '140px')};
  margin: ${({ isCarousel, theme }) => (isCarousel ? '0px' : theme.spacing.sm + 'px')};
  
  /* Ajout de padding intérieur pour aérer le contenu */
  padding: ${({ isCarousel, theme }) =>
    isCarousel
      ? theme.spacing.sm + 'px'
      : theme.spacing.sm * 2 + 'px'
  };
  
  background-color: ${({ theme, isActive, isCarousel, color }) => {
    if (isActive && isCarousel && color) {
      return color + '20';
    }
    if (isActive) {
      return theme.colors.primary;
    }
    return theme.colors.surface;
  }};
  
  border-width: ${({ theme }) => theme.border?.width || 1}px;
  border-color: ${({ theme, isActive, isCarousel, color }) => {
    if (isActive && isCarousel && color) {
      return color;
    }
    if (isActive) {
      return theme.colors.primary;
    }
    return theme.colors.borderOnDark;
  }};
  border-style: solid;
  
  border-radius: ${({ theme }) => theme.border?.radius || 12}px;
  justify-content: center;
  align-items: center;
`;

export const EmojiContainer = styled.View`
  width: ${({ isCarousel }) => (isCarousel ? '36px' : '40px')};
  height: ${({ isCarousel }) => (isCarousel ? '36px' : '40px')};
  margin-bottom: ${({ isCarousel }) => (isCarousel ? '4px' : '8px')};
  border-radius: ${({ isCarousel }) => (isCarousel ? '18px' : '20px')};
  background-color: ${({ color, isCarousel }) => 
    color + (isCarousel ? '30' : '20')
  };
  justify-content: center;
  align-items: center;
`;

export const Emoji = styled.Text`
  font-size: ${({ isCarousel }) => (isCarousel ? '16px' : '20px')};
`;

export const Content = styled.View`
  align-items: center;
`;

export const Label = styled.Text`
  color: ${({ theme, isActive, isCarousel, color }) => {
    if (isActive && isCarousel && color) {
      return color;
    }
    if (isActive) {
      return theme.colors.textOnLight;
    }
    return theme.colors.textOnDark;
  }};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  font-size: ${({ theme, isCarousel }) => 
    (isCarousel 
      ? (theme.typography.size.sm || 12)
      : (theme.typography.size.md || 14)
    ) + 'px'
  };
  text-align: center;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary || '#a0a9c0'};
  font-size: ${({ theme }) => (theme.typography.size.xs || 10) + 'px'};
  text-align: center;
  margin-top: 4px;
`;
