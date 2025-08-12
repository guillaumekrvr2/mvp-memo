// components/molecules/DigitPickerModal/DigitPickerModal.jsx
import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles';

export default function DigitPickerModal({
  visible,
  digitCount,
  onValueChange,
  onClose,
  title = "Choisir le nombre de chiffres à afficher", // 🎯 Titre personnalisable
  min = 1, // 🎯 Valeur minimum personnalisable
  max = 6, // 🎯 Valeur maximum personnalisable (ancien maxDigits)
}) {
  // 🎯 Génération dynamique des options selon min/max
  const items = Array.from({ length: max - min + 1 }, (_, i) => i + min)

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* 🎯 Titre personnalisé */}
          <Text style={styles.title}>{title}</Text>

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
  title: PropTypes.string, // 🎯 Nouveau prop pour personnaliser le titre
  min: PropTypes.number, // 🎯 Nouveau prop pour la valeur minimum
  max: PropTypes.number, // 🎯 Nouveau prop pour la valeur maximum (remplace maxDigits)
}