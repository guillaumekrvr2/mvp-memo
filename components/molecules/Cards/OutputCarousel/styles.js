import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 0.5, 
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: '#000000'
  },
  title: {
    color: 'rgba(255, 255, 255, 0.2', 
    fontSize: 14, 
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  scrollView: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingTop: 30,
    height: 340
  },
  cardsContainer: {
    flex: 1, 
    position: 'relative',
    justifyContent: 'flex-start'
  }
})