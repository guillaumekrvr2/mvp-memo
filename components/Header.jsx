// Header.jsx
import React, { useContext } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const LogoImg = require('../assets/icons/Memorize_icon.png')
import { AccountContext } from '../contexts/AccountContext'

export default function Header({ navigation, back }) {

  const { current } = useContext(AccountContext)

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.title}>memorize</Text>

        {/* Icône de profil à droite */}
        <TouchableOpacity
          onPress={() => {
           if (current) {
             navigation.navigate('Profile')
           } else {
            navigation.getParent()?.navigate('Login')
           }
        }}
          style={styles.profileButton}
        >
          <Ionicons name="person-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
  },
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 10,
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
    letterSpacing: 7.5,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
  },
});
