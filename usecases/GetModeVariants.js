// domain/usecases/GetModeVariants.js
import ModeVariantRepository from '../data/repositories/ModeVariantRepository';

/**
 * Cas d’usage « GetModeVariants »
 * Récupère et formate la liste des variants de mode.
 */
export class GetModeVariants {
  /**
   * @param {ModeVariantRepository} modeVariantRepo
   */
  constructor(modeVariantRepo) {
    this.modeVariantRepo = modeVariantRepo;
  }

  /**
   * @returns {Promise<Array<{ id: number, label: string, disciplineId: number, duration: number }>>}
   */
  async execute() {
    const rows = await this.modeVariantRepo.getAll();
    // Transformation éventuelle du schéma (camelCase)
    return rows.map(r => ({
      id: r.id,
      label: r.label,
      disciplineId: r.discipline_id,
      duration: r.duration_seconds
    }));
  }
}