// components/molecules/ArticleCard/ArticleCard.jsx
import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import TimeBadge from '../../atoms/Commons/TimeBadge/TimeBadge'
import styles from './styles'

export default function ArticleCard({ article, onPress }) {
  // Séparer le titre principal du sous-titre
  const splitTitle = (title) => {
    const parts = title.split(' – ')
    if (parts.length >= 2) {
      return {
        mainTitle: parts[0],
        subtitle: parts.slice(1).join(' – ')
      }
    }
    
    // Fallback pour les titres avec ":"
    const colonParts = title.split(' : ')
    if (colonParts.length >= 2) {
      return {
        mainTitle: colonParts[0],
        subtitle: colonParts.slice(1).join(' : ')
      }
    }
    
    return {
      mainTitle: title,
      subtitle: null
    }
  }

  const { mainTitle, subtitle } = splitTitle(article.title)

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Icône/Emoji pour l'article */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📰</Text>
      </View>
      
      {/* Contenu textuel */}
      <View style={styles.content}>
        <Text style={styles.title}>{mainTitle}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      
      {/* TimeBadge + Flèche */}
      <View style={styles.rightContainer}>
        <TimeBadge minutes={article.time} />
        <View style={styles.actionContainer}>
          <Text style={styles.actionIcon}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}