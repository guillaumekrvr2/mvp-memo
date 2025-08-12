// 📁 components/molecules/CardsThumbnailRow/CardsThumbnailRow.jsx
import React from 'react'
import { FlatList } from 'react-native'
import { CardThumbnail } from '../../../atoms/Cards/CardThumbnail/CardThumbnail'
import { styles } from './styles'

export function CardsThumbnailRow({ 
  deck, 
  currentGroupIndex = 0,
  groupSize = 1
}) {
  const renderThumbnail = ({ item, index }) => {
    // Calcule dans quel groupe se trouve cette carte
    const cardGroupIndex = Math.floor(index / groupSize)
    const isCompleted = cardGroupIndex < currentGroupIndex
    
    return (
      <CardThumbnail
        item={item}
        index={index}
        isRemoved={isCompleted} // Groupe déjà mémorisé
        onPress={() => {}} // Pas de restauration en mode groupe
      />
    )
  }

  return (
    <FlatList
      style={styles.cardsRow}
      contentContainerStyle={styles.cardsRowContent}
      data={deck}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderThumbnail}
    />
  )
}