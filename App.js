// App.js
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountProvider } from './contexts/AccountContext'

// Auth screens
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

// Main tabs
import AppNavigator from './navigation/AppNavigator'

// Thème sombre personnalisé
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
  },
}

const RootStack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <AccountProvider>
        <NavigationContainer theme={MyTheme}>
          <RootStack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
          >
            {/* Application principale */}
            <RootStack.Screen name="Main" component={AppNavigator} />

            {/* Écrans d'authentification */}
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </AccountProvider>
    </>
  )
}