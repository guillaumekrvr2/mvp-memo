// components/atoms/HighlightBoxSetter/HighlightBoxSetter.jsx
import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

export default function HighlightBoxSetter({
  label,
  icon,
  onPress,
  style,
  textStyle
}) {
  return (
    <S.Container style={style} onPress={onPress} activeOpacity={0.7}>
      <S.Label style={textStyle}>{label}</S.Label>
      {icon}
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
