// components/molecules/ModePicker/ModePicker.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import S from './styles';

export function ModePicker({
  variant = 'community',    // 'community' ou 'numbers'
  selectedValue,
  onValueChange,
  options = [],            // [{ key, label }]
}) {
  const isCommunity = variant === 'community';

  return (
    <View style={[ S.wrapper, isCommunity ? S.wrapperCommunity : S.wrapperNumbers ]}>
      {isCommunity && <Text style={S.label}>Leaderboard</Text>}
      <View style={isCommunity ? S.containerCommunity : S.containerNumbers}>
        <Picker
          selectedValue={selectedValue}
          style={isCommunity ? S.pickerCommunity : S.pickerNumbers}
          dropdownIconColor="#fff"
          onValueChange={onValueChange}
        >
          {options.map(opt => (
            <Picker.Item key={opt.key} label={opt.label} value={opt.key} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
