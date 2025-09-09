import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

// Styles classiques pour CardsCorrectionScreen
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  }
})

// Styled Components avec charte graphique de l'app
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0a0a0a;
`

export const ContentScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 40px;
  padding-horizontal: 24px;
`

export const ResultsCard = styled.View`
  align-items: center;
  margin-bottom: 16px;
  padding: 32px;
  background-color: #1e1e2e;
  border-radius: 20px;
  border-width: 1px;
  border-color: #2a2a3e;
  shadow-color: #667eea;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
`

export const ResultsTitle = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
`

export const ScoreContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const ScoreText = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
`

export const AccuracyBadge = styled.View`
  background-color: ${props => 
    props.accuracy >= 80 ? '#43e97b' : 
    props.accuracy >= 60 ? '#fa709a' : 
    '#ff4757'
  };
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 50px;
`

export const AccuracyText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`

export const HintCard = styled.View`
  background-color: #2a2a3e;
  border-radius: 16px;
  border-width: 1px;
  border-color: #667eea40;
  padding: 16px;
  margin-bottom: 12px;
  align-items: center;
`

export const HintText = styled.Text`
  color: #a0a9c0;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  line-height: 20px;
`

export const CarouselSection = styled.View`
  flex: 1;
  min-height: 300px;
  margin-bottom: 32px;
`

export const InstructionsCard = styled.View`
  background-color: #2a2a3e;
  border-radius: 20px;
  border-width: 1px;
  border-color: #4ecdc440;
  padding: 24px;
  margin-bottom: 32px;
`

export const InstructionItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

export const SuccessIndicator = styled.Text`
  color: #43e97b;
  font-size: 20px;
  font-weight: 700;
  margin-right: 16px;
  width: 20px;
`

export const ErrorIndicator = styled.Text`
  color: #ff4757;
  font-size: 20px;
  font-weight: 700;
  margin-right: 16px;
  width: 20px;
`

export const InstructionText = styled.Text`
  color: #a0a9c0;
  font-size: 16px;
  font-weight: 500;
`

export const ButtonSection = styled.View`
  align-items: center;
  margin-top: -15px;
`

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0a0a0a;
`

export const ErrorText = styled.Text`
  color: #ff4757;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`