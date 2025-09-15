// components/molecules/Commons/DigitPickerModalBinaries/DigitPickerModalBinaries.jsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

// Options pour les colonnes (1-6)
const columnOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' }
];

// Options pour les lignes (1-3)
const rowOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
];

export default function DigitPickerModalBinaries({
  visible,
  columns,
  rows,
  onColumnsChange,
  onRowsChange,
  onClose,
  onConfirm,
  title = "Matrice des binaires"
}) {
  const [tempColumns, setTempColumns] = useState(columns || 3);
  const [tempRows, setTempRows] = useState(rows || 2);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);

  // Synchroniser les valeurs temporaires quand la modal s'ouvre
  useEffect(() => {
    if (visible) {
      setTempColumns(columns || 3);
      setTempRows(rows || 2);
      setShowColumnsDropdown(false);
      setShowRowsDropdown(false);
    }
  }, [visible, columns, rows]);

  const handleOk = () => {
    const matrixParams = {
      columns: tempColumns,
      rows: tempRows
    };

    onColumnsChange(tempColumns);
    onRowsChange(tempRows);
    
    if (onConfirm) {
      onConfirm(matrixParams);
    }
    
    onClose();
  };

  const handleColumnsSelect = (value) => {
    setTempColumns(value);
    setShowColumnsDropdown(false);
  };

  const handleRowsSelect = (value) => {
    setTempRows(value);
    setShowRowsDropdown(false);
  };

  const getLabel = (value, options) => {
    const option = options.find(o => o.value === value);
    return option ? option.label : value.toString();
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

          <Text style={styles.subtitle}>
            Choisissez les dimensions de la matrice d'affichage
          </Text>

          <View style={styles.fieldsContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Colonnes</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowColumnsDropdown(!showColumnsDropdown)}
              >
                <Text style={styles.dropdownText}>{getLabel(tempColumns, columnOptions)}</Text>
                <Text style={styles.dropdownArrow}>{showColumnsDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showColumnsDropdown && (
                <View style={styles.dropdownList}>
                  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {columnOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.dropdownItem,
                          tempColumns === option.value && styles.dropdownItemSelected
                        ]}
                        onPress={() => handleColumnsSelect(option.value)}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          tempColumns === option.value && styles.dropdownItemTextSelected
                        ]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Lignes</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowRowsDropdown(!showRowsDropdown)}
              >
                <Text style={styles.dropdownText}>{getLabel(tempRows, rowOptions)}</Text>
                <Text style={styles.dropdownArrow}>{showRowsDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {showRowsDropdown && (
                <View style={styles.dropdownList}>
                  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {rowOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.dropdownItem,
                          tempRows === option.value && styles.dropdownItemSelected
                        ]}
                        onPress={() => handleRowsSelect(option.value)}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          tempRows === option.value && styles.dropdownItemTextSelected
                        ]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
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

DigitPickerModalBinaries.propTypes = {
  visible: PropTypes.bool.isRequired,
  columns: PropTypes.number,
  rows: PropTypes.number,
  onColumnsChange: PropTypes.func.isRequired,
  onRowsChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
};