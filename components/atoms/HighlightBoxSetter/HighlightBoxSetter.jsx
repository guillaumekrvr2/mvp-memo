// components/atoms/HighlightBoSetter/HighlightBoxSetter.jsx
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

export default function HighlightBoxSetter({
  label,
  icon,
  onPress,
  style,
  textStyle
}) {
  return (
    <TouchableOpacity style={[styles.box, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
      {icon}
    </TouchableOpacity>
  )
}

HighlightBoxSetter.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object
}
