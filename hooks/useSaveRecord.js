// hooks/useSaveRecord.js
import { useContext, useCallback } from 'react';
import { Alert } from 'react-native';
import { AccountContext } from '../contexts/AccountContext';

/**
 * Hook pour exposer une fonction saveRecord(discipline, { mode, score, time })
 */
export default function useSaveRecord() {
  const { updateRecord } = useContext(AccountContext);

  const saveRecord = useCallback(
    async (discipline, { mode, score, time }) => {
      console.log(`[useSaveRecord] saving ${discipline}`, { mode, score, time });
      try {
        await updateRecord(discipline, { mode, score, time });
        Alert.alert(
          'Record sauvegardé',
          `Discipline: ${discipline}\nMode: ${mode}\nScore: ${score}\nTemps: ${time}s`
        );
      } catch (e) {
        console.error(`[useSaveRecord] erreur saving ${discipline}`, e);
        Alert.alert('Erreur', "Impossible de sauvegarder le record.");
      }
    },
    [updateRecord]
  );

  return saveRecord;
}
