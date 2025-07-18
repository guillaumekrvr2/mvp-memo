// screens/SignUpScreen.jsx
import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AccountContext } from '../../contexts/AccountContext';
import InputField from '../../components/atoms/InputField/InputField';
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton';


export default function SignUpScreen({ navigation }) {
  const { signUp } = useContext(AccountContext);
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [error,     setError]     = useState(null);

  const onSignUp = async () => {
    try {
      await signUp({ firstName, lastName, email, password });
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
  container:   { flex:1, padding:20, justifyContent:'center' },
  title:       { fontSize:24, marginBottom:20, textAlign:'center', color: '#fff' },
  input:       { padding:10, marginBottom:15, borderRadius:15 },
  error:       { color:'red', textAlign:'center', marginBottom:10 },
  switch:      { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  switchText:  { color: '#fff', marginRight: 8 },
  link:        { color: '#fff', textDecorationLine: 'underline' },
});
