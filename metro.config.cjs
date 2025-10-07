const { getDefaultConfig } = require('expo/metro-config')
const config = getDefaultConfig(__dirname)

// Ajoute le transformer pour les .svg
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer')
config.resolver.sourceExts.push('svg')

// 🔒 Minification renforcée pour les builds de production (iOS + Android)
config.transformer.minifierConfig = {
  compress: {
    drop_console: true,      // Supprime tous les console.log en production
    drop_debugger: true,      // Supprime les debugger statements
    pure_funcs: ['console.info', 'console.debug', 'console.warn'], // Supprime logs spécifiques
  },
  mangle: {
    keep_fnames: false,       // Renomme les fonctions (loginUser → a)
    keep_classnames: false,   // Renomme les classes
    toplevel: true,           // Obfusque le scope global
  },
  output: {
    comments: false,          // Supprime tous les commentaires
    ascii_only: true,         // Encode les caractères spéciaux
  },
}

module.exports = config
