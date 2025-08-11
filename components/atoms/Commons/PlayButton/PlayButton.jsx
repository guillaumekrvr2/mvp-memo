// components/atoms/PlayButton/PlayButton.jsx
import React from 'react';
import * as Haptics from 'expo-haptics';
import * as S from './styles';

/**
 * Atomique : un simple bouton circulaire "PLAY" moderne.
 * - onPress : callback déclenché après vibration.
 * - label   : texte affiché (par défaut "PLAY").
 */
export default function PlayButton({ onPress, label = 'PLAY' }) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <S.Container onPress={handlePress} activeOpacity={0.8}>
      <S.InnerGlow>
        <S.Label>{label}</S.Label>
      </S.InnerGlow>
    </S.Container>
  );
}