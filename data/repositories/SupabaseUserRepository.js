// src/data/repositories/SupabaseUserRepository.js
import { mapUserRowToAccount } from '../../adapters/supabase/userMapper'
import { supabase } from '../supabase/supabaseClient.js'

export class SupabaseUserRepository {
  /**
   * Récupère l’utilisateur courant (session must exist).
   * @returns {Promise<Account>}
   */
  async findById(/* id n’est plus nécessaire */) {
    // 1️⃣ Récupère l’utilisateur via l’API Auth
    // Cette fonction utilisera maintenant le client partagé et trouvera la session
    const {
      data: { user: authUser },
      error: authError
    } = await supabase.auth.getUser()
    if (authError) throw authError
    if (!authUser) {
      throw new Error('Aucun utilisateur authentifié')
    }

    // 2️⃣ Récupère prénom/nom dans public.users
    const { data: publicUser, error: publicError } = await supabase
      .from('users')
      .select('first_name, second_name')
      .eq('id', authUser.id)
      .maybeSingle()
    if (publicError) throw publicError

    // 3️⃣ Assemble et mappe
    return mapUserRowToAccount({
      id:          authUser.id,
      email:       authUser.email,
      first_name:  publicUser?.first_name  ?? '',
      second_name: publicUser?.second_name ?? ''
    })
  }

  /** 
   * Si tu as besoin de findAll, il ira chercher public.users 
   */
  async findAll() {
    const { data: rows, error } = await supabase
      .from('users')
      .select('id, email, first_name, second_name')
    if (error) throw error

    return rows.map(raw =>
      mapUserRowToAccount({
        id:         raw.id,
        email:      raw.email,
        first_name: raw.first_name,
        second_name: raw.second_name
      })
    )
  }
}
