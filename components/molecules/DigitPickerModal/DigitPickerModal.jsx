import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
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
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>Choisir le nombre de chiffres</Text>
          <Picker
            selectedValue={digitCount}
            onValueChange={onValueChange}
            style={styles.picker}
            dropdownIconColor="#fff"
            itemStyle={{ color: '#fff' }}
          >
            {items.map(n => (
              <Picker.Item key={n} label={`${n}`} value={n} />
            ))}
          </Picker>
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
