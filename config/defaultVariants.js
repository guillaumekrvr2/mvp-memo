// src/config/defaultVariants.js
export const DEFAULT_VARIANTS = {
  'memory-league': {
    id: 10,
    label: '1-minute',
    duration_seconds: 60,
  },
  'iam': {
    // vous pouvez choisir le variant “par défaut” d’IAM
    // ici j’ai mis 10-minutes (id 8) en exemple
    id: 8,
    label: '10-minutes',
    duration_seconds: 600,
  },
  // custom n’a pas de variant
};
