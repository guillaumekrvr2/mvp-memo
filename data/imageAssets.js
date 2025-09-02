// data/imageAssets.js
// Import statique de toutes les images Names

// Images femmes
const femmeImages = {
  1: require('../assets/names/images/femme/femme1.jpg'),
  2: require('../assets/names/images/femme/femme2.jpg'),
  3: require('../assets/names/images/femme/femme3.jpg'),
  4: require('../assets/names/images/femme/femme4.jpg'),
  5: require('../assets/names/images/femme/femme5.jpg'),
  6: require('../assets/names/images/femme/femme6.jpg'),
  7: require('../assets/names/images/femme/femme7.jpg'),
  8: require('../assets/names/images/femme/femme8.jpg'),
  9: require('../assets/names/images/femme/femme9.jpg'),
  10: require('../assets/names/images/femme/femme10.jpg'),
  11: require('../assets/names/images/femme/femme11.jpg'),
  12: require('../assets/names/images/femme/femme12.jpg'),
  13: require('../assets/names/images/femme/femme13.jpg'),
  14: require('../assets/names/images/femme/femme14.jpg'),
  15: require('../assets/names/images/femme/femme15.jpg'),
  16: require('../assets/names/images/femme/femme16.jpg'),
  17: require('../assets/names/images/femme/femme17.jpg'),
  18: require('../assets/names/images/femme/femme18.jpg'),
  19: require('../assets/names/images/femme/femme19.jpg'),
  20: require('../assets/names/images/femme/femme20.jpg'),
  21: require('../assets/names/images/femme/femme21.jpg'),
  22: require('../assets/names/images/femme/femme22.jpg'),
  23: require('../assets/names/images/femme/femme23.jpg'),
  24: require('../assets/names/images/femme/femme24.jpg'),
  25: require('../assets/names/images/femme/femme25.jpg'),
}

// Images hommes
const hommeImages = {
  1: require('../assets/names/images/homme/homme1.jpg'),
  2: require('../assets/names/images/homme/homme2.jpg'),
  3: require('../assets/names/images/homme/homme3.jpg'),
  4: require('../assets/names/images/homme/homme4.jpg'),
  5: require('../assets/names/images/homme/homme5.jpg'),
  6: require('../assets/names/images/homme/homme6.jpg'),
  7: require('../assets/names/images/homme/homme7.jpg'),
  8: require('../assets/names/images/homme/homme8.jpg'),
  9: require('../assets/names/images/homme/homme9.jpg'),
  10: require('../assets/names/images/homme/homme10.jpg'),
  11: require('../assets/names/images/homme/homme11.jpg'),
  12: require('../assets/names/images/homme/homme12.jpg'),
  13: require('../assets/names/images/homme/homme13.jpg'),
  14: require('../assets/names/images/homme/homme14.jpg'),
  15: require('../assets/names/images/homme/homme15.jpg'),
  16: require('../assets/names/images/homme/homme16.jpg'),
  17: require('../assets/names/images/homme/homme17.jpg'),
  18: require('../assets/names/images/homme/homme18.jpg'),
  19: require('../assets/names/images/homme/homme19.jpg'),
  20: require('../assets/names/images/homme/homme20.jpg'),
  21: require('../assets/names/images/homme/homme21.jpg'),
  22: require('../assets/names/images/homme/homme22.jpg'),
  23: require('../assets/names/images/homme/homme23.jpg'),
  24: require('../assets/names/images/homme/homme24.jpg'),
  25: require('../assets/names/images/homme/homme25.jpg'),
}

// Fonction pour obtenir une image
export const getNameImage = (gender, imageNumber) => {
  const images = gender === 'F' ? femmeImages : hommeImages
  const image = images[imageNumber]
  
  if (!image) {
    console.log(`⚠️ Image non trouvée: ${gender === 'F' ? 'femme' : 'homme'}${imageNumber}`)
    return null
  }
  
  return image
}

// Export des collections pour usage avancé
export { femmeImages, hommeImages }