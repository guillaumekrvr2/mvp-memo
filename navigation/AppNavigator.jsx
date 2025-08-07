// navigation/AppNavigator.jsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { Vibration } from 'react-native'
import Header from '../components/Header'
import HomeStackNavigator from '../navigation/HomeStackNavigator'
import DiscoverScreen from '../screens/discover/DiscoverScreen'
import CommunityScreen from '../screens/community/CommunityScreen'
import ShopScreen from '../screens/shop/ShopScreen'
import { Ionicons } from '@expo/vector-icons'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

// Écrans de HomeStack où on veut CACHER le header
const hideOn = ['Memorisation', 'Decompte', 'Recall']

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        // Par défaut on affiche le header
        const nested = route.name === 'Home'
         ? getFocusedRouteNameFromRoute(route) ?? 'HomeMain'
          : null
        const showHeader = !(nested && hideOn.includes(nested))

        return {
          // Header transparent
          header: showHeader
            ? ({ back }) => <Header navigation={navigation} back={back} />
            : undefined,
          headerShown: showHeader,
          headerTransparent: true,        // 🎯 Header transparent
          headerBackground: () => null,   // 🎯 Pas de fond pour le header
          
          // Tab bar transparente
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'rgba(10, 10, 10, 0.85)', // 🎯 Semi-transparent au lieu de transparent
            backdropFilter: 'blur(10px)',              // Effet blur
            borderTopWidth: 1,                         // Bordure subtile
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            elevation: 0,
            shadowOpacity: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            paddingTop: 15,        // 🎯 Plus d'espace en haut
            paddingBottom: 5,      // 🎯 Moins d'espace en bas
            justifyContent: 'center', // 🎯 Centre les icônes verticalement
          },
          
          // Bouton personnalisé sans effets visuels
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
              pressOpacity={1}
              onPress={(e) => {
                Vibration.vibrate(10)
                props.onPress?.(e)
              }}
            />
          ),
          
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
          
          tabBarIcon: ({ color, size }) => {
            let iconName
            if (route.name === 'Home') iconName = 'home-outline'
            if (route.name === 'Discover') iconName = 'school-outline'
            if (route.name === 'Community') iconName = 'people-outline'
            if (route.name === 'Shop') iconName = 'cart-outline'
            return <Ionicons name={iconName} size={size} color={color} />
          }
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => {
          const nested = getFocusedRouteNameFromRoute(route) ?? 'HomeMain'
          const hideOn = ['Memorisation', 'Decompte', 'Recall', 'Numbers']
          if (hideOn.includes(nested)) {
            return { tabBarStyle: { display: 'none' } }
          }
          return {}
        }}
      />

      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
    </Tab.Navigator>
  )
}