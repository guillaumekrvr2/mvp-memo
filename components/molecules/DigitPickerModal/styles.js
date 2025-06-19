import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  digitButton: {
    width: 50,
    height: 50,
    margin: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitButtonActive: {
    backgroundColor: '#fff',
  },
  digitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  digitTextActive: {
    color: '#000',
  },
  okButton: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  okText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
})
