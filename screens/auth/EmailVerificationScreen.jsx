import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Image } from 'react-native';
import { supabase } from '../../data/supabase/supabaseClient';
import InputField from '../../components/atoms/Numbers/InputField/InputField';
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import { theme } from '../../theme';

export default function EmailVerificationScreen({ route, navigation }) {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Le code doit contenir 6 chiffres');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      });

      if (verifyError) throw verifyError;

      Alert.alert(
        'Vérification réussie',
        'Votre compte a été vérifié avec succès !',
        [{ text: 'OK', onPress: () => navigation.replace('Main') }]
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email
      });

      if (resendError) throw resendError;

      Alert.alert('Code renvoyé', 'Un nouveau code a été envoyé à votre email');
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
        <Text style={styles.title}>Vérification Email</Text>
        <Text style={styles.subtitle}>
          Entrez le code à 6 chiffres envoyé à{'\n'}
          {email}
        </Text>
      </View>

      {/* Formulaire */}
      <View style={styles.formSection}>
        {error && <Text style={styles.error}>{error}</Text>}

        <InputField
          placeholder="Code de vérification"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
          style={styles.input}
          autoFocus
        />

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={onVerifyOtp}
          disabled={loading}
        >
          <Text style={styles.verifyButtonText}>
            {loading ? 'Vérification...' : 'Vérifier'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Code non reçu ?</Text>
          <TouchableOpacity onPress={onResendCode} disabled={loading}>
            <Text style={styles.resendLink}>Renvoyer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer vide pour maintenir l'espacement */}
      <View style={styles.footerSection} />
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
  verifyButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: theme.colors.textOnDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: theme.colors.textSecondary,
    marginRight: 8,
    fontSize: 16,
  },
  resendLink: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  footerSection: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});