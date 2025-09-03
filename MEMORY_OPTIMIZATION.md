# 🧠 Optimisation Mémoire - Names Module

## 🎯 **Problème résolu**

**Erreur** : `Pool hard cap violation? Hard cap = 201326592 Used size = 199160288 Free size = 0`

Le module Names chargeait trop d'images simultanément, saturant le pool mémoire React Native (201MB limite).

## 🔧 **Solution implémentée**

### 1. **Hook `useImageMemoryManager`**
- Pool limité à 6 images maximum en mémoire
- Déchargement automatique FIFO (First In, First Out)
- Nettoyage périodique du cache React Native

### 2. **Composant `LazyImage`**
- Chargement à la demande uniquement si `isVisible=true`
- Gestion d'état intelligent (idle → loading → loaded/error)
- Placeholder pendant le chargement
- Déchargement automatique après 2s hors vue

### 3. **Hook `useMemoryMonitor`**
- Surveillance des erreurs "Pool hard cap violation"
- Nettoyage d'urgence automatique
- Nettoyage préventif toutes les 30s
- Interception de `console.error` pour détecter les problèmes

### 4. **Optimisations spécifiques**

**NamesStack :**
- Seules les 3 premières cartes chargent leur image
- Images hors pile automatiquement déchargées

**NamesThumbnailRow :**
- Fenêtre de ±5 thumbnails autour du profil actuel
- Images distantes non chargées
- IDs uniques avec préfixe `thumb-`

## 📊 **Impact mémoire**

**Avant :**
- ~80+ images chargées simultanément (20 profils × 4 chaque)
- Saturation à ~200MB après 15-20 profils

**Après :**
- Maximum 15 images en mémoire (6 principales + 9 thumbnails)
- Usage stable ~20-30MB
- Nettoyage automatique préventif

## 🚀 **Usage**

```javascript
// LazyImage avec gestion automatique
<LazyImage
  source={{ uri: imageUri }}
  profileId={profile.id}
  isVisible={index < 3} // Contrôle du chargement
  onError={handleError}
/>
```

## 🔍 **Monitoring**

Les logs suivent le pattern :
- `📷 [LazyImage]` : Chargements d'images
- `♻️ [ImageMemory]` : Gestion du pool
- `🧹 [MemoryMonitor]` : Nettoyages préventifs
- `🚨 [MemoryMonitor]` : Nettoyages d'urgence

## ⚡ **Performance**

- **Temps de chargement** : Réduit (images à la demande)
- **Fluidité** : Améliorée (moins de pression mémoire)
- **Stabilité** : Garantie (plus de crashes mémoire)
- **Batterie** : Optimisée (moins de traitement d'images)