// components/atoms/SearchBar/SearchBar.jsx
import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'

export default function SearchBar({ value, onChange, placeholder = "Rechercher...", style }) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color="#a0a9c0" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#a0a9c0"
        value={value}
        onChangeText={onChange}
      />
      {value && value.length > 0 && (
        <TouchableOpacity 
          onPress={() => onChange('')}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={18} color="#a0a9c0" />
        </TouchableOpacity>
      )}
    </View>
  )
}