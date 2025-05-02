// navigation/AppNavigator.jsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from '../navigation/HomeStackNavigator'
import DiscoverScreen from '../screens/DiscoverScreen'
import CommunityScreen from '../screens/CommunityScreen'
import ShopScreen from '../screens/ShopScreen'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0},      // rend la tab bar noire
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
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
    </Tab.Navigator>
  )
}
