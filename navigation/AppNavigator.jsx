// navigation/AppNavigator.jsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
