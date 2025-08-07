// components/molecules/ArticleCard/ArticleCard.jsx
import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import TimeBadge from '../../atoms/TimeBadge/TimeBadge'
import styles from './styles'

export default function ArticleCard({ article, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Icône/Emoji pour l'article */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📰</Text>
      </View>
      
      {/* Contenu textuel */}
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        {article.description && (
          <Text style={styles.description}>{article.description}</Text>
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