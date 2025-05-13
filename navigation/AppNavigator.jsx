// navigation/AppNavigator.jsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TouchableOpacity } from 'react-native'
import HomeStackNavigator from '../navigation/HomeStackNavigator'
import DiscoverScreen from '../screens/DiscoverScreen'
import CommunityScreen from '../screens/CommunityScreen'
import ShopScreen from '../screens/ShopScreen'
import { Ionicons } from '@expo/vector-icons'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Header from '../components/Header' // ← import nécessaire
import { Vibration } from 'react-native'; 

const Tab = createBottomTabNavigator()

const commonTabBarStyle = {
  backgroundColor: '#000',
  borderTopWidth: 0
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenListeners={{
        tabPress: () => {
          Vibration.vibrate(10);
      },
    }}
      screenOptions={({ route }) => ({
        header: ({ navigation }) => <Header navigation={navigation} />,
        tabBarActiveTintColor: '#fff',                 // icônes/textes actifs en blanc
        tabBarActiveBackgroundColor: '#000',
        tabBarInactiveBackgroundColor: '#000',  
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.7} style={[props.style, { backgroundColor: 'transparent' }]}/>
               ),            // inactifs en gris clair
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
      <Tab.Screen name="Discover" component={DiscoverScreen} options={{ tabBarStyle: commonTabBarStyle }}/>
      <Tab.Screen name="Community" component={CommunityScreen} options={{ tabBarStyle: commonTabBarStyle }}/>
      <Tab.Screen name="Shop" component={ShopScreen} options={{ tabBarStyle: commonTabBarStyle }}/>
    </Tab.Navigator>
  )
}
