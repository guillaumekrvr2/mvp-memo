// components/molecules/ObjectiveTimePicker/ObjectiveTimePicker.jsx
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'
import InputField from '../../../atoms/Numbers/InputField/InputField'

export default function ObjectiveTimePicker({
  mode,
  objectif,
  onObjectifChange,
  temps,
  onTempsChange,
  // Nouvelles props pour IAM variants
  variants = [],
  selectedVariant,
  onVariantSelect,
  onVariantPickerOpen,
  disabled = false,
}) {
  const staticTimes = {
    'memory-league': '1 minute',
  }
  const staticLabel = staticTimes[mode]

  // Pour IAM, on affiche le variant sélectionné
  const getIAMDisplayText = () => {
    if (!selectedVariant) return 'Sélectionner...'
    const name = selectedVariant.label || selectedVariant.name
    return `${name}`
  }

  return (
    <View style={styles.row}>
      <View style={styles.inputBox}>
        <InputField
          style={styles.input}
          placeholder="Objectif"
          keyboardType="number-pad"
          value={objectif}
          onChangeText={onObjectifChange}
          editable={!disabled}
        />
      </View>

      {staticLabel ? (
        // Memory League : temps fixe
        <View style={styles.staticTimeBox}>
          <Text style={styles.staticTime}>{staticLabel}</Text>
        </View>
      ) : mode === 'iam' ? (
        // IAM : dropdown pour sélectionner le variant
        <TouchableOpacity 
          style={[styles.inputBox, styles.dropdownBox]}
          onPress={onVariantPickerOpen}
          disabled={disabled}
        >
          <Text style={[styles.dropdownText, !selectedVariant && styles.placeholderText]}>
            {getIAMDisplayText()}
          </Text>
          <Ionicons 
            name="chevron-down" 
            size={20} 
            color={disabled ? "#666" : "#fff"} 
          />
        </TouchableOpacity>
      ) : (
        // Custom : saisie libre du temps
        <View style={styles.inputBox}>
          <InputField
            style={styles.input}
            placeholder="Temps (s)"
            keyboardType="number-pad"
            value={temps?.toString() || ''}
            onChangeText={onTempsChange}
            editable={!disabled}
          />
        </View>
      )}
    </View>
  )
}