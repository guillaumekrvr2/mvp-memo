// navigation/HomeStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import NumbersScreen from '../screens/NumbersScreen'
import DecompteScreen  from '../screens/DecompteScreen'
import MemoScreen     from '../screens/MemoScreen'

const Stack = createNativeStackNavigator()

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
    }} >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Numbers" component={NumbersScreen} />
      <Stack.Screen name="Decompte"   component={DecompteScreen} />
      <Stack.Screen name="Memorisation" component={MemoScreen} />
      {/* Plus tard : ajouterez ici Words, Cards, Binary, etc. */}
    </Stack.Navigator>
  )
}