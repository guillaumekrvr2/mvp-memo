// components/molecules/ObjectiveTimePicker/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 16,
    marginRight: 10,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  staticTimeBox: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  staticTime: {
    color: '#fff',
    fontSize: 16,
  },
});