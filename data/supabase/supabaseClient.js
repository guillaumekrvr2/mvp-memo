// supabaseClient.js

// Polyfill pour structuredClone (si nécessaire)
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// Polyfill URL, atob, etc. pour React Native
import 'react-native-url-polyfill/auto';

// Storage persistant pour React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// Client Supabase
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../../config/supabaseConfig';

// Intercepteur global pour logger toutes les requêtes/réponses Supabase
const customFetch = async (url, options) => {
  console.log('[Supabase Fetch →]', url, options);
  const res = await fetch(url, options);
  // On clone la réponse pour lire son JSON sans le « consommer »
  const clone = res.clone();
  clone
    .json()
    .then(json => console.log('[Supabase Fetch Response JSON →]', json))
    .catch(() => { /* pas du JSON, on ignore */ });
  return res;
};

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      // Stockage natif des tokens
      storage: AsyncStorage,
      storageKey: 'sb:auth',
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
    global: {
      // On passe notre fetch custom pour intercepter tout
      fetch: customFetch,
    },
  }
);
