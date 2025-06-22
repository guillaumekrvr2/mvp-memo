import { View } from 'react-native'
import BackButton from '../../atoms/BackButton/BackButton'
import DoneButton from '../../atoms/DoneButton/DoneButton'
import styles from './styles'
import useProgressWithCallback from '../../../hooks/useProgressWithCallback'
import ProgressBar               from '../../../components/atoms/ProgressBar/ProgressBar'

export default function MemorizationHeader({ onBack, onDone, duration }) {
  const progress = useProgressWithCallback(duration, onDone)
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} />
      <ProgressBar progress={progress} />
      <DoneButton onPress={onDone} />
    </View>
  )
}