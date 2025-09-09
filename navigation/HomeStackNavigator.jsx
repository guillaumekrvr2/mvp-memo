// navigation/HomeStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home/HomeScreen'
import NumbersScreen from '../screens/memo/Numbers/NumbersSettingsScreen/NumbersSettingsScreen'
import CardsMemoScreen from '../screens/memo/Cards/CardsMemoScreen/CardsMemoScreen'
import CardsSettingsScreen from '../screens/memo/Cards/CardsSettingsScreen'
import SpokenScreen from '../screens/memo/Spoken/SpokenSettingsScreen/SpokenSettingsScreen'
import WordsScreen from '../screens/memo/Words/WordsSettingsScreen/WordsSettingsScreen'
import WordsMemoScreen from '../screens/memo/Words/WordsMemoScreen/WordsMemoScreen'
import WordsRecallScreen from '../screens/memo/Words/WordsRecallScreen/WordsRecallScreen'
import WordsCorrectionScreen from '../screens/memo/Words/WordsCorrectionScreen/WordsCorrectionScreen'
import BinariesScreen from '../screens/memo/Binaries/BinariesSettingsScreen/BinariesSettingsScreen'
import NamesScreen from '../screens/memo/Names/NamesSettingsScreen/NamesSettingsScreen'
import NamesMemoScreen from '../screens/memo/Names/NamesMemoScreen/NamesMemoScreen'
import NamesRecallScreen from '../screens/memo/Names/NamesRecallScreen/NamesRecallScreen'
import NamesCorrectionScreen from '../screens/memo/Names/NamesCorrectionScreen/NamesCorrectionScreen'
import DecompteScreen from '../screens/common/DecompteScreen/DecompteScreen'
import SpokenDecompteScreen from '../screens/memo/Spoken/SpokenDecompteScreen/SpokenDecompteScreen'
import SpokenMemoScreen from '../screens/memo/Spoken/SpokenMemoScreen/SpokenMemoScreen'
import SpokenRecallScreen from '../screens/memo/Spoken/SpokenRecallScreen/SpokenRecallScreen'
import SpokenCorrectionScreen from '../screens/memo/Spoken/SpokenCorrectionScreen/SpokenCorrectionScreen'
import NumbersMemoScreen from '../screens/memo/Numbers/NumbersMemoScreen/NumbersMemoScreen'
import BinaryMemoScreen from '../screens/memo/Binaries/BinariesMemoScreen/BinariesMemoScreen'
import NumbersRecallScreen from '../screens/memo/Numbers/NumbersRecallScreen/NumbersRecallScreen'
import BinaryRecallScreen from '../screens/memo/Binaries/BinariesRecallScreen/BinariesRecallScreen'
import CardsRecallScreen from '../screens/memo/Cards/CardsRecallScreen/CardsRecallScreen'
import NumbersCorrectionScreen from '../screens/memo/Numbers/NumbersCorrectionScreen/NumbersCorrectionScreen'
import BinaryCorrectionScreen from '../screens/memo/Binaries/BinariesCorrectionScreen/BinariesCorrectionScreen'
import CardsCorrectionScreen from '../screens/memo/Cards/CardsCorrectionScreen/CardsCorrectionScreen'
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
      <Stack.Screen name="CardsGame" component={CardsMemoScreen} />
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
        component={NumbersMemoScreen} 
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
        component={NumbersRecallScreen} 
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
      <Stack.Screen 
        name="Correction" 
        component={NumbersCorrectionScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="BinaryCorrection" 
        component={BinaryCorrectionScreen} 
        options={{ headerShown: false }}
      />
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
      <Stack.Screen 
        name="NamesRecall" 
        component={NamesRecallScreen} 
        options={{ 
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' } // Transparent pour éviter la barre noire clavier
        }}
      />
      <Stack.Screen 
        name="NamesCorrection" 
        component={NamesCorrectionScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}