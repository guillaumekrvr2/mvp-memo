import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shop screen (en construction)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  }
})
