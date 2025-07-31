// hooks/useSaveRecord.js
import { useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../data/supabase/supabaseClient';
import { AccountContext } from '../contexts/AccountContext';

export default function useSaveRecord() {
  const { current } = useContext(AccountContext);

  return useCallback(
    async (discipline, { mode, score, time }) => {
      if (!current) throw new Error('No user logged in');

      const payload = {
        user_id:          current.id,
        mode_variants_id: mode,
        score,                   // si vous ajoutez cette colonne en DB
      };

      const { data, error } = await supabase
        .from('best_scores')
        .upsert([payload], { onConflict: ['user_id','mode_variants_id'] });

      if (error) {
        console.error(`[useSaveRecord] erreur saving ${discipline}`, error);
        Alert.alert('Impossible de sauvegarder le record');
      } else {
        console.log('[useSaveRecord] saved!', data);
        Alert.alert(
          'Record sauvegardé',
          `Discipline: ${discipline}\nMode: ${mode}\nScore: ${score}\nTemps: ${time}s`
        );
      }
    },
    [current]
  );
}
