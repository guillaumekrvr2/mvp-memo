// components/molecules/ObjectiveTimePicker/ObjectiveTimePicker.jsx
import { View, Text } from 'react-native'
import styles from './styles'
import InputField from '../../atoms/InputField/InputField'

export default function ObjectiveTimePicker({
  mode,
  objectif,
  onObjectifChange,
  temps,
  onTempsChange,
}) {
  const staticTimes = {
    'memory-league': '1 minute',
    iam: '5 minutes',
  }
  const staticLabel = staticTimes[mode]

  return (
    <View style={styles.row}>
      <View style={styles.inputBox}>
        <InputField
          style={styles.input}
          placeholder="Objectif"
          keyboardType="number-pad"
          value={objectif}
          onChangeText={onObjectifChange}
        />
      </View>

      {staticLabel ? (
        <View style={styles.staticTimeBox}>
          <Text style={styles.staticTime}>{staticLabel}</Text>
        </View>
      ) : (
        <View style={styles.inputBox}>
          <InputField
            style={styles.input}
            placeholder="Temps (s)"
            keyboardType="number-pad"
            value={temps > 0 ? String(temps) : ''}
            onChangeText={onTempsChange}
          />
        </View>
      )}
    </View>
  )
}
