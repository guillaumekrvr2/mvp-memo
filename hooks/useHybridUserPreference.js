// src/hooks/useHybridUserPreference.js
import { useState, useEffect, useCallback, useContext } from 'react'
import { supabase } from '../data/supabaseClient'
import { AccountContext } from '../contexts/AccountContext'
import useAsyncStorageState from './useAsyncStorageState'

export default function useHybridUserPreference(key, initialValue = '') {
  // 1. Récupération du user courant depuis le contexte
  const { current } = useContext(AccountContext)
  const userId = current?.id

  // 2. Stockage local (pour offline / non-connecté)
  const [localValue, setLocalValue] = useAsyncStorageState(key, initialValue)
  const [value, setValue] = useState(localValue)

  // 3. Au montage ou à la connexion : charger Supabase si on a un userId
  useEffect(() => {
    // Si pas de user, on reste sur la valeur locale
    if (!userId) {
      setValue(localValue)
      return
    }

    let isActive = true
    ;(async () => {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('value')
        .eq('user_id', userId)
        .eq('key', key)
        .single()

      if (!isActive) return
      if (error && error.code !== 'PGRST116') {
        console.error('useHybridUserPreference load error', error)
      } else if (data?.value != null) {
        setValue(data.value)
        setLocalValue(data.value)    // on synchronise le cache local
      } else {
        setValue(localValue)         // pas de valeur en base → on reste sur le local
      }
    })()

    return () => { isActive = false }
  }, [userId, key, localValue, setLocalValue])

  // 4. À chaque mise à jour : écrire en local, puis en cloud si connecté
  const update = useCallback(async newVal => {
    setValue(newVal)
    setLocalValue(newVal)
    if (!userId) return

    const { error } = await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, key, value: String(newVal) })

    if (error) console.error('useHybridUserPreference save error', error)
  }, [userId, key, setLocalValue])

  return { value, setValue: update }
}
