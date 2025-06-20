//components/atoms/HighlightBox/HighlightBox.jsx
import { View, Text } from 'react-native'
import styles from './styles'

/**
 * HighlightBox affiche un encadré avec un texte mis en avant.
 * @param {string} text - Les chiffres ou le contenu à afficher.
 */
export default function HighlightBox({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}