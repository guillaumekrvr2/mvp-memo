// screens/SignUpScreen.jsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// on n'utilise plus signUp du context ici
import { supabase } from '../../data/supabase/supabaseClient';
import InputField from '../../components/atoms/Numbers/InputField/InputField';
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [error,     setError]     = useState(null);

  const onSignUp = async () => {
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
      // Tu peux éventuellement vérifier data.user.confirmed_at avant de naviguer
      navigation.replace('Main');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <InputField
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        style={[styles.input, { color: '#fff' }]}
      />
      <InputField
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        style={[styles.input, { color: '#fff' }]}
      />
      <InputField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { color: '#fff' }]}
      />
      <InputField
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { color: '#fff' }]}
      />

      <SecondaryButton onPress={onSignUp}>
        S'inscrire
      </SecondaryButton>

      <View style={styles.switch}>
        <Text style={styles.switchText}>Déjà un compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 20, justifyContent: 'center' },
  title:       { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#fff' },
  input:       { padding: 10, marginBottom: 15, borderRadius: 15 },
  error:       { color: 'red', textAlign: 'center', marginBottom: 10 },
  switch:      { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  switchText:  { color: '#fff', marginRight: 8 },
  link:        { color: '#fff', textDecorationLine: 'underline' },
});
