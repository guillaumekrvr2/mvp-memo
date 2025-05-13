import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const LogoImg = require('../assets/icons/Memorize_icon.png')

export default function Header({ navigation, back }) {
  return (
    <View style={styles.container}>
      {/* Zone de gauche : back + logo */}
      <View style={styles.leftContainer}>
        {back && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={28} color="#fff" />
          </TouchableOpacity>
        )}
        <Image source={LogoImg} style={styles.logo} />
      </View>

      {/* Titre centré */}
      <Text style={styles.title}>Memorize</Text>

      {/* Icône de profil à droite */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Community')}
        style={styles.profileButton}
      >
        <Ionicons name="person-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'relative',
    marginTop: 10
  },
  leftContainer: {
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  profileButton: {
    position: 'absolute',
    right: 20,
  },
})
