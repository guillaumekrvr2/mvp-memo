// components/atoms/CorrectionCell/CorrectionCell.jsx
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export function CorrectionCell({
  value,
  correctValue,
  isRevealed,
  onReveal,
  disabled
}) {
  const isCorrect = value === correctValue;
  const display = isCorrect || isRevealed ? correctValue : value;

  return (
    <TouchableOpacity
      style={[
        styles.touchable,
        isCorrect && styles.correctTouchable
      ]}
      disabled={isCorrect || disabled}
      onPress={onReveal}
    >
      <Text style={[
        styles.cellText,
        isCorrect && styles.correctText
      ]}>
        {display}
      </Text>
    </TouchableOpacity>
  );
}