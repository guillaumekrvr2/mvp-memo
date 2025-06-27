useDiscover Hook
Description générale
useDiscover est un hook qui gère la recherche d’articles à partir d’un jeu de données local. Il fournit un champ de requête et une liste filtrée basée sur les mots-clés extraits de cette requête.

Fonctionnalités clés
query (string) : état de la chaîne de recherche saisie par l’utilisateur.

setQuery (function) : setter pour mettre à jour query.

allArticles (Article[]) : liste complète des articles importés depuis ArticlesRepository.json, mémorisée via useMemo pour éviter les recalculs.

keywords (string[]) : tableau de mots-clés nettoyés, obtenu en découpant query sur les espaces, en minuscules, et en filtrant les chaînes vides.

filtered (Article[]) : liste des articles retournés par filterArticles(allArticles, keywords), recalculée via useMemo lorsque keywords changent.

Signature
ts
Copier
Modifier
function useDiscover(): {
  query: string;
  setQuery: (value: string) => void;
  filtered: Article[];
}
Code commenté
jsx
Copier
Modifier
export function useDiscover() {
  // 1) État de la requête de recherche
  const [query, setQuery] = useState('')

  // 2) Récupère tous les articles (memoisé)
  const allArticles = useMemo(() => articles, [])

  // 3) Transforme la requête en mots-clés
  const keywords = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query]
  )

  // 4) Filtrage des articles
  const filtered = useMemo(
    () => filterArticles(allArticles, keywords),
    [allArticles, keywords]
  )

  // 5) Expose la requête, son setter et les articles filtrés
  return { query, setQuery, filtered }
}
Exemple d’utilisation
jsx
Copier
Modifier
function ArticleList() {
  const { query, setQuery, filtered } = useDiscover()

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Rechercher des articles..."
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ArticleCard article={item} />}
      />
    </View>
  )
}
Cette section documente useDiscover, la gestion de la requête et l’application de filterArticles pour retourner une liste recherchée d’articles.







