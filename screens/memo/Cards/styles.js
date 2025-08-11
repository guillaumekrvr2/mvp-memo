// screens/cards/CardsScreen/styles.js
import styled from 'styled-components/native'
import { TouchableOpacity, FlatList } from 'react-native'
import Animated from 'react-native-reanimated'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const DeckArea = styled.View`
  flex: 0.6;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`

export const DeckContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`

export const CardsStack = styled.View`
  position: relative;
  width: 200px;
  height: 280px;
  justify-content: center;
  align-items: center;
`

export const AnimatedCard = styled(Animated.View)`
  position: absolute;
  width: 200px;
  height: 280px;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  background-color: ${({ theme }) => theme.colors.surface};
  shadow-color: ${({ theme }) => theme.colors.shadow.dark};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.4;
  shadow-radius: 12px;
  elevation: 12;
  overflow: hidden;
`

export const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
`

export const CardsRow = styled(FlatList).attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
}))`
  flex: 0.4;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderOnDark};
`

export const CardThumbnailContainer = styled(TouchableOpacity)`
  width: 60px;
  height: 84px;
  margin-horizontal: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.border.radiusMd}px;
  border-width: ${({ isActive }) => isActive ? '2px' : '1px'};
  border-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.accent : theme.colors.borderOnDark};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  shadow-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.accent : theme.colors.shadow.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: ${({ isActive }) => isActive ? '0.4' : '0.1'};
  shadow-radius: 4px;
  elevation: ${({ isActive }) => isActive ? '6' : '2'};
  ${({ isActive }) => 
    isActive && `
      transform: scale(1.05);
    `}
`

export const CardThumbnailImage = styled.Image`
  width: 100%;
  height: 100%;
`