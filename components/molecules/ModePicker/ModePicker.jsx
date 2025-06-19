import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import S from './styles';

export function ModePicker({
  variant = 'community',
  selectedValue,
  onValueChange,
  options = [],
}) {
  const isCommunity = variant === 'community';

  return (
    <View style={[
      S.wrapper,
      isCommunity ? S.wrapperCommunity : S.wrapperNumbers
    ]}>
      {isCommunity && <Text style={S.label}>Leaderboard</Text>}

      <RNPickerSelect
        onValueChange={onValueChange}
        value={selectedValue}
        items={options}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug={true}

        style={{
          viewContainer: isCommunity 
            ? S.viewContainerCommunity 
            : S.viewContainerNumbers,
          inputAndroid: isCommunity 
            ? S.inputAndroidCommunity 
            : S.inputAndroidNumbers,
          inputIOS: isCommunity 
            ? S.inputIOSCommunity 
            : S.inputIOSNumbers,
          iconContainer: isCommunity 
            ? S.iconContainerCommunity 
            : S.iconContainerNumbers,
        }}

        // pour agrandir encore le toucher si besoin
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
