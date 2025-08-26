// screens/memo/Spoken/SpokenMemoScreen/styles.js
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`

export const ContentWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`

export const MicrophoneContainer = styled.View`
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

export const MicrophoneIcon = styled.Text`
  font-size: 80px;
  text-align: center;
`

export const InstructionText = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
  opacity: 0.9;
  max-width: 280px;
  line-height: ${({ theme }) => (theme.typography.size.lg * 1.4)}px;
`

export const ValidateButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.xxl}px;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 6;
`

export const ValidateButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  text-align: center;
`

export const CurrentDigit = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.size.xxxl || 96}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  text-align: center;
`

export const StartButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.success || theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.xxl}px;
  border-radius: ${({ theme }) => theme.border.radiusLg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  shadow-color: ${({ theme }) => theme.colors.success || theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 6;
`

export const StartButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  text-align: center;
`

export const PlayingIndicator = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`

export const PlayingText = styled.Text`
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  text-align: center;
  opacity: 0.7;
`