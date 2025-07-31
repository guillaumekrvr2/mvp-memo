// supabaseClient.js

// Polyfill pour structuredClone (si nécessaire)
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// Polyfill URL, atob, etc. pour React Native
import 'react-native-url-polyfill/auto.js';

// Storage persistant pour React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// Client Supabase
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../../config/supabaseConfig';

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
  }
);
