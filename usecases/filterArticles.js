//usecases/filterArticles.js

/**
 * Filtre une liste d'articles selon un tableau de mots-clés.
 *
 * @param {Array<{ id: string, title: string, time: number }>} articles
 * @param {string[]} keywords
 * @returns {Array<{ id: string, title: string, time: number }>}
 */
export function filterArticles(articles, keywords) {
    if (!keywords || keywords.length === 0) {
      // Pas de recherche ⇒ on renvoie tout
      return articles;
    }
  
    // Pour chaque article, on vérifie que chaque mot-clé est présent dans le titre
    return articles.filter(article =>
      keywords.every(word =>
        article.title.toLowerCase().includes(word.toLowerCase())
      )
    );
  }
  