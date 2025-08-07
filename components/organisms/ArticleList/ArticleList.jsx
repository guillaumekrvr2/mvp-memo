import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ArticleCard from '../../molecules/ArticleCard/ArticleCard'
import styles from './styles'

export default function ArticleList({ data, onPressItem }) {
  const insets = useSafeAreaInsets()

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun article trouvé</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ArticleCard
          article={item}
          onPress={() => onPressItem(item)}
        />
      )}
      contentContainerStyle={[
        styles.list,
        { paddingBottom: insets.bottom + 40 } // ← Espace pour la tab bar + marge
      ]}
      showsVerticalScrollIndicator={false}
    />
  )
}