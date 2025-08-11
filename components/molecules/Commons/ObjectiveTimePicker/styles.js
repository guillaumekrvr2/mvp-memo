// components/molecules/ObjectiveTimePicker/styles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    gap: 15,
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: {
    color: '#fff',
    fontSize: 16,
    padding: 12,
  },
  staticTimeBox: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    padding: 12,
    justifyContent: 'center',
  },
  staticTime: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
  },
  // Nouveaux styles pour le dropdown IAM
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  placeholderText: {
    color: '#aaa',
  },
})