import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  instructionsContainer: {
    alignItems: 'center',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputScrollContainer: {
    flex: 1,
  },
  inputScrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: Platform.OS === 'ios' ? 8 : 40,
  },
  mainInput: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 24 : 24,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'top',
    letterSpacing: Platform.OS === 'ios' ? 8 : 24,
    lineHeight: Platform.OS === 'ios' ? 36 : 36,
    ...(Platform.OS === 'ios' && {
      includeFontPadding: false,
    }),
  },
})
