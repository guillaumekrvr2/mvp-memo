export default {
  // Backgrounds
  background: '#0a0a0a',        // fond principal de l'app (plus moderne que #000000)
  surface: '#1e1e2e',          // fonds secondaires (cards, sections) - plus moderne que #111111
  surfaceLight: '#2a2a3e',     // surface légèrement plus claire pour variations
  header: '#1a1a2e',           // fond des headers
  
  // Couleurs principales
  primary: '#667eea',          // couleur principale moderne (remplace le blanc)
  primaryLight: '#667eea40',   // version transparente
  primaryDark: '#5a6fd8',      // version plus sombre
  secondary: '#a0a9c0',        // texte secondaire (gris bleuté au lieu de #A2A2A2)
  
  // Accent et highlights
  accent: '#4ecdc4',           // couleur d'accent moderne (turquoise au lieu de #FFD700)
  accentLight: '#4ecdc420',    // version transparente
  success: '#43e97b',          // vert success
  warning: '#fa709a',          // rose warning
  error: '#ff4757',            // messages d'erreur (rouge plus moderne que #FF4D4F)
  
  // Borders
  borderOnDark: '#2a2a3e',     // border sur fond sombre (gris subtil au lieu de blanc)
  borderOnLight: '#000000',    // border sur fond clair
  borderAccent: '#4ecdc440',   // bordures avec accent
  
  // Text colors
  textOnDark: '#ffffff',       // texte sur fond sombre
  textOnLight: '#000000',      // texte sur fond clair
  textPrimary: '#ffffff',      // texte principal
  textSecondary: '#a0a9c0',    // texte secondaire
  textMuted: '#666666',        // texte très discret
  
  // Icons
  icon: '#ffffff',             // icônes principales
  iconSecondary: '#a0a9c0',    // icônes secondaires
  
  // Couleurs spécifiques aux disciplines (pour différenciation visuelle)
  disciplines: {
    numbers: '#667eea',        // Bleu violet
    cards: '#764ba2',          // Violet
    words: '#f093fb',          // Rose violet
    binary: '#4facfe',         // Bleu ciel
    spoken: '#43e97b',         // Vert
    images: '#fa709a',         // Rose
  },
  
  // États interactifs (nouvelles couleurs utiles)
  interactive: {
    pressed: '#ffffff20',      // overlay pour états pressés
    hover: '#ffffff10',        // overlay pour hover
    disabled: '#666666',       // éléments désactivés
  },
  
  // Shadow colors (pour profondeur visuelle)
  shadow: {
    primary: '#667eea',
    accent: '#4ecdc4',
    dark: '#000000',
  }
}