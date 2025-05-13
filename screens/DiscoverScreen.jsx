// screens/DiscoverScreen.jsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import du logo Memorize
const LogoImg = require('../assets/icons/Memorize_icon.png');

// Exemple de données pour la section Discover
const articles = [
  { id: '1', title: 'Les bénéfices de la mémorisation sur le cerveau', time: 5 },
  { id: '2', title: 'Techniques simples pour une mémorisation efficace', time: 8 },
  { id: '3', title: 'Garder sa concentration en toutes circonstances', time: 7 },
  { id: '4', title: 'Créer des images mentales vives facilement', time: 4 },
];

export default function DiscoverScreen() {
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  // Extraction des mots-clés de la recherche
  const keywords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  // Filtrage des articles selon chaque mot-clé
  const filteredArticles = articles.filter(article =>
    keywords.length === 0 || keywords.every(word =>
      article.title.toLowerCase().includes(word)
    )
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Article', { articleId: item.id })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.timeContainer}>
        <Ionicons
          name="time-outline"
          size={16}
          color="#A2A2A2"
          style={styles.timeIcon}
        />
        <Text style={styles.timeText}>{item.time} min</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header comme sur HomeScreen */}

      {/* Barre de recherche sous le header */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher"
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {/* Liste des articles Discover */}
      <FlatList
        data={filteredArticles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun article trouvé</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 60,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 28,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 20,
    height: 40,
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingRight: 15,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 25,
    padding: 25,
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  cardTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
  },
  timeIcon: {
    marginBottom: 4,
  },
  timeText: {
    color: '#A2A2A2',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});
