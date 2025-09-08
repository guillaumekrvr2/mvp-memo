// data/supabase/SupabaseUserRepository.js

import { supabase } from './supabaseClient.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { Account } from '../../models/Account.js';
import { mapUserRowToAccount } from '../../adapters/supabase/userMapper.js';

/**
 * Implémentation concrète de UserRepository via Supabase.
 */
export class SupabaseUserRepository extends UserRepository {
  /**
   * Récupère tous les comptes (on pourra filtrer/ Trier plus tard selon mode/discipline).
   * @override
   */
  async findAll({ mode, discipline }) {
    
    // Utilise la vue publique accessible aux utilisateurs anonymes
    const { data: rows, error } = await supabase
      .from('public_leaderboard')
      .select('*')
      .order('created_at', { ascending: false });
      
      
    if (error) {
      console.error('Error fetching leaderboard profiles:', error);
      throw error;
    }

    // Mappe chaque ligne brute en instance Account
    const accounts = rows.map(raw =>
      new Account(mapUserRowToAccount(raw))
    );
    
    
    return accounts;
  }

  /**
   * Récupère un account par son ID.
   * @override
   */
  async findById(id) {
    const { data: raw, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return new Account(mapUserRowToAccount(raw));
  }
}