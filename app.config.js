// app.config.js
import 'dotenv/config';  // Charge les variables d'environnement

export default ({ config }) => {
  const isBeta = process.env.EXPO_PUBLIC_ENV === 'beta';
  
  return {
    ...config,
    // Métadonnées Expo - nom différent pour bêta
    name: isBeta ? "Memorize Beta" : "MVP Memo",
    slug: "mvp-memo",
    version: "1.0.0",
    sdkVersion: "54.0.0",
    platforms: ["ios", "android", "web"],
    orientation: "portrait",

    // Configuration Android avec icône personnalisée
    android: {
      package: "com.memorize.mvpmemo",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0a0a0a"
      }
    },

    // Icône principale
    icon: "./assets/icon.png",

    // 🔧 Configuration des mises à jour OTA - activée pour bêta
    updates: {
      enabled: isBeta,  // Activé pour la bêta
      fallbackToCacheTimeout: isBeta ? 30000 : 0,
      checkAutomatically: isBeta ? "ON_LOAD" : "NEVER",
    },

    // Configuration complète des icônes
    splash: {
      image: "./assets/icons/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },

    // Configuration des plugins
    plugins: [
      "expo-audio",
      "expo-font",
      "expo-web-browser"
    ],

    // Variables extra, dont les clés Supabase et l'ID EAS
    extra: {
      eas: {
        projectId: "0422222f-d110-4848-8949-09dd8146672a"
      },
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      IS_BETA: isBeta
    }
  };
};