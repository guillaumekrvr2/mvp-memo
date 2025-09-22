# Configuration ProGuard simplifiée pour éviter les erreurs de build

# React Native essentials - À GARDER
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.soloader.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }

# Expo essentials
-keep class expo.** { *; }
-keep class versioned.host.exp.exponent.** { *; }

# AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Navigation
-keep class com.reactnavigation.** { *; }
-keep class com.swmansion.** { *; }

# Hermes
-keep class com.facebook.hermes.** { *; }

# 🔒 Configuration de sécurité renforcée pour beta
-optimizations !code/simplification/arithmetic
-allowaccessmodification
-dontskipnonpubliclibraryclasses

# 🔐 Obfuscation renforcée
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes InnerClasses

# ⚠️ RETIRE les attributs de debug en production pour sécurité
# -keepattributes SourceFile,LineNumberTable

# 🛡️ Protection anti-debug et anti-reverse engineering
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int i(...);
    public static int w(...);
    public static int d(...);
    public static int e(...);
}

# 🔒 Obfuscation des packages sensibles
-repackageclasses 'obfuscated'

# 🔐 Protection des constantes sensibles
-keepclassmembers class * {
    static final % *;
    static final java.lang.String *;
}
