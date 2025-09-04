// components/molecules/Names/NamesRecallCard/styles.js
import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

// Largeur augmentée de 15% par rapport au MenuButton (140px -> 161px)
const cardWidth = 161
const cardSpacing = 16

export const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 30, 0.95)',
    borderRadius: 18,
    padding: 16, // Augmenté de 12 à 16
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  imageContainer: {
    width: cardWidth - 32, // padding * 2 (16 * 2)
    height: (cardWidth - 32) * 1.4, // Ratio plus haut pour compenser les inputs réduits
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10, // Légèrement réduit
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  inputContainer: {
    width: '100%',
    gap: 6, // Légèrement augmenté pour s'adapter aux inputs plus hauts
  },

  nameInput: {
    width: '100%',
    height: 36, // Augmenté pour s'adapter à la police 14px
    marginHorizontal: 0,
    paddingVertical: 8, // Ajusté pour la police 14px
    paddingHorizontal: 10, // Légèrement augmenté
    minHeight: 36,
    borderRadius: 16, // Ajusté proportionnellement
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameInputText: {
    fontSize: 14, // Taille plus lisible (au lieu de 11px)
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    width: '100%',
    padding: 0,
    margin: 0,
  },
})