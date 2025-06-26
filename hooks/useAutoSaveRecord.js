import { useEffect, useContext } from 'react';
import useSaveRecord from './useSaveRecord';
import { AccountContext } from '../contexts/AccountContext';

/**
 * Auto-save un record dès qu’il est “meilleur” qu’un précédent.
 *
 * @param {string}  discipline    e.g. 'numbers', 'words', etc.
 * @param {string}  mode          e.g. 'memory-league', 'iam', ...
 * @param {number}  score
 * @param {number}  time          en secondes
 * @param {string[]} modesToAuto  listes des modes pour lesquels on fait l’auto-save
 */

export default function useAutoSaveRecord(
  discipline,
  mode,
  score,
  time,
  modesToAuto = ['memory-league', 'iam']
) {
  const { current } = useContext(AccountContext);
  const saveRecord = useSaveRecord();

  useEffect(() => {
    // on ne fait rien si mode non concerné ou si pas de user connecté
    if (!modesToAuto.includes(mode) || !current) return;

    // accès sûr à current.records grâce au test ci-dessus
    const prev = current.records[discipline]?.[mode];
    const lastScore = prev?.score;
    const lastTime  = prev?.time;

    const isNewRecord =
      !prev ||
      (time === lastTime && score > lastScore) ||
      (score === lastScore && time < lastTime);

    if (isNewRecord) {
      saveRecord(discipline, { mode, score, time });
    }
  }, [discipline, mode, score, time, current, saveRecord, modesToAuto]);
}
