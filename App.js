// App.js
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AccountProvider, AccountContext } from './contexts/AccountContext';
import { ModeVariantProvider } from './contexts/ModeVariantContext';
import { theme as styledTheme } from './theme';

// Auth screens
import LoginScreen from './screens/auth/LoginScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import EmailVerificationScreen from './screens/auth/EmailVerificationScreen';

// Main tabs
import MainStackNavigator from './navigation/MainStackNavigator';

// Thème React Navigation personnalisé
const MyNavTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: styledTheme.colors.background,
    text: styledTheme.colors.primary,
  },
};

const RootStack = createNativeStackNavigator();

// Composant qui gère la navigation en fonction de l'authentification
function AuthenticatedNavigator() {
  const { loading, current } = useContext(AccountContext);

  console.log('[AuthenticatedNavigator] State:', { loading, hasUser: !!current, userEmail: current?.email });

  if (loading) {
    // TODO: Remplacer par un vrai écran de chargement
    return null;
  }

  return (
    <RootStack.Navigator
      initialRouteName={current ? "Main" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      {current ? (
        // Utilisateur connecté
        <RootStack.Screen name="Main" component={MainStackNavigator} />
      ) : (
        // Utilisateur non connecté
        <>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="SignUp" component={SignUpScreen} />
          <RootStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={styledTheme.colors.background} />
      
      <ThemeProvider theme={styledTheme}>
        <NavigationContainer theme={MyNavTheme}>
          <AccountProvider>
            <ModeVariantProvider>
              <AuthenticatedNavigator />
            </ModeVariantProvider>
          </AccountProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}