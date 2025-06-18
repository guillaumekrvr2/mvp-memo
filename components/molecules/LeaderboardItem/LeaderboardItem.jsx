// components/molecules/LeaderboardItem/LeaderboardItem.jsx
import { View, Text } from 'react-native';
import styles from './styles';

export function LeaderboardItem({
  player,
  discipline,
  mode,
  disciplines, // on réinjecte le tableau pour le calcul “global”
}) {
  // ↳ logique de formatage du texte
  let text;
  if (discipline === 'global') {
    const total = disciplines
      .filter(d => d.key !== 'global')
      .reduce((sum, d) => {
        const rec = player.records?.[d.key]?.[mode];
        return sum + (rec?.score || 0);
      }, 0);
    text = `${total} pts`;
  } else {
    const recContainer = player.records?.[discipline];
    let rec;
    if (recContainer && typeof recContainer === 'object') {
      rec = recContainer[mode];
    }
    if (rec) {
      text = `${rec.score} en ${rec.time}s`;
    } else {
      const fallback = typeof recContainer === 'number' 
        ? recContainer 
        : 0;
      text = `${fallback} pts`;
    }
  }

  return (
    <View style={styles.row}>
      <Text style={styles.name}>
        {player.firstName} {player.lastName}
      </Text>
      <Text style={styles.score}>{text}</Text>
    </View>
  );
}
