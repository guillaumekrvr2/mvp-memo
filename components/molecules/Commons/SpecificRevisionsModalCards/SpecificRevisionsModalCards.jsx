// components/molecules/Commons/SpecificRevisionsModalCards/SpecificRevisionsModalCards.jsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
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

const cardValues = [
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: 'Valet' },
  { value: 12, label: 'Dame' },
  { value: 13, label: 'Roi' },
  { value: 14, label: 'As' }
];

export default function SpecificRevisionsModalCards({
  visible,
  fromValue,
  toValue,
  onFromValueChange,
  onToValueChange,
  onClose,
  onConfirm,
  title = "Révisions spécifiques"
}) {
  const [tempFromValue, setTempFromValue] = useState(fromValue || 2);
  const [tempToValue, setTempToValue] = useState(toValue || 14);
  const [selectedSuits, setSelectedSuits] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Synchroniser les valeurs temporaires quand la modal s'ouvre
  useEffect(() => {
    if (visible) {
      setTempFromValue(fromValue || 2);
      setTempToValue(toValue || 14);
      setSelectedSuits([]);
      setShowFromDropdown(false);
      setShowToDropdown(false);
    }
  }, [visible, fromValue, toValue]);

  const handleOk = () => {
    // Vérifier qu'au moins une couleur est sélectionnée
    if (selectedSuits.length === 0) {
      Alert.alert(
        'Erreur',
        'Sélectionne au moins une couleur !',
        [{ text: 'OK' }]
      );
      return;
    }

    const filterParams = {
      fromValue: tempFromValue,
      toValue: tempToValue,
      selectedSuits: selectedSuits
    };

    onFromValueChange(tempFromValue);
    onToValueChange(tempToValue);
    
    if (onConfirm) {
      onConfirm(filterParams);
    }
    
    onClose();
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

  const getCardLabel = (value) => {
    const card = cardValues.find(c => c.value === value);
    return card ? card.label : value.toString();
  };

  const handleFromSelect = (value) => {
    setTempFromValue(value);
    setShowFromDropdown(false);
  };

  const handleToSelect = (value) => {
    setTempToValue(value);
    setShowToDropdown(false);
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
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowFromDropdown(!showFromDropdown)}
              >
                <Text style={styles.dropdownText}>{getCardLabel(tempFromValue)}</Text>
                <Text style={styles.dropdownArrow}>{showFromDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showFromDropdown && (
                <View style={styles.dropdownList}>
                  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {cardValues.map((card) => (
                      <TouchableOpacity
                        key={card.value}
                        style={[
                          styles.dropdownItem,
                          tempFromValue === card.value && styles.dropdownItemSelected
                        ]}
                        onPress={() => handleFromSelect(card.value)}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          tempFromValue === card.value && styles.dropdownItemTextSelected
                        ]}>
                          {card.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>À</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowToDropdown(!showToDropdown)}
              >
                <Text style={styles.dropdownText}>{getCardLabel(tempToValue)}</Text>
                <Text style={styles.dropdownArrow}>{showToDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showToDropdown && (
                <View style={styles.dropdownList}>
                  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {cardValues.map((card) => (
                      <TouchableOpacity
                        key={card.value}
                        style={[
                          styles.dropdownItem,
                          tempToValue === card.value && styles.dropdownItemSelected
                        ]}
                        onPress={() => handleToSelect(card.value)}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          tempToValue === card.value && styles.dropdownItemTextSelected
                        ]}>
                          {card.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
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
  onConfirm: PropTypes.func,
  title: PropTypes.string,
};