import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import TimeBadge from '../../atoms/TimeBadge/TimeBadge'
import styles from './styles'

export default function ArticleCard({ article, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.title}>{article.title}</Text>
      <TimeBadge minutes={article.time} />
    </TouchableOpacity>
  )
}
