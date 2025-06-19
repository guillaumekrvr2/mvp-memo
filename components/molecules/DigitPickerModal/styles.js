import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 260,
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#fff',
  },
  okButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  okText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
})
