import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Rechercher...", 
  style,           // ✅ Style pour le conteneur parent
  searchBarStyle   // ✅ Style pour la SearchBar elle-même
}) {
  return (
    <View style={[styles.containerWrapper, style]}>
      {/* ✅ CONTENEUR PARENT - c'est lui qui doit être rouge */}
      <View style={[styles.searchBarContainer, searchBarStyle]}>
        <Ionicons 
          name="search" 
          size={20} 
          color="#a0a9c0" 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#a0a9c0"
          value={value}
          onChangeText={onChange}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value?.length > 0 && (
          <TouchableOpacity 
            onPress={() => onChange('')}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle" size={18} color="#a0a9c0" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
