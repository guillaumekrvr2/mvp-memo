// src/components/organisms/ArticleCard.styles.js
import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.border.radius,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderOnDark,
  },
  title: {
    flex: 1,
    color: theme.colors.textOnDark,
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
})
