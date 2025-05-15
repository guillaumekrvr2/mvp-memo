// navigation/AppNavigator.jsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'  // ← on importe PlatformPressable
import { Vibration } from 'react-native'
import Header from '../components/Header'
import HomeStackNavigator from '../navigation/HomeStackNavigator'
import DiscoverScreen from '../screens/DiscoverScreen'
import CommunityScreen from '../screens/CommunityScreen'
import ShopScreen from '../screens/ShopScreen'
import { Ionicons } from '@expo/vector-icons'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

// 2) Écrans de HomeStack où on veut CACHER le header
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
          // 3) affiche votre Header ou non
          header: showHeader
            ? ({ back }) => <Header navigation={navigation} back={back} />
            : undefined,
         headerShown: showHeader,
        tabBarActiveTintColor: '#fff',                 // icônes/textes actifs en blanc
        tabBarInactiveTintColor: '#888',              // inactifs en gris clair
        tabBarShowLabel: false,
        // → fond noir pour toute la tabBar
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          elevation: 0,    // supprime l’ombre Android
          shadowOpacity: 0 // supprime l’ombre iOS
        },
         // → on remplace le bouton par PlatformPressable, sans ripple et sans opacité
         tabBarButton: (props) => (
           <PlatformPressable
             {...props}
             android_ripple={{ color: 'transparent' }}
             pressOpacity={1}
             onPress={(e) => {
             Vibration.vibrate(10)       // vibre 10 ms
             props.onPress?.(e)           // conserve la navigation
           }}
           />
         ),
        // → désactive le ripple Android et l’opacité iOS (plus de “bulle” grise)
        tabBarPressColor: 'transparent',
        tabBarPressOpacity: 1,               
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name === 'Home') iconName = 'home-outline'
          if (route.name === 'Discover') iconName = 'compass-outline'
          if (route.name === 'Community') iconName = 'people-outline'
          if (route.name === 'Shop') iconName = 'cart-outline'
          return <Ionicons name={iconName} size={size} color={color} />
        }
      }}
    }
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={({ route }) => {
         // récupère le nom du screen actif dans HomeStackNavigator
         const nested = getFocusedRouteNameFromRoute(route) ?? 'HomeMain'
         const hideOn = ['Memorisation', 'Decompte', 'Recall']
         return {
           // si on est sur "Memorisation" ou "Décompte", on masque la tabBar
           tabBarStyle: hideOn.includes(nested)
               ? { display: 'none' }
               : { backgroundColor: '#000', borderTopWidth: 0 }
         }
       }}
     />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
    </Tab.Navigator>
  )
}
