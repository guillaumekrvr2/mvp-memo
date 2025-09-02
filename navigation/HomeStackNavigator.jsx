// navigation/HomeStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home/HomeScreen'
import NumbersScreen from '../screens/memo/Numbers/NumbersScreen/NumbersScreen'
import CardsScreen from '../screens/memo/Cards/CardsScreen'
import CardsSettingsScreen from '../screens/memo/Cards/CardsSettingsScreen'
import SpokenScreen from '../screens/memo/Spoken/SpokenScreen/SpokenScreen'
import WordsScreen from '../screens/memo/Words/WordsScreen'
import WordsMemoScreen from '../screens/memo/Words/WordsMemoScreen'
import WordsRecallScreen from '../screens/memo/Words/WordsRecallScreen'
import WordsCorrectionScreen from '../screens/memo/Words/WordsCorrectionScreen'
import BinariesScreen from '../screens/memo/Binaries/BinariesScreen/BinariesScreen'
import NamesScreen from '../screens/memo/Names/NamesScreen/NamesScreen'
import NamesMemoScreen from '../screens/memo/Names/NamesMemoScreen/NamesMemoScreen'
import DecompteScreen from '../screens/common/DecompteScreen/DecompteScreen'
import SpokenDecompteScreen from '../screens/memo/Spoken/SpokenDecompteScreen/SpokenDecompteScreen'
import SpokenMemoScreen from '../screens/memo/Spoken/SpokenMemoScreen/SpokenMemoScreen'
import SpokenRecallScreen from '../screens/memo/Spoken/SpokenRecallScreen/SpokenRecallScreen'
import SpokenCorrectionScreen from '../screens/memo/Spoken/SpokenCorrectionScreen/SpokenCorrectionScreen'
import MemoScreen from '../screens/memo/Numbers/MemoScreen'
import BinaryMemoScreen from '../screens/memo/Binaries/MemoScreen'
import RecallScreen from '../screens/memo/Numbers/RecallScreen'
import BinaryRecallScreen from '../screens/memo/Binaries/RecallScreen'
import CardsRecallScreen from '../screens/memo/Cards/CardsRecallScreen'
import CorrectionScreen from '../screens/memo/Numbers/CorrectionScreen/CorrectionScreen'
import BinaryCorrectionScreen from '../screens/memo/Binaries/CorrectionScreen/CorrectionScreen'
import CardsCorrectionScreen from '../screens/memo/Cards/CardsCorrectionScreen'
import { theme } from '../theme'

const Stack = createNativeStackNavigator()

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Numbers" component={NumbersScreen} />
      <Stack.Screen name="Cards" component={CardsSettingsScreen} />
      <Stack.Screen name="Spoken" component={SpokenScreen} />
      <Stack.Screen name="Words" component={WordsScreen} />
      <Stack.Screen name="Binaries" component={BinariesScreen} />
      <Stack.Screen name="Names" component={NamesScreen} />
      <Stack.Screen name="CardsGame" component={CardsScreen} />
      <Stack.Screen 
        name="Decompte" 
        component={DecompteScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SpokenDecompte" 
        component={SpokenDecompteScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SpokenMemo" 
        component={SpokenMemoScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SpokenRecall" 
        component={SpokenRecallScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SpokenCorrection" 
        component={SpokenCorrectionScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Memorisation" 
        component={MemoScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="BinaryMemo" 
        component={BinaryMemoScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="WordsMemo" 
        component={WordsMemoScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="WordsRecall" 
        component={WordsRecallScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="WordsCorrection" 
        component={WordsCorrectionScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Recall" 
        component={RecallScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="BinaryRecall" 
        component={BinaryRecallScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CardsRecall" 
        component={CardsRecallScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Correction" component={CorrectionScreen} />
      <Stack.Screen name="BinaryCorrection" component={BinaryCorrectionScreen} />
      <Stack.Screen 
        name="CardsCorrection" 
        component={CardsCorrectionScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NamesMemo" 
        component={NamesMemoScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}