import { StyleSheet } from 'react-native'
import { theme } from '../../../theme'

export default StyleSheet.create({
  list: {
    paddingTop: 16,
    marginTop: 30,
    marginBottom: 100,
    paddingBottom: 32,
    // Supprime marginTop: 60 qui causait des problèmes
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