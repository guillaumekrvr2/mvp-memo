// hooks/useModeVariants.js
import { useState, useEffect } from 'react';
import { supabase } from '../data/supabaseClient';
import useMode from './useMode';

export function useModeVariants(disciplineSlug, modeSlug) {     // Récupère le slug du mode courant
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  // **NOUVEAU** : état et setter pour le variant sélectionné
  const [selectedVariant, setSelectedVariant] = useState(null);

  // 1) Requête pour charger les variants de ce mode+discipline
  useEffect(() => {
    let isActive = true;
    (async () => {
      setLoading(true);

      // lookup discipline_id
      const { data: [disc], error: e1 } = await supabase
        .from('disciplines')
        .select('id')
        .eq('slug', disciplineSlug)
        .limit(1);
      if (e1 || !disc) {
        console.error('Discipline inconnue', e1);
        if (isActive) setLoading(false);
        return;
      }

      // lookup mode_id
      const { data: [mod], error: e2 } = await supabase
        .from('modes')
        .select('id')
        .eq('slug', modeSlug)    // maintenant on utilise le mode passé en paramètre
        .limit(1);
      if (e2 || !mod) {
        console.error('Mode inconnu', e2);
        if (isActive) setLoading(false);
        return;
      }

      // fetch variants
      const { data, error: e3 } = await supabase
        .from('mode_variants')
        .select('id, label, duration_seconds, sort_order')
        .eq('discipline_id', disc.id)
        .eq('mode_id', mod.id)
        .order('sort_order', { ascending: true });

      if (e3) {
        console.error('Erreur fetch variants', e3);
      } else if (isActive) {
        setVariants(data);
      }
      if (isActive) setLoading(false);
    })();

    return () => { isActive = false; };
  }, [disciplineSlug, modeSlug]);

  // 2) Initialiser automatiquement le sélectionné au premier variant
  useEffect(() => {
    if (!loading && variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [loading, variants]);

  return {
    variants,
    loading,
    selectedVariant,
    setSelectedVariant,
  };
}
