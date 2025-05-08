// App.js
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'

// On étend le DarkTheme de React Navigation
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000'    // force le fond noir sous toute transition
  }
}

export default function App() {
  return (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
    </NavigationContainer>
  </>
  )
}