// components/molecules/RecordDisplay/styles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e', // Même fond que les autres composants modernes
    borderRadius: 12, // Border radius moderne cohérent
    borderWidth: 1,
    borderColor: '#3a3a4e', // Bordure subtile
    padding: 16,
    marginVertical: 16,
    alignSelf: 'center',
    minWidth: 200,
    // Ombre moderne subtile
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  hiddenContainer: {
    height: 56, // Même hauteur que le container visible pour éviter le layout shift
    marginVertical: 16,
  },
  
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7a3d1a30', // Fond jaune transparent
    borderWidth: 1,
    borderColor: '#FACC48', // Bordure jaune accent
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    // Petit glow pour l'icône
    shadowColor: '#FACC48',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  
  label: {
    color: '#a0a9c0', // Couleur de texte secondaire moderne
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  
  score: {
    color: '#ffffff', // Texte principal blanc
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})