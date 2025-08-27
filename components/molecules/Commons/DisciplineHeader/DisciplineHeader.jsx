// components/molecules/Commons/DisciplineHeader/DisciplineHeader.jsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AccountContext } from '../../../../contexts/AccountContext';

export default function DisciplineHeader({ disciplineName }) {
  const navigation = useNavigation();
  const { current } = useContext(AccountContext);

  return (
    <View style={[styles.safeArea]}>
      <View style={styles.container}>
        {/* Chevron de gauche */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Nom de la discipline centré */}
        <Text style={styles.title}>{disciplineName}</Text>

        {/* Icône de profil à droite */}
        <TouchableOpacity
          onPress={() => {
            if (current) {
              navigation.navigate('Profile');
            } else {
              navigation.getParent()?.navigate('Login');
            }
          }}
          style={styles.profileButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="person-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
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
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 36,                                   // 🎯 Taille alignée avec Header.jsx
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0)', // 🎯 Fond subtil comme Header.jsx
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    color: '#fff',
    fontSize: 18,                                // 🎯 Légèrement plus petit que Header
    fontWeight: '600',
    letterSpacing: 1.5,                          // 🎯 Letter spacing réduit pour les mots
    // 🎯 Ombre texte pour lisibilité
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  profileButton: {
    position: 'absolute',
    right: 20,                                   // 🎯 Aligné avec Header.jsx
    width: 36,                                   // 🎯 Taille alignée avec Header.jsx
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // 🎯 Fond subtil comme Header.jsx
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
});