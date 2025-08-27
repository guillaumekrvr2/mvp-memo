// components/molecules/Commons/SpecificRevisionsModalNumbers/SpecificRevisionsModalNumbers.jsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function SpecificRevisionsModalNumbers({
  visible,
  fromValue,
  toValue,
  onFromValueChange,
  onToValueChange,
  onClose,
  title = "Révisions spécifiques"
}) {
  const [tempFromValue, setTempFromValue] = useState(fromValue?.toString() || '');
  const [tempToValue, setTempToValue] = useState(toValue?.toString() || '');

  // Synchroniser les valeurs temporaires quand la modal s'ouvre
  useEffect(() => {
    if (visible) {
      setTempFromValue(fromValue?.toString() || '');
      setTempToValue(toValue?.toString() || '');
    }
  }, [visible, fromValue, toValue]);

  const handleOk = () => {
    // Convertir en nombres et appeler les callbacks
    const fromNum = parseInt(tempFromValue, 10) || 0;
    const toNum = parseInt(tempToValue, 10) || 0;
    
    onFromValueChange(fromNum);
    onToValueChange(toNum);
    onClose();
  };

  const handleFromChange = (text) => {
    // Ne garder que les chiffres
    const numericValue = text.replace(/[^0-9]/g, '');
    setTempFromValue(numericValue);
  };

  const handleToChange = (text) => {
    // Ne garder que les chiffres
    const numericValue = text.replace(/[^0-9]/g, '');
    setTempToValue(numericValue);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.fieldsContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>De</Text>
              <TextInput
                style={styles.textInput}
                value={tempFromValue}
                onChangeText={handleFromChange}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#666666"
                maxLength={6}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>À</Text>
              <TextInput
                style={styles.textInput}
                value={tempToValue}
                onChangeText={handleToChange}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#666666"
                maxLength={6}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.okButton} onPress={handleOk}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

SpecificRevisionsModalNumbers.propTypes = {
  visible: PropTypes.bool.isRequired,
  fromValue: PropTypes.number,
  toValue: PropTypes.number,
  onFromValueChange: PropTypes.func.isRequired,
  onToValueChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};