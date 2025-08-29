// src/components/organisms/ArticleCard.styles.js
import { StyleSheet } from 'react-native'
import { theme } from '../../../theme'

export default StyleSheet.create({
  card: {
    backgroundColor: '#1e1e2e',  
    backdropFilter: 'blur(10px)',                  // 🎯 Fond moderne cohérent
    borderRadius: 16,                             // 🎯 Border radius plus moderne  
    padding: 18,                                  // 🎯 Padding légèrement augmenté
    marginVertical: 16,                           // 🎯 Beaucoup plus d'espacement vertical
    marginHorizontal: 4,                          // 🎯 Petit margin horizontal
    borderWidth: 1,
    borderColor: '#2a2a3e',                       // 🎯 Bordure subtile
    borderLeftWidth: 4,                           // 🎯 Bordure gauche colorée
    borderLeftColor: '#4ecdc4',                   // 🎯 Couleur accent
    shadowColor: '#4ecdc4',                       // 🎯 Ombre colorée
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // 🎯 Conteneur pour l'icône
  iconContainer: {
    width: 44,                                    // 🎯 Légèrement plus petit
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4ecdc420',                 // 🎯 Fond coloré semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,                              // 🎯 Plus d'espace à droite
  },
  
  // 🎯 Icône/Emoji
  icon: {
    fontSize: 20,                                 // 🎯 Police réduite
  },
  
  // 🎯 Conteneur pour le contenu textuel
  content: {
    flex: 1,
  },
  
  title: {
    color: '#ffffff',                             // 🎯 Texte blanc
    fontSize: 14,                                 // 🎯 Police encore réduite
    fontWeight: '600',                            // 🎯 Poids plus prononcé
    marginBottom: 8,                              // 🎯 Plus d'espace avec description
    lineHeight: 20,                               // 🎯 Hauteur de ligne proportionnelle
  },
  
  // 🎯 Sous-titre
  subtitle: {
    color: '#a0a9c0',                             // 🎯 Texte secondaire (même que description)
    fontSize: 13,                                 // 🎯 Police légèrement plus petite que title
    lineHeight: 18,                               // 🎯 Ligne proportionnelle                               // 🎯 Petit espace avec title
  },
  
  // 🎯 Description optionnelle
  description: {
    color: '#a0a9c0',                             // 🎯 Texte secondaire
    fontSize: 13,                                 // 🎯 Police réduite
    lineHeight: 20,                               // 🎯 Ligne plus aérée
  },
  
  // 🎯 Conteneur pour TimeBadge + flèche
  rightContainer: {
    alignItems: 'center',
    gap: 10,                                      // 🎯 Plus d'espace
  },
  
  // 🎯 Conteneur pour la flèche
  actionContainer: {
    width: 28,                                    // 🎯 Légèrement plus petit
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4ecdc420',                 // 🎯 Fond semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // 🎯 Flèche d'action
  actionIcon: {
    color: '#4ecdc4',
    fontSize: 14,                                 // 🎯 Police réduite
    fontWeight: '600',
  },
})