// components/molecules/ModePicker/ModePicker.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import S from './styles';

export function ModePicker({
  variant = 'community',
  label,
  selectedValue,
  onValueChange,
  options = [],
}) {
  const isCommunity = variant === 'community';
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Pour la variante community, utilise le picker custom
  if (isCommunity) {
    // Trouver le label de l'option sélectionnée
    const selectedOption = options.find(opt => opt.value === selectedValue);
    const displayText = selectedOption?.label || 'Sélectionner';

    const handleOptionSelect = (value) => {
      onValueChange(value);
      setIsModalVisible(false);
    };

    return (
      <View style={S.wrapperCommunity}>
        {/* Label à gauche */}
        {label && <Text style={S.label}>{label}</Text>}

        {/* Picker custom à droite */}
        <TouchableOpacity
          style={S.customPickerContainer}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={S.customPickerText}>{displayText}</Text>
          <Ionicons 
            name="chevron-down" 
            size={16}                    // 🎯 Icône plus petite et discrète
            color="#a0a9c0"             // 🎯 Couleur assortie au texte
            style={S.customPickerIcon}
          />
        </TouchableOpacity>

        {/* Modal pour les options */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableOpacity
            style={S.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsModalVisible(false)}
          >
            <View style={S.modalContent}>
              <View style={S.modalHeader}>
                <Text style={S.modalTitle}>{label}</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={S.modalCloseButton}
                >
                  <Ionicons name="close" size={24} color="#a0a9c0" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      S.modalOption,
                      item.value === selectedValue && S.selectedOption
                    ]}
                    onPress={() => handleOptionSelect(item.value)}
                  >
                    <Text style={[
                      S.modalOptionText,
                      item.value === selectedValue && S.selectedOptionText
                    ]}>
                      {item.label}
                    </Text>
                    {item.value === selectedValue && (
                      <Ionicons name="checkmark" size={20} color="#4ecdc4" />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

  // Pour les autres variantes, garde l'ancien système
  return (
    <View style={[
      S.wrapper,
      S.wrapperNumbers
    ]}>
      <RNPickerSelect
        onValueChange={onValueChange}
        value={selectedValue}
        items={options}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug={true}

        style={{
          viewContainer: S.viewContainerNumbers,
          inputAndroid: S.inputAndroidNumbers,
          inputIOS: S.inputIOSNumbers,
          iconContainer: S.iconContainerNumbers,
        }}

        touchableWrapperProps={{
          hitSlop: { top: 8, bottom: 8, left: 8, right: 8 }
        }}

        Icon={() => (
          <Ionicons name="chevron-down" size={20} color="#fff" />
        )}
      />
    </View>
  );
}