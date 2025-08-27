// components/molecules/Commons/SpecificRevisionsModalCards/SpecificRevisionsModalCards.jsx
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

const suitSymbols = {
  spades: '♠',
  hearts: '♥', 
  diamonds: '♦',
  clubs: '♣'
};

const suitColors = {
  spades: '#000',
  hearts: '#ff4757',
  diamonds: '#ff6348',
  clubs: '#000'
};

export default function SpecificRevisionsModalCards({
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
  const [selectedSuits, setSelectedSuits] = useState([]);

  // Synchroniser les valeurs temporaires quand la modal s'ouvre
  useEffect(() => {
    if (visible) {
      setTempFromValue(fromValue?.toString() || '');
      setTempToValue(toValue?.toString() || '');
      setSelectedSuits([]);
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

  const handleSuitToggle = (suit) => {
    setSelectedSuits(prev => {
      if (prev.includes(suit)) {
        return prev.filter(s => s !== suit);
      } else {
        return [...prev, suit];
      }
    });
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
                placeholder="2"
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
                placeholder="As"
                placeholderTextColor="#666666"
                maxLength={6}
              />
            </View>
          </View>

          <View style={styles.suitsContainer}>
            {Object.keys(suitSymbols).map((suit) => (
              <TouchableOpacity
                key={suit}
                style={[
                  styles.suitButton,
                  selectedSuits.includes(suit) && styles.suitButtonSelected
                ]}
                onPress={() => handleSuitToggle(suit)}
              >
                <Text style={[
                  styles.suitSymbol,
                  { color: suitColors[suit] },
                  selectedSuits.includes(suit) && styles.suitSymbolSelected
                ]}>
                  {suitSymbols[suit]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.okButton} onPress={handleOk}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

SpecificRevisionsModalCards.propTypes = {
  visible: PropTypes.bool.isRequired,
  fromValue: PropTypes.number,
  toValue: PropTypes.number,
  onFromValueChange: PropTypes.func.isRequired,
  onToValueChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};