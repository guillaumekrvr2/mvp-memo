// src/contexts/AccountContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../data/supabase/supabaseClient';
import { mapUserRowToAccount } from '../adapters/supabase/userMapper';
import SupabaseRecordRepository from '../data/repositories/SupabaseRecordRepository';
import { GetBestScores } from '../usecases/GetBestScores';

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charge et formate tous les best scores sous forme plate { [variantId]: score }
  const loadUserRecords = async (userId) => {
    const repo = new SupabaseRecordRepository();
    const getBestScores = new GetBestScores(repo);
    // exécute le use case, renvoie [{ discipline, score }, ...]
    const scoresArray = await getBestScores.execute({ userId });
    // transforme en objet { modeVariantId: score }
    return scoresArray.reduce((acc, { discipline, score }) => {
      acc[discipline] = score;
      return acc;
    }, {});
  };

  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const account = mapUserRowToAccount(session.user);
          const records = await loadUserRecords(account.id);
          console.log(`[AccountContext] init records set for userId=${account.id}:`, records);
          setCurrent({ ...account, records });
        }
      } catch (error) {
        console.error('[AccountProvider] init error:', error);
      } finally {
        setLoading(false);
      }
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const account = mapUserRowToAccount(session.user);
        const records = await loadUserRecords(account.id);
        console.log(`[AccountContext] onAuth records set for userId=${account.id}:`, records);
        setCurrent({ ...account, records });
      } else {
        setCurrent(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const account = mapUserRowToAccount(data.user);
    const records = await loadUserRecords(account.id);
    console.log(`[AccountContext] signUp records set for userId=${account.id}:`, records);
    setCurrent({ ...account, records });
    return account;
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const account = mapUserRowToAccount(data.user);
    const records = await loadUserRecords(account.id);
    console.log(`[AccountContext] login records set for userId=${account.id}:`, records);

    setCurrent({ ...account, records });
    return account;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrent(null);
  };

  const updateRecord = async (modeVariantId, score) => {
    if (!current) return;

    const { data, error } = await supabase
      .from('best_scores')
      .upsert(
        [{ user_id: current.id, mode_variants_id: modeVariantId, score }],
        { onConflict: ['user_id', 'mode_variants_id'] }
      )
      .select();

    if (error) {
      throw error;
    }

    // Mise à jour locale immédiate
    setCurrent((prev) => ({
      ...prev,
      records: {
        ...prev.records,
        [modeVariantId]: score,
      },
    }));

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
