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

  // 🔧 Configuration des mises à jour OTA DÉSACTIVÉE pour le développement
  updates: {
    enabled: false,  // ← DÉSACTIVÉ temporairement
    fallbackToCacheTimeout: 0,
    checkAutomatically: "NEVER", // ← Pas de vérification automatique
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