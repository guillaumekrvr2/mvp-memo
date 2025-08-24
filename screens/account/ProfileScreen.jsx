// screens/ProfileScreen.jsx
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AccountContext } from '../../contexts/AccountContext'
import { ModeVariantContext } from '../../contexts/ModeVariantContext'

const { width } = Dimensions.get('window')
const DISCIPLINES = ['numbers', 'cards', 'words', 'binary', 'names', 'images']

export default function ProfileScreen({ navigation }) {
  const { current, logout } = useContext(AccountContext)
  const { byDiscipline } = useContext(ModeVariantContext)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Redirige si non connecté
  useEffect(() => {
    if (!current && !isLoggingOut) navigation.replace('Login')
  }, [current, isLoggingOut])

  // === DEBUG : afficher les IDs et scores des variants "numbers" ===
  useEffect(() => {
    if (!current || isLoggingOut) return // Évite l'exécution si déconnecté
    const nums = byDiscipline['numbers'] || byDiscipline[7] || []
    const ids = nums.map(v => v.id)
    const recs = ids.map(id => ({ id, score: current.records?.[id] ?? 0 }))
  }, [byDiscipline, current, isLoggingOut])

  // Fonction de déconnexion sécurisée
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      navigation.replace('Login')
    } catch (error) {
      setIsLoggingOut(false)
    }
  }

  if (!current || isLoggingOut) return null

  // On utilise directement `current` depuis le Context
  const user = current
  const { records = {} } = current

  // Prépare la liste simple des variants "numbers"
  const rawNums = byDiscipline['numbers'] || byDiscipline[7] || []
  const numberVariants = rawNums.map(({ id, label }) => ({
    id,
    label,
    score: records[id] != null ? records[id] : 0,
  }))

  // Prépare la liste simple des variants "cards"
  const rawCards = byDiscipline['cards'] || byDiscipline[8] || []
  const cardVariants = rawCards.map(({ id, label }) => ({
    id,
    label,
    score: records[id] != null ? records[id] : 0,
  }))

  // Prépare la liste simple des variants "binary"
  const rawBinary = byDiscipline['binary'] || byDiscipline[10] || []
  const binaryVariants = rawBinary.map(({ id, label }) => ({
    id,
    label,
    score: records[id] != null ? records[id] : 0,
  }))

  // Calculer le score total
  const totalScore = Object.values(records).reduce((sum, score) => sum + (score || 0), 0)

  // Initiales pour l'avatar
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header avec avatar et infos principales */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>
              {user.firstName && user.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user.firstName || user.lastName || 'Utilisateur'
              }
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.totalScoreLabel}>Score total</Text>
              <Text style={styles.totalScore}>{totalScore} pts</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Actions rapides */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('UpdateEmail')}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>✉️</Text>
          </View>
          <Text style={styles.actionText}>Modifier Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('UpdatePassword')}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>🔒</Text>
          </View>
          <Text style={styles.actionText}>Mot de passe</Text>
        </TouchableOpacity>
      </View>

      {/* Section Records */}
      <View style={styles.recordsSection}>
        <Text style={styles.sectionTitle}>🏆 Mes Records</Text>
        
        {/* Numbers: liste détaillée */}
        <View style={styles.disciplineCard}>
          <View style={styles.disciplineHeader}>
            <Text style={styles.disciplineTitle}>🔢 Numbers</Text>
            <Text style={styles.variantCount}>{numberVariants.length} variants</Text>
          </View>
          {numberVariants.length > 0 ? (
            numberVariants.map(({ id, label, score }) => (
              <View key={id} style={styles.variantRow}>
                <Text style={styles.variantLabel}>{label}</Text>
                <View style={styles.scoreChip}>
                  <Text style={styles.scoreText}>{score}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Aucun variant disponible</Text>
          )}
        </View>

        {/* Cards: liste détaillée */}
        <View style={styles.disciplineCard}>
          <View style={styles.disciplineHeader}>
            <Text style={styles.disciplineTitle}>🃏 Cards</Text>
            <Text style={styles.variantCount}>{cardVariants.length} variants</Text>
          </View>
          {cardVariants.length > 0 ? (
            cardVariants.map(({ id, label, score }) => (
              <View key={id} style={styles.variantRow}>
                <Text style={styles.variantLabel}>{label}</Text>
                <View style={styles.scoreChip}>
                  <Text style={styles.scoreText}>{score}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Aucun variant disponible</Text>
          )}
        </View>

        {/* Binary: liste détaillée */}
        <View style={styles.disciplineCard}>
          <View style={styles.disciplineHeader}>
            <Text style={styles.disciplineTitle}>💻 Binary</Text>
            <Text style={styles.variantCount}>{binaryVariants.length} variants</Text>
          </View>
          {binaryVariants.length > 0 ? (
            binaryVariants.map(({ id, label, score }) => (
              <View key={id} style={styles.variantRow}>
                <Text style={styles.variantLabel}>{label}</Text>
                <View style={styles.scoreChip}>
                  <Text style={styles.scoreText}>{score}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Aucun variant disponible</Text>
          )}
        </View>

        {/* Autres disciplines */}
        {DISCIPLINES.filter(d => d !== 'numbers' && d !== 'cards' && d !== 'binary').map(discipline => {
          const disciplineEmojis = {
            cards: '🃏',
            words: '📝',
            binary: '💻',
            names: '👥',
            images: '🖼️'
          }
          
          return (
            <View key={discipline} style={styles.disciplineCard}>
              <View style={styles.disciplineRow}>
                <View style={styles.disciplineInfo}>
                  <Text style={styles.disciplineTitle}>
                    {disciplineEmojis[discipline]} {discipline.charAt(0).toUpperCase() + discipline.slice(1)}
                  </Text>
                </View>
                <View style={styles.scoreChip}>
                  <Text style={styles.scoreText}>
                    {records[discipline] || 0}
                  </Text>
                </View>
              </View>
            </View>
          )
        })}
      </View>

      {/* Bouton déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>

      {/* Espaceur pour le bas */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#0a0a0a' 
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    backgroundColor: '#1a1a2e',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  headerInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    color: '#a0a9c0',
    fontSize: 16,
    marginBottom: 12,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalScoreLabel: {
    color: '#a0a9c0',
    fontSize: 14,
    marginRight: 8,
  },
  totalScore: {
    color: '#4ecdc4',
    fontSize: 20,
    fontWeight: '700',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconText: {
    fontSize: 18,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  recordsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  disciplineCard: {
    backgroundColor: '#1e1e2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  disciplineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  disciplineTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  variantCount: {
    color: '#a0a9c0',
    fontSize: 12,
    backgroundColor: '#2a2a3e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  disciplineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disciplineInfo: {
    flex: 1,
  },
  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  variantLabel: {
    color: '#a0a9c0',
    fontSize: 16,
    flex: 1,
  },
  scoreChip: {
    backgroundColor: '#4ecdc420',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#4ecdc440',
  },
  scoreText: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#ff4757',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 40,
  },
})