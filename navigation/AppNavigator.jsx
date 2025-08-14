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

const hideOn = ['Memorisation', 'Decompte', 'Recall', 'Cards', 'CardsGame', 'CardsRecall']

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        const nested = route.name === 'Home'
         ? getFocusedRouteNameFromRoute(route) ?? 'HomeMain'
          : null
        const showHeader = !(nested && hideOn.includes(nested))

        return {
          header: showHeader
            ? ({ back }) => <Header navigation={navigation} back={back} />
            : undefined,
          headerShown: showHeader,
          headerTransparent: true,
          headerBackground: () => null,
          
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(10px)',
            borderTopWidth: 1,
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            elevation: 0,
            shadowOpacity: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            paddingTop: 15,
            paddingBottom: 5,
            justifyContent: 'center',
          },
          
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
          const hideTabsOn = ['Memorisation', 'Decompte', 'Recall', 'Numbers', 'Cards', 'CardsGame', 'CardsRecall']
          if (hideTabsOn.includes(nested)) {
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