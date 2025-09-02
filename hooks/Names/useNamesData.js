// hooks/Names/useNamesData.js
import { useState, useMemo } from 'react'
import namesData from '../../data/structured_names.json'

export function useNamesData(objectif = 20) {
  // Fonction pour mélanger un array (Fisher-Yates)
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Fonction pour obtenir le chemin de l'image
  const getImagePath = (gender, imageNumber) => {
    const image = require('../../data/imageAssets').getNameImage(gender, imageNumber)
    if (image) {
      return image
    } else {
      const folder = gender === 'F' ? 'femme' : 'homme'
      console.log(`⚠️ Image non trouvée: ${folder}${imageNumber}.jpg, fallback vers placeholder`)
      // Retourner un objet avec uri pour React Native Image
      return { uri: `https://via.placeholder.com/300x400/667eea/ffffff?text=${folder}${imageNumber}` }
    }
  }

  // Génération des profils aléatoires
  const profiles = useMemo(() => {
    const { firstNames, lastNames } = namesData
    const shuffledFirstNames = shuffleArray(firstNames)
    const shuffledLastNames = shuffleArray(lastNames)
    
    const generatedProfiles = []
    
    // Séparer les prénoms par genre
    const femaleNames = shuffledFirstNames.filter(name => name.gender === 'F')
    const maleNames = shuffledFirstNames.filter(name => name.gender === 'M')
    
    let femaleImageCounter = 1
    let maleImageCounter = 1
    let lastNameIndex = 0
    
    // Générer les profils en alternant les genres si possible
    for (let i = 0; i < objectif; i++) {
      const useFemaleName = (i % 2 === 0 && femaleNames.length > 0 && femaleImageCounter <= 25) || 
                           (maleNames.length === 0 || maleImageCounter > 25)
      
      let selectedFirstName
      let imageNumber
      
      if (useFemaleName && femaleNames.length > 0 && femaleImageCounter <= 25) {
        selectedFirstName = femaleNames.shift() // Prend et retire le premier élément
        imageNumber = femaleImageCounter++
      } else if (maleNames.length > 0 && maleImageCounter <= 25) {
        selectedFirstName = maleNames.shift()
        imageNumber = maleImageCounter++
      } else {
        // Plus d'images disponibles, arrêter la génération
        console.log(`⚠️ Arrêt génération à ${i} profils (limite d'images atteinte)`)
        break
      }
      
      const selectedLastName = shuffledLastNames[lastNameIndex % shuffledLastNames.length]
      lastNameIndex++
      
      const profile = {
        id: i + 1,
        firstName: selectedFirstName.name,
        lastName: selectedLastName.name,
        gender: selectedFirstName.gender,
        imageUri: getImagePath(selectedFirstName.gender, imageNumber),
        imageNumber,
        firstNameNationality: selectedFirstName.nationality,
        lastNameNationality: selectedLastName.nationality
      }
      
      generatedProfiles.push(profile)
    }
    
    return generatedProfiles
  }, [objectif])

  return {
    profiles,
    totalProfiles: profiles.length
  }
}