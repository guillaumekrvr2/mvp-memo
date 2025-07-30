import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../data/supabaseClient';
import { mapUserRowToAccount } from '../adapters/supabase/userMapper';

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial check for an active session
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrent(mapUserRowToAccount(session.user));
        }
      } catch (error) {
        console.error('[AccountProvider] init error:', error);
      } finally {
        setLoading(false);
      }
    };
    init();

    // Listen for login / logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setCurrent(mapUserRowToAccount(session.user));
        } else {
          setCurrent(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign up via Auth only, no public.users calls
  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    const account = mapUserRowToAccount(data.user);
    setCurrent(account);
    return account;
  };

  // Login via Auth only
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const account = mapUserRowToAccount(data.user);
    setCurrent(account);
    return account;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setCurrent(null);
  };

  // Optionnel : mise à jour de scores (table best_scores)
  const updateRecord = async (modeVariantsId, score) => {
    if (!current) return;
    const { data, error } = await supabase
      .from('best_scores')
      .upsert([
        { user_id: current.id, mode_variants_id: modeVariantsId, score }
      ], { onConflict: ['user_id', 'mode_variants_id'] })
      .select();
    if (error) throw error;
    return data;
  };

  return (
    <AccountContext.Provider
      value={{ loading, current, signUp, login, logout, updateRecord }}
    >
      {children}
    </AccountContext.Provider>
  );
}
