import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#ccc',
    lineHeight: 22,
  },
  input: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  resendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    color: '#fff',
    marginRight: 8,
  },
  resendLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  backContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  backText: {
    color: '#aaa',
    fontSize: 16,
  },
});