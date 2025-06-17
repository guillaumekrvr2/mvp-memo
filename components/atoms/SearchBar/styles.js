// src/components/molecules/SearchBar.styles.js
import { StyleSheet } from 'react-native'
import { theme } from '../../../theme'      // ou '../atoms/Icon' selon ton arborescence

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.searchBackground,  // token centralisé
    borderRadius: theme.border.radius,             // idem
    height: 40,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    color: theme.colors.textOnDark,
  },
})
