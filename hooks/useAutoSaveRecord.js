// hooks/useSaveRecord.js
import { useContext } from 'react';
import { supabase }    from '../data/supabaseClient';
import { AccountContext } from '../contexts/AccountContext';

export default function useSaveRecord() {
  const { current } = useContext(AccountContext);

  return async (discipline, { mode, score /*, time */ }) => {
    if (!current) throw new Error('No user logged in');

    // ATTENTION : votre table best_scores a ces colonnes → id, user_id, mode_variants_id, score
    const payload = {
      user_id:           current.id,
      mode_variants_id:  mode,    // ← utilisez le bon nom de colonne
      score,                   // ← pas de « time » dans best_scores, sauf si vous l’ajoutez au schéma
    };

    const { data, error } = await supabase
      .from('best_scores')
      .upsert([payload], {
        onConflict: ['user_id', 'mode_variants_id']
      });

    if (error) {
      console.error(`[useSaveRecord] erreur saving ${discipline}`, error);
      throw error;
    }
    return data;
  };
}
