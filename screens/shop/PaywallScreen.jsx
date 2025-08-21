// screens/shop/PaywallScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import { PrimaryButton } from '../../components/atoms/Commons/PrimaryButton/PrimaryButton';

const PaywallScreen = ({ navigation, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const features = [
    'Accès illimité à tous les modes de jeu',
    'Entraînements personnalisés avancés',
    'Statistiques détaillées et analyses',
    'Synchronisation cloud sur tous vos appareils',
    'Nouveaux modes exclusifs en avant-première',
    'Support prioritaire et tips d\'experts'
  ];

  const plans = {
    annual: {
      title: 'Annuel',
      price: '29,99 €',
      priceDetail: '2,50 €/mois',
      discount: 'Économisez 17%',
      selected: selectedPlan === 'annual'
    },
    monthly: {
      title: 'Mensuel', 
      price: '2,99 €',
      priceDetail: 'par mois',
      selected: selectedPlan === 'monthly'
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec croix */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Logo et titre */}
      <View style={styles.titleSection}>
        <View style={styles.logo}>
          <Image source={require('../../assets/icons/Memorize_icon.png')} style={styles.logoIcon} />
        </View>
        <Text style={styles.title}>Débloquez votre potentiel</Text>
        <Text style={styles.subtitle}>
          Maximisez vos capacités de mémorisation{'\n'}
          avec des outils professionnels
        </Text>
      </View>

      {/* Liste des avantages */}
      <View style={styles.featuresSection}>
        <FlatList
          data={features}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.featureItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.featureText}>{item}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.featuresContent}
        />
        
        {/* Gradient du haut */}
        <LinearGradient
          colors={['#0a0a0a', 'rgba(10, 10, 10, 0.8)', 'rgba(10, 10, 10, 0.4)', 'transparent']}
          style={styles.topGradient}
          pointerEvents="none"
        />
        
        {/* Gradient du bas */}
        <LinearGradient
          colors={['transparent', 'rgba(10, 10, 10, 0.4)', 'rgba(10, 10, 10, 0.8)', '#0a0a0a']}
          style={styles.bottomGradient}
          pointerEvents="none"
        />
      </View>

      {/* Sélection de plan */}
      <View style={styles.plansSection}>
        <View style={styles.planContainer}>
          <TouchableOpacity
            style={[
              styles.planCard,
              plans.annual.selected ? styles.planCardSelected : styles.planCardUnselected
            ]}
            onPress={() => setSelectedPlan('annual')}
          >
            {plans.annual.selected && (
              <View style={styles.checkContainer}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
            )}
            <View style={styles.planContent}>
              <Text style={[
                styles.planTitle,
                plans.annual.selected && styles.planTitleSelected
              ]}>
                {plans.annual.title}
              </Text>
              {plans.annual.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{plans.annual.discount}</Text>
                </View>
              )}
              <Text style={[
                styles.planPrice,
                plans.annual.selected && styles.planPriceSelected
              ]}>
                {plans.annual.price}
              </Text>
              <Text style={[
                styles.planDetail,
                plans.annual.selected && styles.planDetailSelected
              ]}>
                {plans.annual.priceDetail}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.planCard,
              styles.planCardSpacing,
              plans.monthly.selected ? styles.planCardSelected : styles.planCardUnselected
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            {plans.monthly.selected && (
              <View style={styles.checkContainer}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
            )}
            <View style={styles.planContent}>
              <Text style={[
                styles.planTitle,
                plans.monthly.selected && styles.planTitleSelected
              ]}>
                {plans.monthly.title}
              </Text>
              <Text style={[
                styles.planPrice,
                plans.monthly.selected && styles.planPriceSelected
              ]}>
                {plans.monthly.price}
              </Text>
              <Text style={[
                styles.planDetail,
                plans.monthly.selected && styles.planDetailSelected
              ]}>
                {plans.monthly.priceDetail}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bouton d'action */}
      <View style={styles.actionSection}>
        <PrimaryButton
          onPress={() => {
            // TODO: Lancer l'achat
            console.log('Achat plan:', selectedPlan);
          }}
        >
          Devenir Pro
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  closeText: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
  },
  titleSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: "italic"
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: 260,
    position: 'relative',
  },
  featuresContent: {
    paddingTop: 25,
    paddingBottom: 10,
  },
  topGradient: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    height: 30,
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: -1,
    left: 20,
    right: 20,
    height: 25,
    zIndex: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    width: 20,
  },
  featureText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  plansSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  planContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  planCard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
    minHeight: 120,
    backgroundColor: theme.colors.background,
  },
  planCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  planCardUnselected: {
    borderColor: theme.colors.textSecondary,
    backgroundColor: theme.colors.background,
  },
  checkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: theme.colors.textOnDark,
    fontSize: 12,
    fontWeight: 'bold',
  },
  planContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  planTitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  planTitleSelected: {
    color: theme.colors.textPrimary,
  },
  discountBadge: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 4,
  },
  discountText: {
    color: theme.colors.textOnDark,
    fontSize: 12,
    fontWeight: 'bold',
  },
  planPrice: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
  },
  planPriceSelected: {
    color: theme.colors.textPrimary,
  },
  planDetail: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  planDetailSelected: {
    color: theme.colors.textSecondary,
  },
  actionSection: {
    paddingHorizontal: '10%',
    paddingBottom: 50,
    paddingTop: 20,
  },
});

export default PaywallScreen;