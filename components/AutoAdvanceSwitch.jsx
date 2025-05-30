import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@numbers_auto_advance';

export default function AutoAdvanceSwitch({ enabled = false, onToggle }) {
  const [value, setValue] = useState(enabled);

  // Charger la valeur persistée au montage
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(stored => {
      if (stored !== null) setValue(stored === 'true');
    });
  }, []);

  // Quand l’utilisateur bascule le switch
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
        // Pas de disabled ici, pour permettre le toggle
        trackColor={{ false: '#ccc', true: '#fff' }}
        thumbColor={value ? '#fff' : '#ccc'}
        ios_backgroundColor="#ccc"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginLeft: 10,
    marginRight: 10
  },
  label: {
    color: '#fff',
    fontSize: 16
  }
});
