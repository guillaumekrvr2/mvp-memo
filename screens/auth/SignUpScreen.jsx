// screens/SignUpScreen.jsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
// on n'utilise plus signUp du context ici
import { supabase } from '../../data/supabase/supabaseClient';
import InputField from '../../components/atoms/Numbers/InputField/InputField';
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import { theme } from '../../theme';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [error,     setError]     = useState(null);
  const [loading,   setLoading]   = useState(false);

  const onSignUp = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // v2 : un seul objet en argument, metadata dans options.data
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,   // sera disponible dans raw_user_meta_data
            second_name: lastName
          }
          // redirectTo: 'yourapp://login' // si tu utilises un deep link
        }
      });

      if (signUpError) throw signUpError;
      
      // Rediriger vers l'écran de vérification email
      navigation.navigate('EmailVerification', { email });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Logo et titre */}
      <View style={styles.titleSection}>
        <View style={styles.logo}>
          <Image source={require('../../assets/icons/Memorize_icon.png')} style={styles.logoIcon} />
        </View>
        <Text style={styles.title}>Bienvenue !</Text>
        <Text style={styles.subtitle}>
          Créez votre compte pour commencer{'\n'}
          votre entraînement de mémorisation
        </Text>
      </View>

      {/* Formulaire */}
      <View style={styles.formSection}>
        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.nameRow}>
          <InputField
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            style={[styles.input, styles.nameInput]}
          />
          <InputField
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
            style={[styles.input, styles.nameInput]}
          />
        </View>

        <InputField
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <InputField
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={onSignUp}
          disabled={loading}
        >
          <Text style={styles.signUpButtonText}>
            {loading ? 'Création...' : 'Créer mon compte'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lien connexion */}
      <View style={styles.footerSection}>
        <View style={styles.switch}>
          <Text style={styles.switchText}>Déjà un compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
  },
  titleSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: "italic",
    marginBottom: 40,
  },
  formSection: {
    paddingHorizontal: 20,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
    borderRadius: 12,
  },
  error: {
    color: theme.colors.error || 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  signUpButtonText: {
    color: theme.colors.textOnDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerSection: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    color: theme.colors.textSecondary,
    marginRight: 8,
    fontSize: 16,
  },
  link: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
