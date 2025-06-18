import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AccountContext } from '../../contexts/AccountContext';

export default function AccountsScreen() {
  const { accounts, activeId, addAccount, selectAccount, removeAccount } = useContext(AccountContext);
  const [newName, setNewName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comptes</Text>

      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, item.id === activeId && styles.activeItem]}
            onPress={() => selectAccount(item.id)}
          >
            <Text style={styles.name}>{item.name} (score : {item.score})</Text>
            <Button title="Supprimer" onPress={() => removeAccount(item.id)} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun compte pour le moment.</Text>}
      />

      <View style={styles.form}>
        <TextInput
          placeholder="Nouveau nom"
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
        />
        <Button
          title="Créer"
          onPress={() => {
            if (newName.trim()) {
              addAccount(newName.trim());
              setNewName('');
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  activeItem: {
    backgroundColor: '#eef',
  },
  name: {
    fontSize: 18,
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  form: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#666',
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
  },
});
