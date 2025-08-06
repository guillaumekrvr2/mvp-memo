// screens/discover/DiscoverScreen.jsx
import { SafeAreaView, View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDiscover } from '../../hooks/useDiscover'
import ArticleList from '../../components/organisms/ArticleList/ArticleList'

export default function DiscoverScreen() {
  const { filtered } = useDiscover()
  const nav = useNavigation()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Espaceur pour éviter le header transparent */}

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
    backgroundColor: 'transparent',
  },
  headerSpacer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 24,
  },
  searchSection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  resultsCount: {
    color: '#a0a9c0',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 20,
    paddingLeft: 4,
  },
})
