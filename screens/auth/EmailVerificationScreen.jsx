import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../data/supabase/supabaseClient';
import InputField from '../../components/atoms/Numbers/InputField/InputField';
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import styles from './styles';

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
    <View style={styles.container}>
      <Text style={styles.title}>Vérification Email</Text>
      <Text style={styles.subtitle}>
        Entrez le code à 6 chiffres envoyé à {email}
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <InputField
        placeholder="Code de vérification"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
        style={[styles.input, { color: '#fff' }]}
        autoFocus
      />

      <SecondaryButton onPress={onVerifyOtp} disabled={loading}>
        {loading ? 'Vérification...' : 'Vérifier'}
      </SecondaryButton>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Code non reçu ?</Text>
        <TouchableOpacity onPress={onResendCode} disabled={loading}>
          <Text style={styles.resendLink}>Renvoyer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}