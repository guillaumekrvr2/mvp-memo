// src/data/repositories/IRecordRepository.js

/**
 * Interface pour la persistance des meilleurs scores.
 * @interface
 */
export default class IRecordRepository {
  /**
   * Récupère le meilleur score pour un utilisateur et un mode variant.
   * @param {string} userId
   * @param {number} modeVariantId
   * @returns {Promise<{ score: number, ... }|null>} le record, ou null si aucun
   */
  async getBestScore(userId, modeVariantId) {
    throw new Error('Méthode not implemented');
  }

  /**
   * Enregistre ou met à jour le meilleur score pour un utilisateur et un variant de mode.
   * @param {string} userId 
   * @param {number} modeVariantId 
   * @param {number} score 
   * @returns {Promise<Object>} le record Supabase
   */
  async upsertBestScore(userId, modeVariantId, score) {
    throw new Error('Méthode not implemented');
  }

 /**
   * Récupère tous les meilleurs scores pour un utilisateur.
   * @param {string} userId
   * @returns {Promise<Array<{ user_id: string, mode_variants_id: string, score: number }>>}
   */
  async getAllBestScoresForUser(userId) {
    throw new Error('Méthode not implemented');
  }
}
