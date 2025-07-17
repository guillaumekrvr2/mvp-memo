// src/data/supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON } from '../config/supabase.config'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
