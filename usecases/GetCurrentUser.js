// src/domain/usecases/GetCurrentUser.js

/**
 * Cas d’usage « GetCurrentUser »
 * Renvoie l’Account de l’utilisateur actuellement connecté.
 */
export class GetCurrentUser {
  /**
   * @param {import('../../data/repositories/UserRepository').UserRepository} userRepository
   *   Instance de SupabaseUserRepository (ou toute autre implémentation).
   */
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  /**
   * @returns {Promise<Account>}
   */
  async execute() {
    // On considère que findById(id) appelle supabase.auth.getUser() en interne
    // et remonte l’id de l’utilisateur connecté.
    return this.userRepository.findById()
  }
}
