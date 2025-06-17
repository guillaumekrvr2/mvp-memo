//components/molecules/ModePicker/ModePicker.jsx
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import S from './styles';

export function ModePicker({
  label,
  selectedValue,
  onValueChange,
  options = [],      // [{ key, label }]
  pickerStyle,       // override Picker
}) {
  return (
    <View style={S.wrapper}>
      {label && <Text style={S.label}>{label}</Text>}
      <View style={S.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={[S.picker, pickerStyle]}
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
