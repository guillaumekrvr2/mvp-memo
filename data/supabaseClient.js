if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

import 'react-native-url-polyfill/auto';  // déjà conseillé par Supabase pour React Native
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../config/supabaseConfig';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
