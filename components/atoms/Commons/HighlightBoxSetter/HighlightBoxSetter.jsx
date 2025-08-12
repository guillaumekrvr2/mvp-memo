// components/atoms/Commons/HighlightBoxSetter/HighlightBoxSetter.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import * as S from './styles';

export default function HighlightBoxSetter({
  label,
  icon,
  onPress,
  style,
  textStyle
}) {
  
  const handlePress = () => {
    console.log('🎯 HighlightBoxSetter pressed with label:', label)
    if (onPress) {
      onPress()
    }
  }

  return (
    <S.Container style={style} onPress={handlePress} activeOpacity={0.8}>
      <S.ContentWrapper>
        <S.Label style={textStyle}>{label}</S.Label>
        <S.IconContainer>
          {icon}
        </S.IconContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}

HighlightBoxSetter.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object
};