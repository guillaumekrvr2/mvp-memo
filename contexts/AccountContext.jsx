import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../data/supabaseClient';

export const AccountContext = createContext();

// Gardez exactement les mêmes clés dans value : accounts, current, loading,
// signUp, login, logout, updateRecord
export function AccountProvider({ children }) {
  const [accounts, setAccounts] = useState([]);   // tableau de tous les users
  const [current,  setCurrent]  = useState(null); // user connecté
  const [loading,  setLoading]  = useState(true);

  // --- chargement initial + écoute des changements d'auth
  useEffect(() => {
    (async () => {
      // 1) récupérer la session Supabase
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // 2) charger tous les profils
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('*');
        if (usersError) throw usersError;

        setAccounts(users);
        // 3) déduire le current
        const me = users.find(u => u.id === session.user.id) ?? null;
        setCurrent(me);
      }
      setLoading(false);
    })();

    // abonnement aux events login/logout
    const {
  data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      async (_event, session) => {
        if (session?.user) {
          const { data: users } = await supabase
            .from('users')
            .select('*');
          setAccounts(users);
          setCurrent(users.find(u => u.id === session.user.id) ?? null);
        } else {
          setAccounts([]);
          setCurrent(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- création de compte
  const signUp = async ({ firstName, lastName, email, password }) => {
    // 1) créer le user dans l’auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email, password
    });
    if (signUpError) throw signUpError;

    const userId = signUpData.user.id;
    // 2) créer la ligne profil dans public.users
    const { data: newUser, error: profileError } = await supabase
      .from('users')
      .insert([{
        id:           userId,
        first_name:   firstName,
        second_name:  lastName,
        display_name: `${firstName} ${lastName}`,
        email,
      }])
      .select()
      .single();
    if (profileError) throw profileError;

    // 3) mise à jour locale
    setAccounts(prev => [...prev, newUser]);
    setCurrent(newUser);
    return newUser;
  };

  // --- connexion
  const login = async (email, password) => {
    // 1) Supabase Auth
    const { data: loginData, error: loginError } = await supabase
      .auth.signInWithPassword({ email, password });
    if (loginError) throw loginError;

    const userId = loginData.user.id;
    // 2) on met à jour last_login_date et on récupère le profil
    const { data: me, error: profileError } = await supabase
      .from('users')
      .update({ last_login_date: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    if (profileError) throw profileError;

    setCurrent(me);
    // on peut rafraîchir accounts si besoin :
    setAccounts(prev => prev.map(u => u.id === me.id ? me : u));
    return me;
  };

  // --- déconnexion
  const logout = async () => {
    await supabase.auth.signOut();
    setCurrent(null);
    setAccounts([]);
  };

  // --- mise à jour d’un record
const updateRecord = async (modeVariantsId, score) => {
  if (!current) return;

  // exemple : on insert ou on upsert pour écraser l’ancienne
  const { data, error } = await supabase
    .from('best_scores')
    .upsert([
      { user_id: current.id, mode_variants_id: mode, score }
    ], { onConflict: ['user_id', 'mode_variants_id'] })
    .select();

  if (error) throw error;
  return data;
};


  return (
    <AccountContext.Provider value={{
      loading, accounts, current,
      signUp, login, logout, updateRecord
    }}>
      {children}
    </AccountContext.Provider>
  );
}
