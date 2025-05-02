const { getDefaultConfig } = require('expo/metro-config')
const config = getDefaultConfig(__dirname)

// Ajoute le transformer pour les .svg
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer')
config.resolver.sourceExts.push('svg')

module.exports = config
