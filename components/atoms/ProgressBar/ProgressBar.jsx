//components/atoms/ProgressBar/ProgressBar.jsx
import { View, Animated } from 'react-native'
import styles from './styles'

/**
 * @param {Animated.Value} progress  Valeur animée [0→1] gérée à l’extérieur
 */
export default function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  )
}
