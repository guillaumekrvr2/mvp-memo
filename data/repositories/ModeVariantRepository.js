//repositories/ModeVariantRepository.js

/**
 * Port (interface) pour la récupération des variants de mode (mode_variants).
 * @interface
 */
export default class ModeVariantRepository {
  /**
   * Récupère tous les mode_variants.
   * @returns {Promise<Array<{ id: number, mode_id: number, discipline_id: number, label: string, duration_seconds: number }>>}
   */
  async getAll() {
    throw new Error('Méthode not implemented');
  }
}