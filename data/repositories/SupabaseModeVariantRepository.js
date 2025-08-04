// data/repositories/SupabaseModeVariantRepository.js
import ModeVariantRepository from './ModeVariantRepository';
import { supabase } from '../supabase/supabaseClient';

/**
 * Implémentation Supabase de ModeVariantRepository.
 */
export default class SupabaseModeVariantRepository extends ModeVariantRepository {
  /**
   * @override
   */
  async getAll() {
    const { data, error } = await supabase
      .from('mode_variants')
      .select('id, mode_id, discipline_id, label, duration_seconds')
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('[SupabaseModeVariantRepository] getAll error:', error);
      throw error;
    }
    return data;
  }
}
