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
  const isEmpty = !value || value.trim() === ''; // Cellule vide
  
  // Logique d'affichage :
  // - Si vide ou correct : toujours montrer la bonne réponse
  // - Si incorrect et pas révélé : montrer la mauvaise réponse de l'utilisateur  
  // - Si incorrect et révélé : montrer la bonne réponse
  const display = (isEmpty || isCorrect || isRevealed) ? correctValue : value;

  // Détermine le style selon l'état
  const getStyle = () => {
    if (isEmpty) return styles.emptyTouchable; // Neutre pour vide
    if (isCorrect) return styles.correctTouchable; // Vert sombre pour correct
    return styles.incorrectTouchable; // Rouge sombre pour incorrect
  };

  const getTextStyle = () => {
    if (isEmpty) return styles.emptyText;
    if (isCorrect) return styles.correctText;
    return styles.incorrectText;
  };

  return (
    <TouchableOpacity
      style={[styles.touchable, getStyle()]}
      disabled={isCorrect || disabled || isEmpty}
      onPress={onReveal}
    >
      <Text style={[styles.cellText, getTextStyle()]}>
        {display}
      </Text>
    </TouchableOpacity>
  );
}