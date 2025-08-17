// screens/discover/DiscoverScreen.jsx
import React, { useCallback, useMemo } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useDiscover } from '../../hooks/useDiscover'
import SearchBar from '../../components/atoms/Commons/SearchBar/SearchBar'
import ArticleCard from '../../components/molecules/ArticleCard/ArticleCard' // 🎯 Chemin corrigé

// Composant Header séparé pour éviter les re-renders
function SearchHeader({ query, setQuery, headerHeight }) {
  return (
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
  )
}

export default function DiscoverScreen() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const headerHeight = insets.top + 60

  const { query, setQuery, filtered } = useDiscover()

  // Composant Header mémorisé
  const ListHeaderComponent = useMemo(() => (
    <SearchHeader 
      query={query} 
      setQuery={setQuery} 
      headerHeight={headerHeight} 
    />
  ), [query, setQuery, headerHeight])

  const renderItem = useCallback(({ item }) => (
    <ArticleCard
      article={item}
      onPress={() => navigation.navigate('Article', { articleId: item.id })}
    />
  ), [navigation])

  return (
    <View style={styles.container}>
      {/* SearchBar séparée de la FlatList */}
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
      
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 60 + 20,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 20 },
  searchSection: {
    marginBottom: 16,
  },
})