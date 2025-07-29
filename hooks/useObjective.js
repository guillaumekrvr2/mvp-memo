// src/hooks/useObjective.js
import useHybridUserPreference from './useHybridUserPreference'
import { defaultTimes } from '../config/gameConfig'

export default function useObjective(mode) {
  const key = `numbers:objectif:${mode}`
  const init = (mode==='memory-league' || mode==='iam') ? '60' : ''
  const { value: objectif, setValue: setObjectif } =
    useHybridUserPreference(key, init)

  return { objectif, setObjectif }
}
