import { StyleSheet } from 'react-native'
import { theme } from '../../../theme'

export default StyleSheet.create({
  list: {
    paddingTop: 16,
    paddingHorizontal: 24,
    marginTop: 18,
    paddingBottom: 120,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    color: theme?.colors?.textSecondary || '#a0a9c0',
    textAlign: 'center',
  },
})