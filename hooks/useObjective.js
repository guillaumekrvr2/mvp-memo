// hooks/useObjective.js
import { useState, useEffect } from 'react';

/**
 * Hook pour gérer un champ "objectif"
 * @param {string} initialValue Valeur initiale de l'objectif
 * @returns {{objectif: string, setObjectif: (value: string) => void}}
 */
export default function useObjective(initialValue = '') {
  const [objectif, setObjectif] = useState(initialValue);

  // Si besoin de remettre à jour l'objectif initial lors d'un reset, on peut ajouter un useEffect
  // useEffect(() => {
  //   setObjectif(initialValue);
  // }, [initialValue]);

  return { objectif, setObjectif };
}