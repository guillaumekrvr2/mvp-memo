# 🚀 Guide de Build Bêta Sécurisée

## Configuration terminée ✅

- **EAS Build** configuré avec profil `beta`
- **App.config.js** adapté pour environnement bêta
- **Variables d'environnement** sécurisées

## Commandes de build

### 1. Push des secrets vers EAS (à faire une seule fois)
```bash
# Push du fichier .env vers EAS Secrets
eas secret:push --scope project --env-file .env

# Vérifier les secrets
eas secret:list
```

### 2. Build APK bêta sécurisée
```bash
# Build Android APK pour bêta (code obfusqué, sécurisé)
eas build --profile beta --platform android

# Le build prendra ~10-15 minutes
# Tu recevras un lien de téléchargement sécurisé
```

### 3. Distribution Google Play Internal Testing
```bash
# Submit à Google Play Internal Testing
eas submit --profile production --platform android

# Puis inviter ton bêta testeur par email dans Google Play Console
```

## Sécurité ✅

- ✅ **Code obfusqué** (ProGuard automatique)
- ✅ **Secrets cachés** (EAS Secrets)
- ✅ **Distribution contrôlée** (Internal Testing)
- ✅ **Updates OTA** activées pour patches rapides

## Test en local avant build
```bash
# Tester l'app en mode bêta localement
EXPO_PUBLIC_ENV=beta npx expo start

# L'app affichera "Memorize Beta" comme nom
```

## Next Steps

1. **Exécuter** : `eas secret:push --scope project --env-file .env`
2. **Builder** : `eas build --profile beta --platform android`
3. **Tester l'APK** téléchargée
4. **Setup Google Play Console** pour Internal Testing
5. **Inviter le compétiteur** par email

---
**Ready for secure beta! 🎯**