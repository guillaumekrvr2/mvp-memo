import React from 'react'
import { FlatList, View, Text } from 'react-native'
import ArticleCard from '../../molecules/ArticleCard/ArticleCard'  // ← vérifie que ton chemin est bon
import styles from './styles'

export default function ArticleList({ data, onPressItem }) {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun article trouvé</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={item => item.id}                                             // ← ici
      renderItem={({ item }) => (                                              // ← et ici
        <ArticleCard
          article={item}
          onPress={() => onPressItem(item)}
        />
      )}
    />
  )
}