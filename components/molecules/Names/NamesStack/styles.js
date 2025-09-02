// components/molecules/Names/NamesStack/styles.js
import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    paddingTop: height * 0.15, // Remonte les cartes de 20% (15% du haut au lieu de 50% centré)
  },

  profileCard: {
    position: 'absolute',
    width: width * 0.75, // 75% de la largeur d'écran
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 10, 0.95)', // Fond sombre opaque pour masquer les cartes derrière
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },

  imageContainer: {
    width: width * 0.6, // 60% de la largeur d'écran
    height: width * 0.75, // Ratio 4:5 (portrait)
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  namesContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },

  firstNameCell: {
    width: '80%',
    marginHorizontal: 0,
  },

  lastNameCell: {
    width: '80%',
    marginHorizontal: 0,
  },
})