// components/molecules/ObjectiveTimePicker/ObjectiveTimePicker.jsx
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

export default function ObjectiveTimePicker({
  mode,
  objectif,
  onObjectifChange,
  temps,
  onTempsChange,
}) {
  const staticTimes = {
    'memory-league': '1 minute',
    iam: '5 minutes',
  };
  const staticLabel = staticTimes[mode];

  return (
    <View style={styles.row}>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Objectif"
          placeholderTextColor="#666"
          keyboardType="number-pad"
          value={objectif}
          onChangeText={onObjectifChange}
        />
      </View>

      {staticLabel ? (
        <View style={styles.staticTimeBox}>
          <Text style={styles.staticTime}>{staticLabel}</Text>
        </View>
      ) : (
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Temps (s)"
            placeholderTextColor="#666"
            keyboardType="number-pad"
            value={temps > 0 ? String(temps) : ''}
            onChangeText={onTempsChange}
          />
        </View>
      )}
    </View>
  );
}