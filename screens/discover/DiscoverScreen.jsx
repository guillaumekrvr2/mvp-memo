import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDiscover } from '../../hooks/useDiscover'
import SearchBar from '../../components/atoms/SearchBar/SearchBar'
import ArticleList from '../../components/organisms/ArticleList/ArticleList'

export default function DiscoverScreen() {
  const { query, setQuery, filtered } = useDiscover() // ← Assure-toi d'avoir query et setQuery
  const nav = useNavigation()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec SearchBar flottante */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un article..."
          style={styles.searchBar}
        />
      </View>

      {/* Liste des articles */}
      <View style={styles.contentSection}>
        <ArticleList
          data={filtered}
          onPressItem={item => nav.navigate('Article', { articleId: item.id })}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // ou ton theme.colors.background
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fond semi-transparent
    backdropFilter: 'blur(10px)', // Effet de flou (iOS principalement)
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  searchBar: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentSection: {
    flex: 1,
  },
})