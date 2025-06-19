// components/DigitPickerModal.jsx
import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles';

export default function DigitPickerModal({
  visible,
  digitCount,
  onValueChange,
  onClose,
  maxDigits = 6,
}) {
  const items = Array.from({ length: maxDigits }, (_, i) => i + 1)

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>Choisir le nombre de chiffres à afficher</Text>

          <View style={styles.grid}>
            {items.map(n => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.digitButton,
                  digitCount === n && styles.digitButtonActive
                ]}
                onPress={() => onValueChange(n)}
              >
                <Text
                  style={[
                    styles.digitText,
                    digitCount === n && styles.digitTextActive
                  ]}
                >
                  {n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

DigitPickerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  digitCount: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  maxDigits: PropTypes.number,
}