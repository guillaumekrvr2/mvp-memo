import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 4,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  selected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  symbol: {
    fontSize: 18
  },
  label: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'normal'
  },
  labelSelected: {
    color: '#fff',
    fontWeight: 'bold'
  }
})