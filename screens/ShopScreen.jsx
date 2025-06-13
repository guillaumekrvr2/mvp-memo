// screens/ShopScreen.jsx
import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import { theme } from '../theme';

const PaywallHatImg        = require('../assets/icons/Paywall_hat.png')
const PaywallHourglassImg  = require('../assets/icons/Paywall_hourglass.png')
const PaywallNewsletterImg = require('../assets/icons/Paywall_newsletter.png')

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.title}>
          Unlock the power of{'\n'}your brain.
        </Text>
        <Text style={styles.subtitle}>Get full access.</Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Image source={PaywallHatImg} style={styles.icon} resizeMode="contain" />
            <Text style={styles.featureText}>
              Improve with our{' '}
              <Text style={styles.bold}>courses</Text>
            </Text>
          </View>

          <View style={styles.feature}>
            <Image source={PaywallHourglassImg} style={styles.icon} resizeMode="contain" />
            <Text style={styles.featureText}>
              <Text style={styles.bold}>No limit</Text> of games played
            </Text>
          </View>

          <View style={styles.feature}>
            <Image source={PaywallNewsletterImg} style={styles.icon} resizeMode="contain" />
            <Text style={styles.featureText}>
              Receive our{' '}
              <Text style={styles.bold}>newsletter</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // TODO : lancer l’abonnement / l’essai gratuit
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start 7 days trial</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 32
  },
  features: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: 32
  },
  feature: {
    alignItems: 'center',
    marginBottom: 16
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 8
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  bold: {
    fontWeight: '700'
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600'
  }
})
