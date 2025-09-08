// usecases/WordsRandomizer.js
import wordsData from '../assets/words/words.json' with { type: 'json' };

/**
 * Service de sélection aléatoire de mots pour la discipline Words
 * Utilise l'algorithme Fisher-Yates pour une sélection performante et équitable
 */
export class WordsRandomizer {
  constructor() {
    this.wordsDatabase = wordsData.mots;
    this.totalWords = this.wordsDatabase.length;
  }

  /**
   * Sélectionne un nombre spécifié de mots aléatoires
   * @param {number} count - Nombre de mots à sélectionner
   * @returns {string[]} - Tableau de mots sélectionnés
   */
  getRandomWords(count) {
    // Validation des paramètres
    if (!count || count <= 0) {
      throw new Error('Le nombre de mots doit être supérieur à 0');
    }
    
    if (count > this.totalWords) {
      throw new Error(`Impossible de sélectionner ${count} mots, seulement ${this.totalWords} disponibles`);
    }

    // Pour de petites sélections, on utilise un Set pour éviter les doublons
    if (count <= this.totalWords * 0.1) {
      return this._selectSmallSample(count);
    }
    
    // Pour de grandes sélections, on utilise Fisher-Yates shuffle
    return this._selectLargeSample(count);
  }

  /**
   * Sélection optimisée pour un petit nombre de mots (≤10% du total)
   * @private
   */
  _selectSmallSample(count) {
    const selectedWords = new Set();
    const maxAttempts = count * 3; // Évite les boucles infinies
    let attempts = 0;

    while (selectedWords.size < count && attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * this.totalWords);
      selectedWords.add(this.wordsDatabase[randomIndex]);
      attempts++;
    }

    return Array.from(selectedWords);
  }

  /**
   * Sélection optimisée pour un grand nombre de mots (>10% du total)
   * Utilise l'algorithme Fisher-Yates shuffle
   * @private
   */
  _selectLargeSample(count) {
    // Copie du tableau pour ne pas modifier l'original
    const shuffledWords = [...this.wordsDatabase];
    
    // Fisher-Yates shuffle partiel (seulement les 'count' premiers éléments)
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * (this.totalWords - i)) + i;
      [shuffledWords[i], shuffledWords[randomIndex]] = [shuffledWords[randomIndex], shuffledWords[i]];
    }

    return shuffledWords.slice(0, count);
  }

  /**
   * Retourne le nombre total de mots disponibles
   * @returns {number}
   */
  getTotalWordsCount() {
    return this.totalWords;
  }

  /**
   * Vérifie si un nombre de mots demandé est valide
   * @param {number} count - Nombre de mots à vérifier
   * @returns {boolean}
   */
  isValidCount(count) {
    return count > 0 && count <= this.totalWords;
  }
}

// Instance singleton pour éviter de recharger les données
const wordsRandomizer = new WordsRandomizer();
export default wordsRandomizer;