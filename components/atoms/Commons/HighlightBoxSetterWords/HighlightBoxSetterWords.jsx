// components/atoms/Commons/HighlightBoxSetterWords/HighlightBoxSetterWords.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { previewWords } from '../../../../config/wordsConfig';
import * as S from './styles';

export default function HighlightBoxSetterWords({
  wordsCount = 1,
  icon,
  onPress,
  style,
  textStyle
}) {
  
  // 📝 Génère une sélection aléatoire de mots selon wordsCount
  const displayedWords = useMemo(() => {
    // Limite le nombre de mots entre 1 et 3
    const count = Math.min(Math.max(wordsCount, 1), 3);
    
    // Mélange les mots et prend les N premiers
    const shuffled = [...previewWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, count);
    
    // Joint avec le séparateur |
    return selectedWords.join(' | ');
  }, [wordsCount]);
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  }

  return (
    <S.Container style={style} onPress={handlePress} activeOpacity={0.8}>
      <S.ContentWrapper>
        <S.Label style={textStyle}>{displayedWords}</S.Label>
        <S.IconContainer>
          {icon}
        </S.IconContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}

HighlightBoxSetterWords.propTypes = {
  wordsCount: PropTypes.number.isRequired,
  icon: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object
};