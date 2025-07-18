import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AccountContext } from '../../contexts/AccountContext';
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton';
import InputField from '../../components/atoms/InputField/InputField';


export default function LoginScreen({ navigation }) {
  const { login } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onLogin = async () => {
    try {
      await login(email, password);
      navigation.replace('Main');
    } catch (e) {
      setError(e.message);
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

      <SecondaryButton onPress={onLogin}>
        Connexion
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
  switch:      { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  switchText:  { color: '#fff', marginRight: 8 },
  link:        { color: '#fff', textDecorationLine: 'underline' },
});
