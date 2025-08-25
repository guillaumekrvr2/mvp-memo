// screens/common/styles.js
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`

export const CountdownWrapper = styled.View`
  align-items: center;
  width: 100%;
`

export const CountdownCircle = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  background-color: rgba(255, 255, 255, 0.05);
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 20px;
  elevation: 8;
`

export const CounterText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme, isReady }) => 
    isReady 
      ? theme.typography.size.xl || 32
      : theme.typography.size.xxxl || 96
  }px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  text-align: center;
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      transform: scale(0.8);
      opacity: 0.6;
    `}
`

export const ReadyText = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
  opacity: 0.8;
`

export const DetailsContainer = styled.View`
  width: 100%;
  max-width: 300px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  border-width: ${({ theme }) => theme.border.width}px;
  border-color: ${({ theme }) => theme.colors.textOnDark};
  background-color: rgba(255, 255, 255, 0.03);
`

export const DetailItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const DetailLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  opacity: 0.7;
`

export const DetailValue = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`

export const SkipButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 60px;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
`

export const SkipButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  opacity: 0.8;
`