// 📁 components/molecules/CardsThumbnailRow/CardsThumbnailRow.jsx
import React from 'react'
import { FlatList } from 'react-native'
import { CardThumbnail } from '../../../atoms/Cards/CardThumbnail/CardThumbnail'
import { styles } from './styles'

export function CardsThumbnailRow({ 
  deck, 
  removedCards, 
  onCardRestore 
}) {
  const renderThumbnail = ({ item, index }) => (
    <CardThumbnail
      item={item}
      index={index}
      isRemoved={removedCards.has(index)}
      onPress={onCardRestore}
    />
  )

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