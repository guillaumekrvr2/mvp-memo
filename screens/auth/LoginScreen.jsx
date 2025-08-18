import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { AccountContext } from '../../contexts/AccountContext';
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import InputField from '../../components/atoms/Numbers/InputField/InputField';
import { theme } from '../../theme';


export default function LoginScreen({ navigation }) {
  const { login, signInWithGoogle } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigation.replace('Main');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      navigation.replace('Main');
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
        <Text style={styles.title}>Bon retour !</Text>
        <Text style={styles.subtitle}>
          Connectez-vous pour sauvegarder{'\n'}
          vos progrès et débloquer toutes les fonctionnalités
        </Text>
      </View>

      {/* Formulaire */}
      <View style={styles.formSection}>
        {error && <Text style={styles.error}>{error}</Text>}

        <InputField 
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <InputField 
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={onLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Text>
        </TouchableOpacity>

        {/* TODO: Décommenter quand on publiera l'app (Google Sign-in nécessite un build natif)
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={onGoogleLogin}
          disabled={loading}
        >
          <Text style={styles.googleButtonText}>🔍 Continuer avec Google</Text>
        </TouchableOpacity>
        */}
      </View>

      {/* Lien inscription */}
      <View style={styles.footerSection}>
        <View style={styles.switch}>
          <Text style={styles.switchText}>Pas encore de compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>S'inscrire</Text>
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
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  loginButtonText: {
    color: theme.colors.textOnDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.textSecondary,
  },
  dividerText: {
    color: theme.colors.textSecondary,
    marginHorizontal: 15,
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  googleButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
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
