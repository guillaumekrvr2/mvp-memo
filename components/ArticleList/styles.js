// components/ArticleList/ArticleList.styles.js
import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export default StyleSheet.create({
  list: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.background,
    paddingTop: theme.spacing.sm,
  },
  emptyText: {
    color: theme.colors.textPlaceholder,
    fontSize: 16,
  },
})
