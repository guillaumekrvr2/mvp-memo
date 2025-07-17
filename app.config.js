// app.config.js
import 'dotenv/config';              // si tu utilises react-native-dotenv
// ou pas d’import si tu es en Expo/EAS (les secrets sont injectés dans process.env)

export default ({ config }) => ({
  ...config,
  extra: {
    SUPABASE_URL:      process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
});