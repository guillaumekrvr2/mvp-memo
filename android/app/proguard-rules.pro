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

# Basic optimization avec obfuscation activée
-optimizations !code/simplification/arithmetic
-allowaccessmodification

# Obfuscation activée mais garde les noms essentiels
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keepattributes Signature
-keepattributes InnerClasses
