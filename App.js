// App.js
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PostHogProvider } from 'posthog-react-native';
import Constants from 'expo-constants';

import { AccountProvider } from './contexts/AccountContext';
import { ModeVariantProvider } from './contexts/ModeVariantContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
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

// Wrapper pour les contexts internes (doit être à l'intérieur de PostHogProvider)
function AppContent() {
  return (
    <AnalyticsProvider>
      <AccountProvider>
        <ModeVariantProvider>
          <RootStack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen name="Main" component={MainStackNavigator} />
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
            <RootStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
          </RootStack.Navigator>
        </ModeVariantProvider>
      </AccountProvider>
    </AnalyticsProvider>
  );
}

export default function App() {
  // Configuration de la barre de navigation Android au démarrage
  useEffect(() => {
    const configureAndroidNavigation = async () => {
      if (Platform.OS === 'android') {
        try {
          // Masquer la barre de navigation (fonctionne seulement avec les boutons traditionnels)
          await NavigationBar.setVisibilityAsync('hidden');
          // Rendre la barre transparente quand elle apparaît
          await NavigationBar.setBackgroundColorAsync('#00000000');
          // Configuration du comportement de réapparition
          await NavigationBar.setBehaviorAsync('inset-swipe');
        } catch (error) {
        }
      }
    };
    
    configureAndroidNavigation();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={styledTheme.colors.background}
        translucent={true}
        hidden={false}
      />
      
      <ThemeProvider theme={styledTheme}>
        <NavigationContainer theme={MyNavTheme}>
          <PostHogProvider
            apiKey={Constants.expoConfig?.extra?.POSTHOG_API_KEY || ''}
            options={{
              host: Constants.expoConfig?.extra?.POSTHOG_HOST || 'https://us.i.posthog.com',
              captureApplicationLifecycleEvents: false,
              enable: true,
              // Options pour améliorer la fiabilité réseau
              flushAt: 1, // Envoyer immédiatement (utile pour debug)
              flushInterval: 10000, // Flush toutes les 10s
            }}
            autocapture={false}
          >
            <AppContent />
          </PostHogProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}