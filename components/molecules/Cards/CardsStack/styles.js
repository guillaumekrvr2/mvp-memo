// 📁 components/molecules/CardsStack/styles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  deckArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 140,
  },
  cardsStack: {
    position: 'relative',
    width: 280,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupContainer: {
    position: 'absolute',
    width: 280,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Au-dessus de la pile d'arrière-plan
  },
  backgroundStack: {
    position: 'absolute',
    width: 280,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Derrière le groupe actuel
  },
})