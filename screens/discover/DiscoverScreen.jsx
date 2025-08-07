// screens/DiscoverScreen.jsx
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { useDiscover } from '../../hooks/useDiscover'
import SearchBar from '../../components/atoms/SearchBar/SearchBar'
import ArticleCard from '../../components/molecules/ArticleCard/ArticleCard'

export default function DiscoverScreen() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const headerHeight = insets.top + 60

  const { query, setQuery, filtered } = useDiscover()

  return (
    <View style={styles.container}>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => navigation.navigate('Article', { articleId: item.id })}
          />
        )}

        // Barre de recherche « au-dessus »
        ListHeaderComponent={() => (
          <View style={[styles.searchSection, { paddingTop: headerHeight }]}>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Rechercher un article…"
              style={{
                backgroundColor: 'transparent',
                paddingHorizontal: 24,
                paddingVertical: 12,
              }}
              searchBarStyle={{
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
          </View>
        )}

        contentContainerStyle={{
          paddingBottom: insets.bottom + 60 + 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 20, },
  searchSection: {
    marginBottom: 16,
  },
})
