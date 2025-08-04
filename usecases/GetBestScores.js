// domain/usecases/GetBestScores.js

/**
 * Cas d’usage « GetBestScores »
 * Orchestration de la récupération des meilleurs scores d’un utilisateur.
 */
export class GetBestScores {
  /**
   * @param {import('../repositories/RecordRepository').default} recordRepository
   */
  constructor(recordRepository) {
    this.recordRepository = recordRepository;
  }

  /**
   * Récupère tous les meilleurs scores pour un utilisateur,
   * et les renvoie sous forme de tableau d’objets { discipline, score }.
   * @param {Object} params
   * @param {string} params.userId
   * @returns {Promise<Array<{ discipline: string, score: number }>>}
   */
  async execute({ userId }) {
    // 1. Récupération des lignes brutes depuis le repository
    const rows = await this.recordRepository.getAllBestScoresForUser(userId);

    console.log(`[GetBestScores] rows for userId=${userId}:`, rows);


    // 2. Transformation en format { discipline, score }
    return rows.map(row => ({
      discipline: row.mode_variants_id,
      score:      row.score
    }))
  }
}