import { supabase } from './supabaseClient'

/**
 * Récupère tous les users + leurs best_scores (tous modes)
 * pour pouvoir ensuite filtrer / mapper au niveau supérieur.
 */
export async function fetchAllUsersWithScores() {
  const { data, error } = await supabase
    .from('public.users')
    .select(`
      id,
      first_name,
      second_name,
      best_scores (
        mode_variants_id,
        score
      )
    `)

  if (error) {
    throw error
  }
  return data
}
