// src/contexts/AccountContext.jsx

import React, { 
  createContext, 
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from 'react';
import { supabase } from '../data/supabase/supabaseClient';
import SupabaseRecordRepository from '../data/repositories/SupabaseRecordRepository';
import { GetBestScores } from '../usecases/GetBestScores';
import { SupabaseUserRepository } from '../data/repositories/SupabaseUserRepository';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_CONFIG } from '../config/google';

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Instancie le repository. `useMemo` est une optimisation pour éviter de le
  // recréer à chaque rendu du composant.
  const userRepo = useMemo(() => new SupabaseUserRepository(), []);

  // Configuration Google Sign-In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CONFIG.WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  // Charge et formate les meilleurs scores de l'utilisateur.
  // `useCallback` évite de recréer la fonction à chaque rendu.
  const loadUserRecords = useCallback(async (userId) => {
    if (!userId) return {};
    const repo = new SupabaseRecordRepository();
    const getBestScores = new GetBestScores(repo);
    const scoresArray = await getBestScores.execute({ userId });
    return scoresArray.reduce((acc, { discipline, score }) => {
      acc[discipline] = score;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    // 1. D'abord, on vérifie la session au chargement initial de l'app.
    // C'est très rapide car ça lit le stockage local.
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        // Si une session existe, on charge le profil complet de l'utilisateur.
        try {
          const account = await userRepo.findById();
          const records = await loadUserRecords(account.id);
          setCurrent({ ...account, records });
        } catch (error) {
          // Si le token est invalide ou expiré, une erreur sera levée.
          // On s'assure que l'utilisateur est bien déconnecté.
          console.warn('[AccountProvider:InitialSession]', 'Failed to fetch user profile, clearing session.', error);
          setCurrent(null);
        }
      }
      setLoading(false);
    });

    // 2. Ensuite, on met en place un écouteur pour les changements futurs.
    // C'est le "chef d'orchestre" de l'authentification.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          // Un utilisateur vient de se connecter.
          // On charge son profil complet.
          try {
            const account = await userRepo.findById();
            const records = await loadUserRecords(account.id);
            setCurrent({ ...account, records });
          } catch (error) {
            console.warn('[AccountProvider:SIGNED_IN]', 'Failed to fetch user profile on sign in.', error);
            setCurrent(null);
          }
        } else if (event === 'SIGNED_OUT') {
          // L'utilisateur s'est déconnecté.
          setCurrent(null);
        }
      }
    );

    // Nettoyage de l'écouteur quand le composant est démonté.
    return () => {
      subscription.unsubscribe();
    };
  }, [userRepo, loadUserRecords]); // Dépendances du useEffect

  // --- Fonctions d'Action (simplifiées) ---

  // L'état 'current' sera mis à jour automatiquement par onAuthStateChange.
  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // Pas besoin de setCurrent ici, onAuthStateChange s'en charge.
    return data.user;
  };

  // L'état 'current' sera mis à jour automatiquement par onAuthStateChange.
  const login = async (email, password) => {

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // Pas besoin de setCurrent ici, onAuthStateChange s'en charge.
    return data.user;
  };

  // Connexion avec Google
  const signInWithGoogle = async () => {
    try {
      // Vérifier si Google Play Services est disponible
      await GoogleSignin.hasPlayServices();
      
      // Obtenir les informations utilisateur de Google
      const userInfo = await GoogleSignin.signIn();
      
      // Obtenir le token ID pour Supabase
      const { idToken } = userInfo;
      
      // Se connecter avec Supabase en utilisant le token Google
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });
      
      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  // L'état 'current' sera mis à jour automatiquement par onAuthStateChange.
  const logout = async () => {
    try {
      // Déconnexion Google si connecté
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
    } catch (error) {
      console.warn('Google Sign-Out Error:', error);
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // Pas besoin de setCurrent ici, onAuthStateChange s'en charge.
  };

  // --- Fonctions de Données ---

  const updateRecord = async (modeVariantId, score) => {
    if (!current) return;
    const { data, error } = await supabase
      .from('best_scores')
      .upsert(
        [{ user_id: current.id, mode_variants_id: modeVariantId, score }],
        { onConflict: ['user_id', 'mode_variants_id'] }
      )
      .select();
    if (error) throw error;

    // Mise à jour de l'état local pour un retour visuel immédiat
    setCurrent(prev => ({
      ...prev,
      records: { ...prev.records, [modeVariantId]: score },
    }));
    return data;
  };

  // Exposition des valeurs via le Provider
  return (
    <AccountContext.Provider
      value={{ loading, current, signUp, login, signInWithGoogle, logout, updateRecord }}
    >
      {children}
    </AccountContext.Provider>
  );
}