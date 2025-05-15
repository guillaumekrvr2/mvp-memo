// contexts/AccountContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AccountContext = createContext();

const STORAGE_KEY = '@myapp:accounts';
const ACTIVE_KEY  = '@myapp:active_account';

export function AccountProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au montage : on charge la liste et le compte actif
  useEffect(() => {
    (async () => {
      try {
        const rawList = await AsyncStorage.getItem(STORAGE_KEY);
        const list = rawList ? JSON.parse(rawList) : [];
        setAccounts(list);

        const storedActive = await AsyncStorage.getItem(ACTIVE_KEY);
        setActiveId(storedActive);
      } catch (e) {
        console.error("Erreur lecture AsyncStorage :", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Helper pour persister la liste complète
  const saveAccounts = async newList => {
    setAccounts(newList);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

  // Ajouter un compte
  const addAccount = async name => {
    const id = Date.now().toString();
    const newAcct = { id, name, score: 0 };
    const updated = [...accounts, newAcct];
    await saveAccounts(updated);
    await setActiveId(id);
    await AsyncStorage.setItem(ACTIVE_KEY, id);
  };

  // Supprimer un compte
  const removeAccount = async id => {
    const filtered = accounts.filter(a => a.id !== id);
    await saveAccounts(filtered);
    if (id === activeId) {
      const nextActive = filtered[0]?.id || null;
      setActiveId(nextActive);
      await AsyncStorage.setItem(ACTIVE_KEY, nextActive);
    }
  };

  // Sélectionner un compte existant comme actif
  const selectAccount = async id => {
    setActiveId(id);
    await AsyncStorage.setItem(ACTIVE_KEY, id);
  };

  // Mettre à jour le score d’un compte
  const updateScore = async (id, delta) => {
    const updated = accounts.map(a =>
      a.id === id ? { ...a, score: a.score + delta } : a
    );
    await saveAccounts(updated);
  };

  return (
    <AccountContext.Provider value={{
      loading,
      accounts,
      activeId,
      addAccount,
      removeAccount,
      selectAccount,
      updateScore
    }}>
      {children}
    </AccountContext.Provider>
  );
}
