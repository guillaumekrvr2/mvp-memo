// components/molecules/Commons/DisciplineHeader/styles.js
import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const SafeArea = styled.View`
  background-color: rgba(10, 10, 10, 0.85);
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`

export const Container = styled.View`
  height: 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: ${Platform.OS === 'android' ? '20px' : '0px'};
`

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(0, 0, 0, 0);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  elevation: 1000;
`

export const Title = styled.Text`
  position: absolute;
  text-align: center;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-shadow-color: rgba(0, 0, 0, 0.7);
  text-shadow-offset: 0px 2px;
  text-shadow-radius: 4px;
`

export const ProfileButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.1);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  elevation: 1000;
`