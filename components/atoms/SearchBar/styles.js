import { StyleSheet } from 'react-native'
import { theme } from '../../../theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '400',
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
})