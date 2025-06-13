// styled-components/HomeStyles.js
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 40px;
`;

export const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
`;

export const MenuButton = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  background-color: #111;
  border-radius: 20px;
  border: 1px solid #fff;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

export const LearnMoreButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 12px 30px;
  background-color: #fff;
  border-radius: 20px;
  align-self: center;
  align-items: center;
`;

export const LearnMoreText = styled.Text`
  color: #000;
  font-weight: 600;
  font-size: 16px;
`;
