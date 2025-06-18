// AutoAdvanceSwitch.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const STORAGE_KEY = '@numbers_auto_advance';

export default function AutoAdvanceSwitch({ enabled = false, onToggle }) {
  const [value, setValue] = useState(enabled);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(stored => {
      if (stored !== null) setValue(stored === 'true');
    });
  }, []);

  const handleChange = async newVal => {
    setValue(newVal);
    await AsyncStorage.setItem(STORAGE_KEY, newVal.toString());
    onToggle(newVal);
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Auto-advance mode</Text>
      <Switch
        value={value}
        onValueChange={handleChange}
        trackColor={{ false: '#ccc', true: '#fff' }}
        thumbColor={value ? '#fff' : '#ccc'}
        ios_backgroundColor="#ccc"
      />
    </View>
  );
}
