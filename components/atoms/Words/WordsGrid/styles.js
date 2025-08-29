import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wordsContainer: {
    width: '100%',
    paddingHorizontal: 8,
    position: 'relative',
  },
  
  scrollContainer: {
    flex: 1,
    paddingTop: 14,
  },
  
  scrollContent: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    paddingBottom: 30, // Padding pour éviter que l'ombre du bas masque le dernier élément
  },
  
  wordsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  
  emptyCell: {
    width: '45%', // Mise à jour pour correspondre à wordCell
    marginHorizontal: 6, // Mise à jour pour correspondre à wordCell
    height: 45,
  },
  
  topShadow: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 25,
    zIndex: 1,
  },
  
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 25,
    zIndex: 1,
  },
});