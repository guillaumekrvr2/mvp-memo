import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDiscover } from '../../hooks/useDiscover'
import SearchBar from '../../components/atoms/SearchBar/SearchBar'
import ArticleList from '../../components/organisms/ArticleList/ArticleList'

export default function DiscoverScreen() {
  const { query, setQuery, filtered } = useDiscover()
  const nav = useNavigation()

  return (
    <View style={styles.container}>
      {/* SearchBar juste sous le header, avec fond transparent */}
     <View style={styles.searchSection}>
        <SearchBar
  value={query}
  onChange={setQuery}
  placeholder="Rechercher un article..."
  style={{ 
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12
  }}
  searchBarStyle={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)' // ✅ Fond de la barre elle-même
  }}
/>
      </View>
      {/* Liste des articles */}
      <View style={styles.contentSection}>
        <ArticleList
          data={filtered}
          onPressItem={item => nav.navigate('Article', { articleId: item.id })}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // ou ton theme.colors.background
  },
  contentSection: {
    flex: 1,
    backgroundColor: 'transparent',
  },
})