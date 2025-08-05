// app.config.js
import 'dotenv/config';  // Charge les variables d'environnement

export default ({ config }) => ({
  ...config,
  // Métadonnées Expo obligatoires
  name: "MVP Memo",
  slug: "mvp-memo",
  version: "1.0.0",
  sdkVersion: "53.0.0",
  platforms: ["ios", "android", "web"],
  orientation: "portrait",

  // Configuration des mises à jour OTA (EAS Update)
  updates: {
    url: config.updates?.url,
    enabled: true,
    fallbackToCacheTimeout: 0,
    checkAutomatically: "ON_LOAD",
    requestHeaders: {
      // Remplace par ton channel ou injecte via .env
      "expo-channel-name": process.env.EXPO_CHANNEL_NAME || "production"
    }
  },

  // Variables extra, dont les clés Supabase et l'ID EAS
  extra: {
    eas: {
      projectId: "0422222f-d110-4848-8949-09dd8146672a"
    },
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
  }
});
