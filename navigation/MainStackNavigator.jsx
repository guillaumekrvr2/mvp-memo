// navigation/MainStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigator from './AppNavigator'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. Les onglets */}
      <Stack.Screen name="Tabs" component={AppNavigator} />

      {/* 2. L'écran Profil */}
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Mon Profil',
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#000' },
        }}
      />
    </Stack.Navigator>
  )
}
