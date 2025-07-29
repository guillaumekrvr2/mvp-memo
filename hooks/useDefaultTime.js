// src/hooks/useDefaultTime.js
import useHybridUserPreference from './useHybridUserPreference'
import { defaultTimes } from '../config/gameConfig'

export default function useDefaultTime(mode) {
  const key = `numbers:defaultTime:${mode}`
  const init = String(defaultTimes[mode] || 0)
  const { value: temps, setValue: setTemps } =
    useHybridUserPreference(key, init)

  // on le retourne en number pour l’app
  return { temps: parseInt(temps,10) || 0, setTemps }
}
