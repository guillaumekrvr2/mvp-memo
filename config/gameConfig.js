//config/gameConfig.js

/**
 * Options de mode pour tous les jeux
 */
export const modeOptions = [
  { label: 'Memory League', value: 'memory-league' },
  { label: 'IAM',           value: 'iam' },
  { label: 'Personnalisé',  value: 'custom' },
];

/**
 * Temps par défaut (en secondes) selon le mode
 */
export const defaultTimes = {
  'memory-league': 60,
  iam: 300,
  custom: 60,
};

/**
 * Clé de stockage pour l'auto-advance (persisté dans AsyncStorage)
 */
export const AUTOADVANCE_KEY = '@numbers_auto_advance';
