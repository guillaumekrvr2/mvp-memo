import { SafeAreaView, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDiscover } from '../../hooks/useDiscover'
import SearchBar   from '../../components/atoms/SearchBar/SearchBar'
import ArticleList from '../../components/organisms/ArticleList/ArticleList'

export default function DiscoverScreen() {
  const { query, setQuery, filtered } = useDiscover()
  const nav = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      {/* ton header ici */}
      <View style={styles.topBar}>{/* logo + profil… */}</View>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Rechercher un article"
      />

      <ArticleList
        data={filtered}
        onPressItem={item => nav.navigate('Article', { articleId: item.id })}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 40 },
  topBar: { /* tes styles existants */ },
})
