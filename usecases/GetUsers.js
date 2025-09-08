// domain/usecases/GetUsers.js

/**
 * Cas d’usage « GetUsers »
 * Orchestration de la récupération des comptes, avec
 * possibilité d’ajouter du tri/filtre métier.
 */
export class GetUsers {
  /**
   * @param {import('../repositories/UserRepository').UserRepository} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Récupère la liste des comptes, triés/filtrés selon la discipline et le mode.
   * @param {Object} params
   * @param {string} params.mode
   * @param {string} params.discipline
   * @returns {Promise<Account[]>}
   */
  async execute({ mode, discipline }) {
    
    // 1. On invoque le repository pour récupérer tous les comptes
    const accounts = await this.userRepository.findAll({ mode, discipline });
    
    // 2. Ici tu peux ajouter ta logique métier :
    //    - Tri par score sur la discipline demandée
    //    - Filtrage de comptes « inactifs »
    //    - Calcul de statistiques globales, etc.
    //
    // Pour l'instant, on renvoie brut :
    return accounts;
  }
}
