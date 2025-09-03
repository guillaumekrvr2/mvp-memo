// hooks/Names/useNamesData.js
import { useState, useMemo } from 'react'
import namesData from '../../data/structured_names.json'

export function useNamesData(objectif = 20) {
  // Force la régénération à chaque appel avec un seed aléatoire
  const [regenerationKey] = useState(() => Math.random())
  
  // console.log(`🔄 [useNamesData] Hook appelé avec objectif=${objectif}, regenerationKey=${regenerationKey}`) // Trop verbeux
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
      return { uri: `https://via.placeholder.com/300x400/667eea/ffffff?text=${folder}${imageNumber}` }
    }
  }

  // Génération des profils aléatoires - Nouveau seed à chaque utilisation
  const profiles = useMemo(() => {
    const { firstNames, lastNames } = namesData
    const shuffledFirstNames = shuffleArray([...firstNames]) // Clone pour éviter la mutation
    const shuffledLastNames = shuffleArray([...lastNames])
    const generatedProfiles = []
    
    // Séparer les prénoms par genre
    const femaleNames = shuffledFirstNames.filter(name => name.gender === 'F')
    const maleNames = shuffledFirstNames.filter(name => name.gender === 'M')
    
    // 🎲 RANDOMISER les numéros d'images aussi !
    const availableFemaleImages = shuffleArray([...Array(25)].map((_, i) => i + 1))
    const availableMaleImages = shuffleArray([...Array(25)].map((_, i) => i + 1))
    
    let femaleImageIndex = 0
    let maleImageIndex = 0
    let lastNameIndex = 0
    
    // Générer les profils en alternant les genres si possible
    for (let i = 0; i < objectif; i++) {
      // Logique améliorée : continuer tant qu'il reste des noms et des images
      const canUseFemale = femaleNames.length > 0 && femaleImageIndex < availableFemaleImages.length
      const canUseMale = maleNames.length > 0 && maleImageIndex < availableMaleImages.length
      
      if (!canUseFemale && !canUseMale) {
        console.log(`⚠️ Arrêt génération à ${i} profils (plus d'images disponibles)`)
        break
      }
      
      // Prioriser l'alternance mais être flexible si un genre n'est plus disponible
      const preferFemale = (i % 2 === 0) || !canUseMale
      const useFemaleName = preferFemale && canUseFemale
      
      let selectedFirstName
      let imageNumber
      
      if (useFemaleName) {
        selectedFirstName = femaleNames.shift() // Prend et retire le premier élément
        imageNumber = availableFemaleImages[femaleImageIndex++] // Prend l'image randomisée
      } else {
        selectedFirstName = maleNames.shift()
        imageNumber = availableMaleImages[maleImageIndex++] // Prend l'image randomisée
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
    
    console.log(`✅ [Final] ${generatedProfiles.length} profils générés sur ${objectif} demandés`)
    console.log(`📋 [Summary] Premiers profils:`, generatedProfiles.slice(0, 3).map(p => `${p.firstName} ${p.lastName} (${p.gender}${p.imageNumber})`))
    
    return generatedProfiles
  }, [objectif, regenerationKey])

  // console.log(`🎬 [Return] Hook retourne ${profiles.length} profils`) // Trop verbeux

  return {
    profiles,
    totalProfiles: profiles.length
  }
}