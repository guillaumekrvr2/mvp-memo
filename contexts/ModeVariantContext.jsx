// src/contexts/ModeVariantContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import SupabaseModeVariantRepository from '../data/repositories/SupabaseModeVariantRepository';
import { GetModeVariants } from '../usecases/GetModeVariants';

export const ModeVariantContext = createContext();

export function ModeVariantProvider({ children }) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const repo = new SupabaseModeVariantRepository();
        const getModeVariants = new GetModeVariants(repo);
        const data = await getModeVariants.execute();
        setVariants(data);
      } catch (e) {
        console.error('[ModeVariantProvider] load error:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Map id -> label for quick lookup
  const map = variants.reduce((acc, v) => ({ ...acc, [v.id]: v.label }), {});

  // Group variants by disciplineId
  const byDiscipline = variants.reduce((acc, v) => {
    const key = v.disciplineId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {});

  // Add string keys for easier lookup
  const disciplineMapping = {
    7: 'numbers',
    8: 'cards', 
    9: 'words',
    10: 'binary',
    11: 'names',
    13: 'spokens'
  };

  // Add variants with string keys as well
  Object.keys(disciplineMapping).forEach(disciplineId => {
    const stringKey = disciplineMapping[disciplineId];
    if (byDiscipline[disciplineId]) {
      byDiscipline[stringKey] = byDiscipline[disciplineId];
    }
  });

  return (
    <ModeVariantContext.Provider value={{ variants, map, byDiscipline, loading, error }}>
      {children}
    </ModeVariantContext.Provider>
  );
}
