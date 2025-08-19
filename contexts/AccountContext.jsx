// src/contexts/AccountContext.jsx

import React, { 
  createContext, 
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from 'react';
import { AppState } from 'react-native';
import { supabase } from '../data/supabase/supabaseClient';
import SupabaseRecordRepository from '../data/repositories/SupabaseRecordRepository';
import { GetBestScores } from '../usecases/GetBestScores';
import { SupabaseUserRepository } from '../data/repositories/SupabaseUserRepository';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { makeRedirectUri } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';

// CRITIQUE : Permet à WebBrowser de fermer automatiquement la popup
WebBrowser.maybeCompleteAuthSession();
// TODO: Décommenter pour le build natif
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GOOGLE_CONFIG } from '../config/google';

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDiscordAuthInProgress, setIsDiscordAuthInProgress] = useState(false);

  // Instancie le repository. `useMemo` est une optimisation pour éviter de le
  // recréer à chaque rendu du composant.
  const userRepo = useMemo(() => new SupabaseUserRepository(), []);

  // TODO: Décommenter pour le build natif
  // Configuration Google Sign-In
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: GOOGLE_CONFIG.WEB_CLIENT_ID,
  //     offlineAccess: true,
  //   });
  // }, []);

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

  // Gestionnaire pour les deep links (retour de Discord OAuth)
  useEffect(() => {
    console.log('[DeepLink] Setting up deep link listeners...');
    
    const handleDeepLink = async (url) => {
      console.log('[DeepLink] Deep link reçu:', url);
      
      if (url) {
        // Si c'est un retour d'auth Discord, forcer le refresh même sans tokens
        if (url.includes('auth-callback') || url.includes('discord')) {
          console.log('[DeepLink] Discord callback detected, forcing session refresh...');
          setIsDiscordAuthInProgress(false);
          
          // Attendre un peu puis forcer le refresh complet
          setTimeout(async () => {
            console.log('[DeepLink] Attempting to recover session...');
            
            // Essayer plusieurs méthodes pour récupérer la session
            try {
              // Method 1: refresh session
              console.log('[DeepLink] Method 1: Refreshing session...');
              await supabase.auth.refreshSession();
              
              // Method 2: getSession après refresh
              setTimeout(async () => {
                const { data: { session } } = await supabase.auth.getSession();
                console.log('[DeepLink] Session after refresh:', { hasSession: !!session, email: session?.user?.email });
                
                if (session) {
                  console.log('[DeepLink] Session recovered! Loading profile...');
                  forceRefreshUserState();
                }
              }, 500);
              
            } catch (error) {
              console.error('[DeepLink] Error during session recovery:', error);
            }
          }, 1000);
        }
        
        // Traitement normal des tokens s'ils existent
        if (url.includes('#')) {
          console.log('[DeepLink] Processing fragment parameters...');
          try {
            const fragment = url.split('#')[1];
            const params = new URLSearchParams(fragment);
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');
            
            console.log('[DeepLink] Tokens trouvés:', { accessToken: !!accessToken, refreshToken: !!refreshToken });
            
            if (accessToken) {
              console.log('[DeepLink] Setting Supabase session...');
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              });
              
              if (error) {
                console.error('[DeepLink] Erreur lors de la définition de la session:', error);
              } else {
                console.log('[DeepLink] Session définie avec succès:', data);
                forceRefreshUserState();
              }
            }
          } catch (error) {
            console.error('[DeepLink] Erreur lors du traitement des fragments:', error);
          }
        }
      }
    };

    // Écouter les deep links
    const subscription = Linking.addEventListener('url', (event) => {
      console.log('[DeepLink] Event received:', event);
      handleDeepLink(event.url);
    });

    // Vérifier si l'app a été ouverte avec un deep link
    Linking.getInitialURL().then((url) => {
      console.log('[DeepLink] Initial URL:', url);
      if (url) {
        handleDeepLink(url);
      }
    });

    // Vérifier la session Supabase toutes les 2 secondes après l'auth
    const sessionCheckInterval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && !current) {
        console.log('[DeepLink] Session détectée par polling:', session.user.email);
        clearInterval(sessionCheckInterval);
      }
    }, 2000);

    return () => {
      subscription?.remove();
      clearInterval(sessionCheckInterval);
    };
  }, []);

  // Fonction pour forcer la mise à jour de l'état utilisateur
  const forceRefreshUserState = useCallback(async () => {
    console.log('[ForceRefresh] ========== STARTING FORCED REFRESH ==========');
    try {
      console.log('[ForceRefresh] Getting current session...');
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('[ForceRefresh] Session result:', { 
        hasSession: !!session, 
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        error: error?.message 
      });
      
      if (session && session.user) {
        console.log('[ForceRefresh] Session found, loading user profile...');
        const account = await userRepo.findById();
        const records = await loadUserRecords(account.id);
        console.log('[ForceRefresh] Profile loaded:', account);
        setCurrent({ ...account, records });
        console.log('[ForceRefresh] User state updated successfully!');
      } else {
        console.log('[ForceRefresh] No session found, setting current to null');
        setCurrent(null);
      }
    } catch (error) {
      console.error('[ForceRefresh] ERROR during forced refresh:', error);
      setCurrent(null);
    }
    console.log('[ForceRefresh] ========== FORCED REFRESH COMPLETE ==========');
  }, [userRepo, loadUserRecords]);

  // Listener pour détecter le retour de l'auth Discord
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      console.log('[AppState] App state changed to:', nextAppState);
      
      if (nextAppState === 'active' && isDiscordAuthInProgress) {
        console.log('[AppState] App became active after Discord auth, forcing session refresh...');
        setIsDiscordAuthInProgress(false);
        
        // SOLUTION: Forcer le refresh de la session immédiatement
        setTimeout(async () => {
          try {
            console.log('[AppState] Step 1: Refreshing Supabase session...');
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            console.log('[AppState] Refresh result:', { success: !refreshError, error: refreshError?.message });
            
            console.log('[AppState] Step 2: Getting current session...');
            const { data: { session }, error: getError } = await supabase.auth.getSession();
            console.log('[AppState] Session result:', { 
              hasSession: !!session, 
              userId: session?.user?.id,
              email: session?.user?.email 
            });
            
            if (session && !current) {
              console.log('[AppState] SUCCESS! Session found, updating user state...');
              forceRefreshUserState();
            } else if (!session) {
              console.log('[AppState] No session found after refresh');
            }
          } catch (error) {
            console.error('[AppState] Error during session recovery:', error);
          }
        }, 1000);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [isDiscordAuthInProgress, forceRefreshUserState, current]);

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

  // TODO: Décommenter pour le build natif
  // Connexion avec Google
  const signInWithGoogle = async () => {
    throw new Error('Google Sign-in pas disponible dans Expo Go');
  };

  // Connexion avec Discord - Solution officielle Supabase
  const signInWithDiscord = async () => {
    try {
      console.log('[signInWithDiscord] Starting Discord OAuth...');
      setIsDiscordAuthInProgress(true);
      
      // Créer l'URL de redirection pour Expo
      const redirectUrl = makeRedirectUri({
        scheme: 'exp'
      });
      
      console.log('[signInWithDiscord] Redirect URL:', redirectUrl);
      
      // ESSENTIEL: utiliser skipBrowserRedirect pour React Native/Expo
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true  // 🔑 SOLUTION: obligatoire pour React Native
        }
      });
      
      if (error) {
        console.error('[signInWithDiscord] OAuth error:', error);
        setIsDiscordAuthInProgress(false);
        throw error;
      }
      
      // Ouvrir la session OAuth avec WebBrowser
      if (data?.url) {
        console.log('[signInWithDiscord] Opening auth session with URL:', data.url);
        
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );
        
        console.log('[signInWithDiscord] Auth session result:', result);
        
        if (result.type === 'success' && result.url) {
          console.log('[signInWithDiscord] Success! Processing callback URL:', result.url);
          
          // Extraire les tokens - ils peuvent être dans le fragment (#) ou les query params (?)
          let accessToken = null;
          let refreshToken = null;
          
          if (result.url.includes('#')) {
            console.log('[signInWithDiscord] Parsing tokens from fragment...');
            const fragment = result.url.split('#')[1];
            const params = new URLSearchParams(fragment);
            accessToken = params.get('access_token');
            refreshToken = params.get('refresh_token');
          } else if (result.url.includes('?')) {
            console.log('[signInWithDiscord] Parsing tokens from query params...');
            const url = new URL(result.url);
            accessToken = url.searchParams.get('access_token');
            refreshToken = url.searchParams.get('refresh_token');
          }
          
          console.log('[signInWithDiscord] Token extraction result:', { 
            hasAccessToken: !!accessToken, 
            hasRefreshToken: !!refreshToken,
            urlFormat: result.url.includes('#') ? 'fragment' : 'query'
          });
          
          if (accessToken && refreshToken) {
            console.log('[signInWithDiscord] Tokens found, creating session...');
            
            // Créer la session avec les tokens
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (sessionError) {
              console.error('[signInWithDiscord] Session creation error:', sessionError);
              throw sessionError;
            }
            
            console.log('[signInWithDiscord] Session created successfully!');
            setIsDiscordAuthInProgress(false);
            
            // La session va automatiquement déclencher onAuthStateChange
            return sessionData;
          } else {
            throw new Error('No tokens found in callback URL');
          }
        } else if (result.type === 'cancel') {
          console.log('[signInWithDiscord] User cancelled OAuth');
          setIsDiscordAuthInProgress(false);
        } else {
          throw new Error(`OAuth failed: ${result.type}`);
        }
      }
      
      return data;
    } catch (error) {
      console.error('[signInWithDiscord] Error:', error);
      setIsDiscordAuthInProgress(false);
      throw error;
    }
  };
  // const signInWithGoogle = async () => {
  //   try {
  //     // Vérifier si Google Play Services est disponible
  //     await GoogleSignin.hasPlayServices();
  //     
  //     // Obtenir les informations utilisateur de Google
  //     const userInfo = await GoogleSignin.signIn();
  //     
  //     // Obtenir le token ID pour Supabase
  //     const { idToken } = userInfo;
  //     
  //     // Se connecter avec Supabase en utilisant le token Google
  //     const { data, error } = await supabase.auth.signInWithIdToken({
  //       provider: 'google',
  //       token: idToken,
  //     });
  //     
  //     if (error) throw error;
  //     return data.user;
  //   } catch (error) {
  //     console.error('Google Sign-In Error:', error);
  //     throw error;
  //   }
  // };

  // L'état 'current' sera mis à jour automatiquement par onAuthStateChange.
  const logout = async () => {
    // TODO: Décommenter pour le build natif
    // try {
    //   // Déconnexion Google si connecté
    //   const isSignedIn = await GoogleSignin.isSignedIn();
    //   if (isSignedIn) {
    //     await GoogleSignin.signOut();
    //   }
    // } catch (error) {
    //   console.warn('Google Sign-Out Error:', error);
    // }
    
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
      value={{ loading, current, signUp, login, signInWithGoogle, signInWithDiscord, logout, updateRecord, forceRefreshUserState }}
    >
      {children}
    </AccountContext.Provider>
  );
}