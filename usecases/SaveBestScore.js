// src/domain/usecases/SaveBestScore.js

/**
 * Use-case : enregistre un score uniquement s’il est supérieur à l’existant.
 */
export default class SaveBestScore {
  /**
   * @param {Object} deps
   * @param {IRecordRepository} deps.recordRepository  – port pour persister les scores
   */
  constructor({ recordRepository }) {
    this.recordRepository = recordRepository;
  }

  /**
   * Exécute la sauvegarde conditionnelle.
   *
   * @param {string} userId            – id de l'utilisateur
   * @param {number} modeVariantId     – id du variant de mode
   * @param {number} newScore          – score obtenu
   * @returns {Promise<{ updated: boolean, record: Object }>}
   *          updated = false si score pas meilleur, true sinon
   */
  async execute(userId, modeVariantId, newScore) {
    // 0. Validation : ignorer les scores de 0 ou négatifs
    if (newScore <= 0) {
      return { updated: false, record: null };
    }

    // 1. Récupérer l'ancien record (null si aucun)
    const existing = await this.recordRepository.getBestScore(userId, modeVariantId);

    // 2. Si on a déjà un score ≥ newScore, on ne fait rien
    if (existing && existing.score >= newScore) {
      return { updated: false, record: existing };
    }

    // 3. Sinon, on upsert le nouveau meilleur score
    const saved = await this.recordRepository.upsertBestScore(
      userId,
      modeVariantId,
      newScore
    );

    return { updated: true, record: saved };
  }
}
