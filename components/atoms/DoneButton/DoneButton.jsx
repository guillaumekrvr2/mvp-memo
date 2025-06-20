//components/DoneButton/DoneButton.jsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import styles from './styles'

export default function DoneButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.done}>Done</Text>
    </TouchableOpacity>
  )
}
