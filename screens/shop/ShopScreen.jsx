// screens/ShopScreen.jsx
import React from 'react'
import PaywallScreen from './PaywallScreen'

export default function ShopScreen({ navigation }) {
  return (
    <PaywallScreen 
      navigation={navigation}
      onClose={() => navigation.goBack()}
    />
  )
}
