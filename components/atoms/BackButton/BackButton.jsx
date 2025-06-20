//components/atoms/BackButton.jsx
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="chevron-back-outline" size={28} color="#fff" />
    </TouchableOpacity>
  )
}
