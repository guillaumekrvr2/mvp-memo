import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 0, // Suppression des coins arrondis pour toucher les bords
    padding: 2,
    marginTop: 0, // Suppression de la marge pour coller à la bordure du dessus
    marginBottom: 8,
    marginHorizontal: 0 // Assurer qu'il n'y a pas de marge horizontale
  }
})