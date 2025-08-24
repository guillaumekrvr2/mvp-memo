// components/screens/ArticleScreen/styles.js
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const HeroContainer = styled.View`
  height: 350px;
  position: relative;
  overflow: hidden;
`;

export const HeroImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

// ⚠️ SUPPRESSION DU HERO_OVERLAY - on va utiliser LinearGradient directement dans le composant
export const HeroOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ContentContainer = styled.View`
  flex: 1;
  background-color: #000;
  margin-top: -30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 30px;
  z-index: 1;
`;

export const TitleContainer = styled.View`
  padding-horizontal: 24px;
  margin-bottom: 24px;
`;

export const ArticleTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  line-height: 36px;
  margin-bottom: 16px;
`;

export const MetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ReadingTime = styled.Text`
  font-size: 14px;
  color: #a0a9c0;
  align-items: center;
`;

export const PublishDate = styled.Text`
  font-size: 14px;
  color: #a0a9c0;
  margin-left: 16px;
`;

export const BodyContainer = styled.View`
  padding-horizontal: 24px;
`;

export const BodyText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${props => {
    if (props.variant === 'h2') return '#fff';
    return '#e0e6ed';
  }};
  font-weight: ${props => {
    if (props.variant === 'h2') return 'bold';
    return 'normal';
  }};
  font-size: ${props => {
    if (props.variant === 'h2') return '20px';
    return '16px';
  }};
  margin-bottom: ${props => props.mb === 'md' ? '16px' : '0px'};
`;

export const Paragraph = styled.View`
  margin-bottom: 16px;
`;

export const CTAContainer = styled.View`
  padding-horizontal: 24px;
  padding-top: 32px;
  padding-bottom: 16px;
  align-items: center;
`;