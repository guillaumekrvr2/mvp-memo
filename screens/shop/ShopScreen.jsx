// screens/ShopScreen.jsx
import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { theme } from '../../theme'
import { Text } from '../../components/atoms/Commons/Text/Text'
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton'
import { FeatureItem } from '../../components/molecules/FeatureItem/FeatureItem'

const PaywallHatImg        = require('../../assets/icons/Paywall_hat.png')
const PaywallHourglassImg  = require('../../assets/icons/Paywall_hourglass.png')
const PaywallNewsletterImg = require('../../assets/icons/Paywall_newsletter.png')

// Définition des données des features
const features = [
  {
    icon: PaywallHatImg,
    label: 'Improve with our courses',
    highlight: 'courses',
  },
  {
    icon: PaywallHourglassImg,
    label: 'No limit of games played',
    highlight: 'No limit',
  },
  {
    icon: PaywallNewsletterImg,
    label: 'Receive our newsletter',
    highlight: 'newsletter',
  },
]

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" center mb="xs">
          Unlock the power of{'\n'}your brain.
        </Text>
        <Text variant="body" center mb="lg">
          Get full access.
        </Text>

        {features.map((f, i) => (
          <FeatureItem
            key={i}
            icon={f.icon}
            label={f.label}
            highlight={f.highlight}
          />
        ))}

        <SecondaryButton onPress={() => {
          // TODO: lancer l’abonnement / l’essai gratuit
        }}>
          Start 7 days trial
        </SecondaryButton>
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
    paddingHorizontal: 20,
  },
})
