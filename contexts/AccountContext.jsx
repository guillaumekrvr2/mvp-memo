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

// 6) Mise à jour d’un record (gère désormais les modes pour toutes les disciplines)
const updateRecord = async (discipline, value) => {
  if (!current) return;

  let newRecords;
  // si un mode est fourni, on stocke sous records[discipline][mode]
  if (value.mode) {
    const existing = current.records[discipline] || {};
    newRecords = {
      ...current.records,
      [discipline]: {
        ...existing,
        [value.mode]: {
          score: value.score,
          time:  value.time
        }
      }
    };
  } else {
    // pas de mode : on garde le comportement “classique”
    newRecords = {
      ...current.records,
      [discipline]: value
    };
  }

  const updatedCurr = {
    ...current,
    records: newRecords
  };
  // mise à jour de la liste et persistance
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
