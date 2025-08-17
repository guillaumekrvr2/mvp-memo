import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AccountContext } from '../../contexts/AccountContext';
import { SecondaryButton } from '../../components/atoms/Commons/SecondaryButton/SecondaryButton';
import InputField from '../../components/atoms/Numbers/InputField/InputField';


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
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <InputField style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <InputField style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <SecondaryButton onPress={onLogin} disabled={loading}>
        {loading ? 'Connexion...' : 'Connexion'}
      </SecondaryButton>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.dividerLine} />
      </View>

      <SecondaryButton onPress={onGoogleLogin} disabled={loading} variant="google">
        🔍 Continuer avec Google
      </SecondaryButton>

      <View style={styles.switch}>
        <Text style={styles.switchText}>Pas encore de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex:1, padding:20, justifyContent:'center' },
  title:       { fontSize:24, marginBottom:20, textAlign:'center', color: '#fff' },
  input:       { padding:10, marginBottom:15, borderRadius:15 },
  error:       { color:'red', textAlign:'center', marginBottom:10 },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  dividerText: {
    color: '#aaa',
    marginHorizontal: 15,
    fontSize: 14,
  },
  switch:      { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  switchText:  { color: '#fff', marginRight: 8 },
  link:        { color: '#fff', textDecorationLine: 'underline' },
});
