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
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AccountContext } from '../../contexts/AccountContext'
import { MenuButton } from '../../components/atoms/Commons/MenuButton/MenuButton'
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton'

const { width } = Dimensions.get('window')

export default function HomeScreen() {
  const navigation = useNavigation()
  const { current } = useContext(AccountContext)
  const insets = useSafeAreaInsets()
  
  const options = [
    { label: 'Numbers', screen: 'Numbers', emoji: '🔢', color: '#667eea', description: 'Mémorisation de nombres' },
    { label: 'Cards', screen: 'Cards', emoji: '🃏', color: '#764ba2', description: 'Jeux de cartes' },
    { label: 'Words', screen: 'Words', emoji: '📝', color: '#f093fb', description: 'Mots et vocabulaire' },
    { label: 'Binary', screen: 'Binaries', emoji: '💻', color: '#4facfe', description: 'Code binaire' },
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
  const headerHeight = insets.top + 60 + 20

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
    >
      {/* Header avec salutation */}
      <View style={[styles.header, { paddingTop: headerHeight + 8 }]}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.userName}>{userName} 👋</Text>
        <Text style={styles.subtitle}>Prêt à entraîner votre mémoire ?</Text>
      </View>

      {/* Grid des disciplines - CORRIGÉE */}
      <View style={styles.disciplinesContainer}>
        <Text style={styles.sectionTitle}>🧠 Choisissez votre discipline</Text>
        
        <View style={styles.gridFixed}>
          {options.map((option) => (
            <View key={option.screen} style={styles.gridItem}>
              <MenuButton
                label={option.label}
                emoji={option.emoji}
                color={option.color}
                description={option.description}
                onPress={() => navigation.navigate(option.screen)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Section Learn More */}
      <View style={styles.learnMoreSection}>
        <View style={styles.learnMoreCard}>
          <View style={styles.learnMoreHeader}>
            <Text style={styles.learnMoreEmoji}>💡</Text>
            <View>
              <Text style={styles.learnMoreTitle}>Découvrir les techniques</Text>
              <Text style={styles.learnMoreSubtitle}>Apprenez les méthodes des champions</Text>
            </View>
          </View>
          <SecondaryButton onPress={() => navigation.navigate('Discover')}>
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
    // ❌ Supprime alignItems: 'center' qui centre tout le container
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center', // ✅ Centre seulement le titre
  },
  // 🎯 GRILLE 2x3 VRAIMENT CENTRÉE ET HARMONIEUSE
  gridFixed: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // ✅ Retour à space-between pour 2 colonnes égales
    alignItems: 'flex-start', // ✅ Une seule déclaration alignItems
    // ❌ Supprime alignItems en double
  },
  gridItem: {
    width: '47%', // ✅ Simple et efficace : 47% + 47% + 6% d'espace = 100%
    marginBottom: 16, // ✅ Espacement vertical entre les lignes
    alignItems: 'center', // ✅ Centre chaque MenuButton dans son conteneur
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