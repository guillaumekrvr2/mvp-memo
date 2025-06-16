// src/components/molecules/TimeBadge.styles.js
import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.badgeBackground,
    borderRadius: theme.border.radius,
  },
  text: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.primary,
    fontSize: 14,
  },
})
