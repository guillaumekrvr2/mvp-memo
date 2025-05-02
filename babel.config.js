// babel.config.js
module.exports = function(api) {
    api.cache(true)
    return {
      presets: ['babel-preset-expo'],
      // On NE met PAS ici 'expo-router/babel'
      // => React Navigation prendra la main
    }
  }
