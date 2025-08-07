// navigation/MainStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigator from './AppNavigator'
import ProfileScreen from '../screens/account/ProfileScreen'
import ArticleScreen from '../screens/ArticleScreen'

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. Les onglets principaux */}
      <Stack.Screen name="Tabs" component={AppNavigator} />

      {/* 2. L'écran Profil */}
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Mon Profil',
          headerTintColor: '#fff',
        }}
      />

      {/* 3. L'écran Article - accessible depuis tous les onglets */}
      <Stack.Screen 
        name="Article" 
        component={ArticleScreen}
        options={{
          headerShown: false, // L'ArticleScreen gère son propre header
          presentation: 'modal', // Animation modale (optionnel)
        }}
      />
    </Stack.Navigator>
  )
}