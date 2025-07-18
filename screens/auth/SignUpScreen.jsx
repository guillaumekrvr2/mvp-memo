// screens/SignUpScreen.jsx
import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AccountContext } from '../../contexts/AccountContext';

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

      <TextInput
        placeholder="Prénom"
        placeholderTextColor="#888"
        style={[styles.input, { color: '#fff' }]}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Nom"
        placeholderTextColor="#888"
        style={[styles.input, { color: '#fff' }]}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, { color: '#fff' }]}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#888"
        secureTextEntry
        style={[styles.input, { color: '#fff' }]}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.learnMore} onPress={onSignUp}>
        <Text style={styles.learnMoreText}>S'inscrire</Text>
      </TouchableOpacity>

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
  input:       {
    borderWidth:1,
    borderColor:'#666',
    padding:10,
    marginBottom:15,
    borderRadius:15,
  },
  error:       { color:'red', textAlign:'center', marginBottom:10 },

  // Styles “learnMore” pour les boutons
  learnMore: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },

  switch:      { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  switchText:  { color: '#fff', marginRight: 8 },
  link:        { color: '#fff', textDecorationLine: 'underline' },
});
