// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components/native';

import { AccountProvider } from './contexts/AccountContext';
import { theme as styledTheme } from './theme';    // <- ton design system


// Auth screens
import LoginScreen  from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

// Main tabs
import MainStackNavigator from './navigation/MainStackNavigator';

// 1) Thème React Navigation personnalisé
const MyNavTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: styledTheme.colors.background,  // '#000'
    text: styledTheme.colors.primary,           // '#fff'
    // …tu peux override d’autres couleurs si besoin
  },
};

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={styledTheme.colors.background} />

      {/* 2) Injecte ton theme styled-components */}
      <ThemeProvider theme={styledTheme}>  

        {/* 3) Navigation */}
        <NavigationContainer theme={MyNavTheme}>
          <AccountProvider>
            <RootStack.Navigator
              initialRouteName="Main"
              screenOptions={{ headerShown: false }}
            >
              {/* Application principale (onglets + profil) */}
              <RootStack.Screen name="Main" component={MainStackNavigator} />

              {/* Écrans d'authentification */}
              <RootStack.Screen name="Login"  component={LoginScreen} />
              <RootStack.Screen name="SignUp" component={SignUpScreen} />
            </RootStack.Navigator>
          </AccountProvider>
        </NavigationContainer>

      </ThemeProvider>
    </>
  );
}
