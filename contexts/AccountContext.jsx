import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AccountContext = createContext();

const ACCOUNTS_KEY    = '@app:accounts';
const CURRENT_KEY     = '@app:current_user';

export function AccountProvider({ children }) {
  const [accounts, setAccounts]     = useState([]);      // liste des comptes
  const [current, setCurrent]       = useState(null);    // compte connecté
  const [loading, setLoading]       = useState(true);

  // 1) Chargement au démarrage
  useEffect(() => {
    (async () => {
      try {
        const rawAccounts = await AsyncStorage.getItem(ACCOUNTS_KEY);
        setAccounts(rawAccounts ? JSON.parse(rawAccounts) : []);
        const rawCurrent = await AsyncStorage.getItem(CURRENT_KEY);
        setCurrent(rawCurrent ? JSON.parse(rawCurrent) : null);
      } catch (e) {
        console.error('AccountContext load error', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) Persistance helper
  const persist = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  // 3) Création de compte
  const signUp = async ({ firstName, lastName, email, password }) => {
    // empêcher doublons d’email
    if (accounts.find(a => a.email === email)) {
      throw new Error('Cet email est déjà utilisé');
    }
    const newAcct = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password,       // pour MVP, stocké en clair
      records: {}     // ex. { discipline1: 123, discipline2: 45 }
    };
    const updated = [...accounts, newAcct];
    setAccounts(updated);
    await persist(ACCOUNTS_KEY, updated);
    // auto-login
    setCurrent(newAcct);
    await persist(CURRENT_KEY, newAcct);
  };

  // 4) Connexion
  const login = async (email, password) => {
    const acct = accounts.find(a => a.email === email && a.password === password);
    if (!acct) throw new Error('Identifiants invalides');
    setCurrent(acct);
    await persist(CURRENT_KEY, acct);
  };

  // 5) Déconnexion
  const logout = async () => {
    setCurrent(null);
    await AsyncStorage.removeItem(CURRENT_KEY);
  };

  // 6) Mise à jour d’un record
// dans AccountContext.js, à la place de l’actuel updateRecord :
const updateRecord = async (discipline, value) => {
  if (!current) return;

  let newRecords;
  if (discipline === 'numbers' && value.mode) {
    // fusionne au lieu d’écraser
    newRecords = {
      ...current.records,
      numbers: {
        // récupère l’ancien sous-objet numbers (ou vide)
        ...(current.records.numbers || {}),
        // ajoute/écrase la clé spécifique au mode choisi
        [value.mode]: {
          score: value.score,
          time:  value.time
        }
      }
    }
  } else {
    // comportement inchangé pour les autres épreuves
    newRecords = {
      ...current.records,
      [discipline]: value
    }
  }

  const updatedCurr = {
    ...current,
    records: newRecords
  };
  // persistance inchangée
  const updatedList = accounts.map(a =>
    a.id === current.id ? updatedCurr : a
  );
  setAccounts(updatedList);
  setCurrent(updatedCurr);
  await persist(ACCOUNTS_KEY, updatedList);
  await persist(CURRENT_KEY, updatedCurr);
};


  return (
    <AccountContext.Provider value={{
      loading,
      accounts,
      current,
      signUp,
      login,
      logout,
      updateRecord,
    }}>
      {children}
    </AccountContext.Provider>
  );
}
