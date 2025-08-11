// navigation/HomeStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home/HomeScreen'
import NumbersScreen from '../screens/memo/NumbersScreen/NumbersScreen'
import DecompteScreen  from '../screens/common/DecompteScreen/DecompteScreen'
import MemoScreen     from '../screens/memo/MemoScreen'
import RecallScreen     from '../screens/memo/RecallScreen'
import CorrectionScreen from '../screens/memo/CorrectionScreen/CorrectionScreen'
import { theme } from '../theme';
import ArticleScreen from '../screens/ArticleScreen';

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
      <Stack.Screen 
      name="Article" 
      component={ArticleScreen}
      options={{
        headerShown: false // L'ArticleScreen gère son propre header
      }}
    />
    </Stack.Navigator>
  )
}