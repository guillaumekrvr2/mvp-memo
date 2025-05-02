// navigation/HomeStackNavigator.jsx
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import NumbersScreen from '../screens/NumbersScreen'

const Stack = createStackNavigator()

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Numbers" component={NumbersScreen} />
      {/* Plus tard : ajouterez ici Words, Cards, Binary, etc. */}
    </Stack.Navigator>
  )
}
