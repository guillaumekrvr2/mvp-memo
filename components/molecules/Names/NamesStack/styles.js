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
    backgroundColor: 'rgba(20, 20, 30, 0.97)', // Fond légèrement bleué et plus moderne
    borderRadius: 28,
    padding: 24,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },

  imageContainer: {
    width: width * 0.6, // 60% de la largeur d'écran
    height: width * 0.75, // Ratio 4:5 (portrait)
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
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