// screens/HomeScreen.jsx
import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Import des SVG via react-native-svg-transformer
const LogoImg = require('../assets/icons/Memorize_icon.png')
const UserImg = require('../assets/icons/User.png')
const HomeIcon = require ('../assets/icons/home_icon.svg') 
const DiscoverIcon = require ('../assets/icons/Compass.svg')
const CommunityIcon = require ('../assets/icons/Users_Group.svg')
const ShopIcon = require ('../assets/icons/Shopping_Cart.svg') 

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
          <Image source={LogoImg} style={styles.logo} />
          <Text style={styles.title}>Memorize</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Community')}>
            <Image source={UserImg} style={styles.userIcon} />
          </TouchableOpacity>
        </View>

      
      <View style={styles.grid}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Numbers')}><Text style={styles.buttonText}>Numbers</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Cards</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Words</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Binary</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.learnMore}>
        <Text style={styles.learnMoreText}>Learn more</Text>
      </TouchableOpacity>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  topBar: {
    width: '100%',               // occupe tout l’écran
    flexDirection: 'row',        // logo / icône en ligne
    justifyContent: 'space-between', // extrémités gauche-droite
    alignItems: 'center',        // verticalement centré
    paddingHorizontal: 20,       // marge interne sur les côtés
    paddingTop: 15,
    paddingBottom: 60,            // espace sous la barre
  },
  title: {
    color: '#fff',
    fontSize: 28,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  },
  userIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 50,
  },
  button: {
    width: 120,
    height: 120,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  learnMore: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',    // ← empêche le stretch et centre le bouton
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  }
})
