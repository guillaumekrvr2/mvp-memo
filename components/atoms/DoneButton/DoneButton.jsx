// components/atoms/DoneButton/DoneButton.jsx
import * as S from './styles';

export default function DoneButton({ onPress }) {
  return (
    <S.Container onPress={onPress} activeOpacity={0.7}>
      <S.Label>Done</S.Label>
    </S.Container>
  );
}