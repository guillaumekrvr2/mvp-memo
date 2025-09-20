// Header.jsx
import React, { useContext } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
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
             navigation.getParent()?.navigate('Profile')
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
    backgroundColor: 'rgba(10, 10, 10, 0.85)',  // 🎯 Glassmorphisme
    backdropFilter: 'blur(10px)',               // Effet blur (iOS principalement)
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)', // Bordure subtile
  },
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  leftContainer: {
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
    width: 36,                                   // 🎯 Zone de touch plus définie
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0)', // 🎯 Fond subtil pour visibilité
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    // 🎯 Ombre pour faire ressortir le logo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 7.5,
    // 🎯 Ombre texte pour lisibilité
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    width: 36,                                   // 🎯 Zone de touch définie
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // 🎯 Fond subtil
    justifyContent: 'center',
    alignItems: 'center',
  },
});