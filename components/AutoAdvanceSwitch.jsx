import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@numbers_auto_advance';

export default function AutoAdvanceSwitch({ enabled, onToggle }) {
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
      <Switch value={value} onValueChange={handleChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  label: {
    color: '#fff',
    fontSize: 16
  }
});
