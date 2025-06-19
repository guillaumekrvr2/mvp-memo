// navigation/HomeStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home/HomeScreen'
import NumbersScreen from '../screens/memo/NumbersScreen'
import DecompteScreen  from '../screens/common/DecompteScreen'
import MemoScreen     from '../screens/memo/MemoScreen'
import RecallScreen     from '../screens/memo/RecallScreen'
import CorrectionScreen from '../screens/memo/CorrectionScreen'
import { theme } from '../theme';

const Stack = createNativeStackNavigator()

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
    }} >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Numbers" component={NumbersScreen} />
      <Stack.Screen name="Decompte"   component={DecompteScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Memorisation" component={MemoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Recall" component={RecallScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Correction" component={CorrectionScreen} />
      {/* Plus tard : ajouterez ici Words, Cards, Binary, etc. */}
    </Stack.Navigator>
  )
}