// src/hooks/useModeVariants.js
import { useState, useEffect } from 'react';
import { supabase } from '../data/supabase/supabaseClient';
import useMode from './useMode';

// Config locale des variants par défaut
const DEFAULT_VARIANTS = {
  'memory-league': {
    id: 10,
    label: '1-minute',
    duration_seconds: 60,
    sort_order: 0,
  },
  'iam': {
    id: 8,
    label: '10-minutes',
    duration_seconds: 600,
    sort_order: 0,
  },
};

export function useModeVariants(disciplineSlug, modeSlug) {
  // Variante par défaut si configurée
  const defaultVariant = DEFAULT_VARIANTS[modeSlug] || null;

  const [variants, setVariants] = useState(
    defaultVariant ? [defaultVariant] : []
  );
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(
    defaultVariant
  );

  useEffect(() => {
    let isActive = true;

    setLoading(true);

    (async () => {
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
        .eq('slug', modeSlug)
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
        if (data.length > 0) {
          setSelectedVariant(data[0]);
        }
      }

      if (isActive) setLoading(false);
    })();

    return () => { isActive = false; };
  }, [disciplineSlug, modeSlug]);

  return {
    variants,
    loading,
    selectedVariant,
    setSelectedVariant,
  };
}