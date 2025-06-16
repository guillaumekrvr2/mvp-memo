// src/components/molecules/SearchBar.jsx
import React from 'react'
import { View, TextInput } from 'react-native'
import styles from './styles'    // <–– ici
import { Ionicons } from '@expo/vector-icons'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#888" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
      />
    </View>
  )
}
