/**
 * Interface abstraite pour la gestion des comptes.
 * @interface
 */
export class UserRepository {
  /**
   * Récupère tous les comptes d’utilisateurs, éventuellement filtrés ou triés.
   * @param {Object} options
   * @param {string} options.mode       Clé du mode de jeu
   * @param {string} options.discipline Clé de la discipline
   * @returns {Promise<Account[]>}
   */
  async findAll({ mode, discipline }) {
    throw new Error('UserRepository.findAll() non implémenté');
  }

  /**
   * Récupère un compte par son identifiant.
   * @param {string} id
   * @returns {Promise<Account|null>}
   */
  async findById(id) {
    throw new Error('UserRepository.findById() non implémenté');
  }

  // tu pourras ajouter d’autres opérations métier ici…
}
