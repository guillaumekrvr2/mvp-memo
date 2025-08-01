// src/data/repositories/SupabaseRecordRepository.js
 import IRecordRepository from './IRecordRepository';
 import { supabase }            from '../supabase/supabaseClient';

 /**
  * Implémentation Supabase de IRecordRepository.
  */
 export default class SupabaseRecordRepository extends IRecordRepository {
   /**
    * @override
    */
   async getBestScore(userId, modeVariantId) {
     const { data, error } = await supabase
       .from('best_scores')
       .select('*')
       .eq('user_id', userId)
       .eq('mode_variants_id', modeVariantId)
       .single();

     if (error && error.code !== 'PGRST116') {
       console.error('[SupabaseRecordRepository] getBestScore error:', error);
       throw error;
     }
     return data;
   }

   /**
    * @override
    */
   async upsertBestScore(userId, modeVariantId, score) {
     const payload = { user_id: userId, mode_variants_id: modeVariantId, score };

     const { data, error } = await supabase
       .from('best_scores')
       .upsert([payload], {
         onConflict: ['user_id', 'mode_variants_id'],
       })
       .select();

     if (error) {
       console.error('[SupabaseRecordRepository] upsertBestScore error:', error);
       throw error;
     }
     return data[0];
   }

  /**
   * Récupère tous les best scores pour un utilisateur.
   * @param {string} userId
   * @returns {Promise<Array<{id, user_id, mode_variants_id, score}>>}
   */
  async getAllBestScoresForUser(userId) {
    const { data, error } = await supabase
      .from('best_scores')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('[SupabaseRecordRepository] getAllBestScoresForUser error:', error);
      throw error;
    }
    return data;
  }
 }
