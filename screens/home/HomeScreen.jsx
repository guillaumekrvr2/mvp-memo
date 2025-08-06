// screens/HomeScreen.jsx
import React, { useContext } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  SafeAreaView 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context' // 🎯 Hook pour les insets
import { useNavigation } from '@react-navigation/native'
import { AccountContext } from '../../contexts/AccountContext'
import { MenuButton } from '../../components/atoms/MenuButton/MenuButton'
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton'

const { width } = Dimensions.get('window')

export default function HomeScreen() {
  const navigation = useNavigation()
  const { current } = useContext(AccountContext)
  const insets = useSafeAreaInsets() // 🎯 Récupère les insets de l'écran
  
  const options = [
    { label: 'Numbers', screen: 'Numbers', emoji: '🔢', color: '#667eea', description: 'Mémorisation de nombres' },
    { label: 'Cards', screen: 'Cards', emoji: '🃏', color: '#764ba2', description: 'Jeux de cartes' },
    { label: 'Words', screen: 'Words', emoji: '📝', color: '#f093fb', description: 'Mots et vocabulaire' },
    { label: 'Binary', screen: 'Binary', emoji: '💻', color: '#4facfe', description: 'Code binaire' },
    { label: 'Spoken', screen: 'Spoken', emoji: '🎤', color: '#43e97b', description: 'Mémorisation orale' },
    { label: 'Images', screen: 'Images', emoji: '🖼️', color: '#fa709a', description: 'Mémorisation visuelle' },
  ]

  // Salutation dynamique selon l'heure
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bonjour'
    if (hour < 18) return 'Bon après-midi'
    return 'Bonsoir'
  }

  const userName = current?.firstName || current?.email?.split('@')[0] || 'Champion'

  // 🎯 Hauteur estimée du header (SafeAreaView + container + marginTop)
  const headerHeight = insets.top + 60 + 20 // top inset + container height + marginTop

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} // 🎯 Espace pour tab bar
    >
      {/* Header avec salutation - avec padding pour éviter le header */}
      <View style={[styles.header, { paddingTop: headerHeight + 8 }]}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.userName}>{userName} 👋</Text>
        <Text style={styles.subtitle}>Prêt à entraîner votre mémoire ?</Text>
      </View>

      {/* Grid des disciplines */}
      <View style={styles.disciplinesContainer}>
        <Text style={styles.sectionTitle}>🧠 Choisissez votre discipline</Text>
        
        <View style={styles.grid}>
          {options.map((option) => (
            <MenuButton
              key={option.screen}
              label={option.label}
              emoji={option.emoji}
              color={option.color}
              description={option.description}
              onPress={() => navigation.navigate(option.screen)}
            />
          ))}
        </View>
      </View>

      {/* Section Learn More améliorée */}
      <View style={styles.learnMoreSection}>
        <View style={styles.learnMoreCard}>
          <View style={styles.learnMoreHeader}>
            <Text style={styles.learnMoreEmoji}>💡</Text>
            <View>
              <Text style={styles.learnMoreTitle}>Découvrir les techniques</Text>
              <Text style={styles.learnMoreSubtitle}>Apprenez les méthodes des champions</Text>
            </View>
          </View>
          <SecondaryButton onPress={() => {/* action */}}>
            En savoir plus
          </SecondaryButton>
        </View>
      </View>

      {/* Stats rapides si connecté */}
      {current && (
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Vos statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {Object.keys(current.records || {}).length}
              </Text>
              <Text style={styles.statLabel}>Disciplines{'\n'}pratiquées</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {Object.values(current.records || {}).reduce((sum, score) => sum + (score || 0), 0)}
              </Text>
              <Text style={styles.statLabel}>Points{'\n'}totaux</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {Math.max(...Object.values(current.records || {}), 0)}
              </Text>
              <Text style={styles.statLabel}>Meilleur{'\n'}score</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#1a1a2e',
    // 🎯 paddingTop sera calculé dynamiquement
  },
  greeting: {
    color: '#a0a9c0',
    fontSize: 16,
    fontWeight: '500',
  },
  userName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 4,
  },
  subtitle: {
    color: '#a0a9c0',
    fontSize: 16,
    marginTop: 8,
  },
  disciplinesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  grid: {
    gap: 12,
  },
  learnMoreSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  learnMoreCard: {
    backgroundColor: '#4ecdc410',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#4ecdc440',
  },
  learnMoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  learnMoreEmoji: {
    fontSize: 30,
    marginRight: 16,
  },
  learnMoreTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  learnMoreSubtitle: {
    color: '#a0a9c0',
    fontSize: 14,
    marginTop: 2,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  statNumber: {
    color: '#4ecdc4',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  statLabel: {
    color: '#a0a9c0',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
})